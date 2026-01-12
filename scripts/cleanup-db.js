/**
 * Database Cleanup Script
 * 
 * CRYSTAL CLEAR: This script wipes ALL collections in the 'jobvita' database.
 * Use with caution.
 */

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://jobvita_user:Rajgopal123@cluster0.vwyxv.mongodb.net/jobvita?retryWrites=true&w=majority';
const dbName = 'jobvita';

async function cleanupDb() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('🛡️  SECURITY: Database Access Authorized');

        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();

        console.log(`🧹 PURGING: ${collections.length} collections identified for destruction...`);

        for (const col of collections) {
            if (col.name.startsWith('system.')) continue;

            console.log(`  - Dropping collection: ${col.name}`);
            await db.collection(col.name).drop();
        }

        console.log('✨ CLEANED: All data successfully purged. Database is now a blank canvas.');

    } catch (error) {
        if (error.message.includes('ns not found')) {
            console.log('ℹ️  INFO: Database already empty or collections did not exist.');
        } else {
            console.error('❌ CRITICAL ERROR: Cleanup sequence failed:', error);
        }
    } finally {
        await client.close();
        console.log('\n🔒 SECURE: Connection terminated');
    }
}

cleanupDb();
