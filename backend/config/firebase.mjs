import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON manually using fs
const serviceAccount = JSON.parse(
  readFileSync(path.join(__dirname, './serviceAccountKey.json'), 'utf-8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'smartserve-app.appspot.com'  // Your bucket name is correct
});

const bucket = admin.storage().bucket();

export default bucket;
