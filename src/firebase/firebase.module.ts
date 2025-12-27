import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Global()
@Module({
  providers: [{
    provide: 'FIREBASE_ADMIN',
    useFactory: () => {
      try {
        // Check if Firebase app already exists
        if (admin.apps.length > 0) {
          return admin.app(); // Return existing app
        }

        // Try environment variables first (for Vercel)
        if (process.env.FIREBASE_PROJECT_ID && 
            process.env.FIREBASE_PRIVATE_KEY && 
            process.env.FIREBASE_CLIENT_EMAIL) {
          
          console.log('Initializing Firebase from environment variables');
          
          return admin.initializeApp({
            credential: admin.credential.cert({
              projectId: process.env.FIREBASE_PROJECT_ID,
              privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
          });
        }

        // Fallback to JSON file (for local development)
        console.log('Initializing Firebase from JSON file');
        const serviceAccount = require(path.join(process.cwd(), 'firebase-adminsdk.json'));
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (error) {
        console.error('Firebase Admin SDK initialization failed:', error);
        throw error;
      }
    },
  }],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
