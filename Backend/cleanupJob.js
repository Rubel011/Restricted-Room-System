const cron = require('cron');
const TokenBlacklist = require('./Models/tokenBlackList');

// Schedule a job to run every day at midnight
const cleanupJob = new cron.CronJob('0 0 * * *', async () => {
    try {
        // Find and remove expired tokens
        const now = new Date();
        await TokenBlacklist.deleteMany({ expiry: { $lte: now } });
        console.log('Expired tokens removed');
    } catch (error) {
        console.error('Error while removing expired tokens:', error.message);
    }
});

// Start the cleanup job
cleanupJob.start();
