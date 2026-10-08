/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function makeRequest(path, method = 'GET', headers = {}, body = null) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: headers
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });
    
    req.on('error', (e) => resolve({ error: e.message }));
    
    if (body) {
      req.write(body);
    }
    req.end();
  });
}

async function run() {
  const admin = await prisma.adminUser.findFirst();
  const originalHash = admin.passwordHash;
  
  const testHash = 'scrypt:16384:8:1$JaWj8cSjBWMoV251cjg2tQ$fd1N7Lb0Hq3sPolVUvcCaVIET9f7HD7gOyAmuW_zH9nEDXAdRI9wfizCudZkWKc35CI4y9Kx1umg6wm5sydAWw';
  
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: testHash }
  });
  
  console.log('Logging in...');
  const loginRes = await makeRequest('/api/admin/login', 'POST', {
    'Content-Type': 'application/json'
  }, JSON.stringify({ username: admin.username, password: 'test-password' }));
  
  console.log('Login Status:', loginRes.status);
  const cookies = loginRes.headers['set-cookie'];
  if (!cookies) {
    console.error('No session cookie received');
    return;
  }
  
  const cookieHeader = cookies.map(c => c.split(';')[0]).join('; ');
  
  const adminRoutes = [
    '/admin/dashboard',
    '/admin/projects',
    '/admin/blog',
    '/admin/skills',
    '/admin/experience',
    '/admin/certificates',
    '/admin/client-work',
    '/admin/messages',
    '/admin/settings',
    '/admin/admins'
  ];
  
  console.log('\nTesting Protected Routes...');
  let success = true;
  for (const route of adminRoutes) {
    const res = await makeRequest(route, 'GET', { 'Cookie': cookieHeader });
    console.log(`${route}: ${res.status}`);
    if (res.status !== 200) success = false;
  }
  
  console.log('\nRestoring original hash...');
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash: originalHash }
  });
  
  if (success) {
    console.log('All protected routes loaded successfully!');
  } else {
    console.log('Some routes failed.');
  }
}

run().finally(() => prisma.$disconnect());
