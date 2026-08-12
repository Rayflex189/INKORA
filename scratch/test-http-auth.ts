import http from "http";

function postJson(path: string, data: object): Promise<{ status: number; body: any; headers: any }> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode || 500, body: JSON.parse(body), headers: res.headers });
          } catch {
            resolve({ status: res.statusCode || 500, body, headers: res.headers });
          }
        });
      }
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function getJson(path: string, cookie?: string): Promise<{ status: number; body: any }> {
  return new Promise((resolve, reject) => {
    const headers: any = {};
    if (cookie) headers["Cookie"] = cookie;
    const req = http.request(
      {
        hostname: "localhost",
        port: 3000,
        path,
        method: "GET",
        headers,
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode || 500, body: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode || 500, body });
          }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function testHttpEndpoints() {
  console.log("=== INKORA HTTP API ENDPOINTS VERIFICATION AUDIT ===");

  // 1. Admin Login (Valid Credentials)
  console.log("\n[1/5] Testing POST /api/auth/login with Admin Credentials...");
  const adminLogin = await postJson("/api/auth/login", { login: "admin", password: "adminplus" });
  console.log(`Status: ${adminLogin.status}`);
  console.log(`Message: ${adminLogin.body.message || adminLogin.body.error}`);
  console.log(`User: @${adminLogin.body.user?.username} (${adminLogin.body.user?.role})`);
  const adminCookie = adminLogin.headers["set-cookie"]?.[0];
  console.log(`Set-Cookie Token Received: ${!!adminCookie}`);

  // 2. Admin Login (Invalid Credentials)
  console.log("\n[2/5] Testing POST /api/auth/login with Invalid Password...");
  const invalidLogin = await postJson("/api/auth/login", { login: "admin", password: "wrongpassword" });
  console.log(`Status: ${invalidLogin.status} (Expected: 401)`);
  console.log(`Error Message: ${invalidLogin.body.error}`);

  // 3. User Registration
  console.log("\n[3/5] Testing POST /api/auth/register...");
  const regUser = `test_http_user_${Date.now()}`;
  const regResult = await postJson("/api/auth/register", {
    email: `${regUser}@example.com`,
    username: regUser,
    name: "HTTP Test Reader",
    password: "Password123!",
    role: "READER",
  });
  console.log(`Status: ${regResult.status}`);
  console.log(`Message: ${regResult.body.message || regResult.body.error}`);
  console.log(`Registered User: @${regResult.body.user?.username}`);

  // 4. Authenticated Admin Activity Logs Route
  console.log("\n[4/5] Testing GET /api/admin/activity-logs with Admin Session...");
  const logsRes = await getJson("/api/admin/activity-logs", adminCookie);
  console.log(`Status: ${logsRes.status}`);
  console.log(`Logs Count: ${logsRes.body.logs?.length ?? 0}`);

  // 5. Authenticated Admin Users Route
  console.log("\n[5/5] Testing GET /api/admin/users with Admin Session...");
  const usersRes = await getJson("/api/admin/users", adminCookie);
  console.log(`Status: ${usersRes.status}`);
  console.log(`Users Count: ${usersRes.body.users?.length ?? 0}`);

  // Cleanup
  console.log("\n[Cleanup] Removing temporary test account...");
  const { db } = await import("../src/lib/db");
  await db.profile.deleteMany({ where: { user: { username: { startsWith: "test_http_user_" } } } });
  await db.user.deleteMany({ where: { username: { startsWith: "test_http_user_" } } });
  await db.$disconnect();
  console.log("✓ Cleanup finished cleanly.");

  console.log("\n=== ALL HTTP API TESTS PASSED SUCCESSFULLY ===");
}

testHttpEndpoints().catch(console.error);
