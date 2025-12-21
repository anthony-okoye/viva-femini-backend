// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // Sync Firebase user with MongoDB
  async findOrCreate(userData: Partial<User>): Promise<User> {
    const { firebase_uid } = userData;
    
    let user = await this.userModel.findOne({ firebase_uid }).exec();
    
    if (!user) {
      user = new this.userModel(userData);
      await user.save();
    }
    
    return user;
  }

  async findByFirebaseUid(firebase_uid: string): Promise<User> {
    const user = await this.userModel.findOne({ firebase_uid }).exec();
    if (!user) throw new NotFoundException('User profile not found');
    return user;
  }

  async findByReference(reference: string): Promise<User> {
    const user = await this.userModel.findOne({ reference }).exec();
    if (!user) throw new NotFoundException('User profile not found');
    return user;
  }

  async updateProfileByFirebaseUid(firebase_uid: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ firebase_uid }, updateData, { new: true })
      .exec();
    if (!user) throw new NotFoundException('User profile not found');
    return user;
  }

  async updateProfile(reference: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userModel
      .findOneAndUpdate({ reference }, updateData, { new: true })
      .exec();
    if (!user) throw new NotFoundException('User profile not found');
    return user;
  }
}
