// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post('sync')
  async syncUser(@Request() req) {
    // Extracts data from verified Firebase token and syncs to MongoDB
    return this.usersService.findOrCreate({
      firebase_uid: req.user.uid,
      email: req.user.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  }
}
