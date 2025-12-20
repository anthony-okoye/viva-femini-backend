import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Global()
@Module({
  providers: [{
    provide: 'FIREBASE_ADMIN',
    useFactory: () => {
      try {
        const serviceAccount = require(path.join(process.cwd(), 'firebase-adminsdk.json'));
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (error) {
        console.error('Firebase Admin SDK initialization failed:', error);
        // We return admin anyway or throw depending on how strict we want to be.
        // If the file is missing, it will throw here.
        throw error;
      }
    },
  }],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
