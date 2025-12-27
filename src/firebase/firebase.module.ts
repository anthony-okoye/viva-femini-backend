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
