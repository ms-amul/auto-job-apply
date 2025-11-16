/**
 * MongoDB Client (Atlas)
 * - Uses a single global client across hot reloads
 * - Reads URI from env when available, falls back to provided string for local dev
 */

import { MongoClient } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://raja:2003@cluster0.a5zryul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

if (!uri) {
  throw new Error('Missing MONGODB_URI. Set it in your environment.');
}

const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDb(dbName = 'jobvita') {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;


