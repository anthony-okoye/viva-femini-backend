// src/auth/firebase-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization?.split('Bearer ')[1];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader;

    try {
      // This verifies the token is real and hasn't expired
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Attach the verified user data (uid, email) to the request object
      request.user = decodedToken; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
