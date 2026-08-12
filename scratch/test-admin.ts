import { db } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Testing Supabase PostgreSQL user query...");
  try {
    const user = await db.user.findFirst({
      where: { OR: [{ email: "admin" }, { username: "admin" }] },
    });
    console.log("User query result:", user ? { id: user.id, username: user.username, role: user.role } : null);

    if (user) {
      const isValid = await bcrypt.compare("adminplus", user.passwordHash);
      console.log("Password check (adminplus):", isValid);
    } else {
      console.log("Admin user not found in database.");
    }
  } catch (err) {
    console.error("Database query failed:", err);
  } finally {
    await db.$disconnect();
  }
}

main();
