const { writeUserLog } = require('./src/lib/logging-admin');

async function triggerVisit() {
    console.log("Triggering a test visit...");
    const result = await writeUserLog({
        ip: '127.0.0.1',
        page: '/test-timezone-fix',
        userAgent: 'Internal-Test',
        sessionId: 'test-' + Date.now()
    });
    console.log("Result:", result);
}

triggerVisit();
