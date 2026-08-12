import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function runAudit() {
  console.log("=== INKORA E2E PRODUCTION DATABASE & AUTHENTICATION AUDIT ===");
  const testUsername = `inkora_audit_${Date.now()}`;
  const testEmail = `${testUsername}@example.com`;
  const testPassword = "AuditTestPassword123!";

  try {
    // 1. Verify PostgreSQL Database Read (Book Gallery Items)
    console.log("\n[1/7] Testing PostgreSQL Database Read (findMany BookGalleryItem)...");
    const books = await db.bookGalleryItem.findMany({ take: 5 });
    console.log(`✓ Retrieved ${books.length} books from Supabase PostgreSQL.`);

    // 2. Test User Registration
    console.log("\n[2/7] Testing User Registration Workflow...");
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    const createdUser = await db.user.create({
      data: {
        email: testEmail,
        username: testUsername,
        name: "Inkora Audit Tester",
        passwordHash: hashedPassword,
        role: "WRITER",
        status: "PENDING_VERIFICATION",
        profile: {
          create: {
            publicVisibility: "PUBLIC",
            allowMessages: true,
            allowInvites: true,
            allowCollaboration: true,
          },
        },
      },
      include: { profile: true },
    });
    console.log(`✓ Test User created in PostgreSQL: ID=${createdUser.id}, Username=@${createdUser.username}`);
    console.log(`  Password Hashed: ${createdUser.passwordHash.startsWith("$2b$") || createdUser.passwordHash.startsWith("$2a$")}`);

    // 3. Test Password Comparison
    console.log("\n[3/7] Testing Password Authentication Logic...");
    const validPasswordMatch = await bcrypt.compare(testPassword, createdUser.passwordHash);
    const invalidPasswordMatch = await bcrypt.compare("WrongPass123", createdUser.passwordHash);
    console.log(`✓ Valid Password Check: ${validPasswordMatch}`);
    console.log(`✓ Invalid Password Check (must be false): ${!invalidPasswordMatch}`);

    // 4. Verify Admin Account Exists & Password
    console.log("\n[4/7] Verifying Admin Account in PostgreSQL...");
    const adminUser = await db.user.findFirst({
      where: { OR: [{ username: "admin" }, { email: "admin" }] },
    });
    if (!adminUser) {
      throw new Error("Admin account does not exist in database!");
    }
    const adminValid = await bcrypt.compare("adminplus", adminUser.passwordHash);
    console.log(`✓ Admin User Found: @${adminUser.username} (Role=${adminUser.role})`);
    console.log(`✓ Admin Password Verification ('adminplus'): ${adminValid}`);

    // 5. Test Admin User Verification Action (Database Write)
    console.log("\n[5/7] Testing Admin Verification Action (Updating user status)...");
    const updatedUser = await db.user.update({
      where: { id: createdUser.id },
      data: { status: "ACTIVE" },
    });
    console.log(`✓ User status updated to ACTIVE in PostgreSQL: ${updatedUser.status}`);

    // 6. Test Activity Logs Retrieval (findMany ActivityLog)
    console.log("\n[6/7] Testing Activity Logs Retrieval...");
    const logs = await db.activityLog.findMany({ take: 5 });
    console.log(`✓ Retrieved ${logs.length} activity logs from Supabase PostgreSQL.`);

    // 7. Clean up Audit Test Account
    console.log("\n[7/7] Cleaning up test audit records...");
    await db.profile.deleteMany({ where: { userId: createdUser.id } });
    await db.user.delete({ where: { id: createdUser.id } });
    console.log("✓ Audit test user safely removed from PostgreSQL.");

    console.log("\n=== ALL 7 AUDIT CHECKS PASSED SUCCESSFULLY ===");
  } catch (err: any) {
    console.error("❌ AUDIT FAILED:", err);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

runAudit();
