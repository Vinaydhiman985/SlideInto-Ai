const http = require('http');

function post(path, data, token = null) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const req = http.request({
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
      method: 'POST',
      headers: headers
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ statusCode: res.statusCode, data: json });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(payload);
    req.end();
  });
}

function get(path, token = null) {
  return new Promise((resolve, reject) => {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const req = http.request({
      hostname: '127.0.0.1',
      port: 5000,
      path: path,
      method: 'GET',
      headers: headers
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ statusCode: res.statusCode, data: json });
        } catch (e) {
          resolve({ statusCode: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting API Verification ---');
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'Password123!';

  // 1. Signup
  console.log('Testing SIGNUP...');
  try {
    const signupRes = await post('/api/auth/signup', { email, password, name: 'Test User' });
    console.log('Signup Status:', signupRes.statusCode);
    console.log('Signup Response:', signupRes.data);

    if (signupRes.statusCode !== 201 || !signupRes.data.token) {
      throw new Error('Signup failed');
    }

    const token = signupRes.data.token;

    // 2. Login
    console.log('\nTesting LOGIN...');
    const loginRes = await post('/api/auth/login', { email, password });
    console.log('Login Status:', loginRes.statusCode);
    console.log('Login Response:', loginRes.data);

    if (loginRes.statusCode !== 200 || !loginRes.data.token) {
      throw new Error('Login failed');
    }

    // 3. Generate DM with GitHub URL (Scraping test)
    console.log('\nTesting GENERATE DM with GitHub URL (Scraping test)...');
    const generateGitRes = await post('/api/dm/generate', {
      profileUrl: 'https://github.com/defunkt',
      outreachGoal: 'collab',
      contextBio: 'Co-marketing opportunity'
    }, token);

    console.log('Generate Git Status:', generateGitRes.statusCode);
    console.log('Generate Git Response:', JSON.stringify(generateGitRes.data, null, 2));

    if (generateGitRes.statusCode !== 201) {
      throw new Error('GitHub Generation failed');
    }

    // 4. Generate DM with LinkedIn URL (Login wall / Fallback test)
    console.log('\nTesting GENERATE DM with LinkedIn URL (Auth wall / Fallback test)...');
    const generateLIDRes = await post('/api/dm/generate', {
      profileUrl: 'https://linkedin.com/in/williamgates',
      outreachGoal: 'job',
      contextBio: 'Seeking opportunities'
    }, token);

    console.log('Generate LinkedIn Status:', generateLIDRes.statusCode);
    console.log('Generate LinkedIn Response:', JSON.stringify(generateLIDRes.data, null, 2));

    if (generateLIDRes.statusCode !== 201) {
      throw new Error('LinkedIn Generation failed');
    }

    // 5. Retrieve History
    console.log('\nTesting GET HISTORY...');
    const historyRes = await get('/api/dm/history', token);
    console.log('History Status:', historyRes.statusCode);
    console.log('History Count:', historyRes.data?.data ? historyRes.data.data.length : 'No data array');

    if (historyRes.statusCode !== 200 || !Array.isArray(historyRes.data?.data)) {
      throw new Error('Get History failed');
    }

    console.log('\n--- API Verification Passed Successfully! ---');
    process.exit(0);
  } catch (err) {
    console.error('\n*** API Verification FAILED! ***');
    console.error(err);
    process.exit(1);
  }
}

runTests();
