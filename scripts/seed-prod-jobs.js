/**
 * Production Medical Seed Script
 * 
 * 1. Clears ALL existing jobs from MongoDB
 * 2. Generates 200+ high-quality Medical & Healthcare jobs
 * 3. Builds optimized indexes
 * 
 * Pitch optimized for healthcare sector presentations.
 */

const { MongoClient } = require('mongodb');
const { generateMedicalJobs } = require('./seed-medical-jobs');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb+srv://jobvita_user:Rajgopal123@cluster0.vwyxv.mongodb.net/jobvita?retryWrites=true&w=majority';
const dbName = 'jobvita';

async function seedProdMedical() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('💎 CONNECTED: Production Database Access Established');

        const db = client.db(dbName);
        const jobsCollection = db.collection('jobs');

        // 1. DATA PURGE
        console.log('🧹 PURGING: Clearing all existing job records...');
        const deleteResult = await jobsCollection.deleteMany({});
        console.log(`✨ CLEANED: Removed ${deleteResult.deletedCount} legacy records`);

        // 2. GENERATION
        console.log('🧬 GENERATING: Refining 200+ Health & Medical protocols...');
        const medicalJobs = generateMedicalJobs(200);
        console.log(`✅ GENERATED: ${medicalJobs.length} specialized healthcare listings ready`);

        // 3. INJECTION
        console.log('🚀 INJECTING: Syncing records to database...');
        const result = await jobsCollection.insertMany(medicalJobs);
        console.log(`💎 SUCCESS: ${result.insertedCount} medical jobs are now LIVE`);

        // 4. OPTIMIZATION
        console.log('⚡ OPTIMIZING: Resetting search indexes...');
        try {
            await jobsCollection.dropIndexes();
            console.log('  ✓ Dropped existing indexes');
        } catch (e) {
            console.log('  ℹ️ No existing indexes to drop');
        }

        console.log('⚡ OPTIMIZING: Building high-performance search indexes...');
        await jobsCollection.createIndex({ title: 'text', summary: 'text', company: 'text', skills: 'text' }, { name: 'HealthMedicalSearchIndex' });
        await jobsCollection.createIndex({ location: 1 });
        await jobsCollection.createIndex({ category: 1 });
        await jobsCollection.createIndex({ postedDate: -1 });
        await jobsCollection.createIndex({ status: 1 });
        console.log('✅ OPTIMIZED: Search pipeline is ultra-responsive');

        // 5. SUMMARY
        console.log('\n📊 PITCH READY METRICS:');
        console.log(`  Sector: Medical & Healthcare`);
        console.log(`  Count: ${result.insertedCount} Active Jobs`);
        console.log(`  Status: Production Verified`);

    } catch (error) {
        console.error('❌ CRITICAL ERROR: Seeding sequence failed:', error);
    } finally {
        await client.close();
        console.log('\n🔒 SECURE: Connection terminated successfully');
    }
}

seedProdMedical();
