// src/users/users.controller.ts
import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard'; // Adjust path if needed

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  async getMyProfile(@Request() req) {
    // req.user is populated by the FirebaseAuthGuard after verification
    return this.usersService.findByReference(req.user.reference);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch('me')
  async updateMyProfile(@Request() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.reference, updateData);
  }
}
