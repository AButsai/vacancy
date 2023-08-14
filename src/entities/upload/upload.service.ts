import { UserEntity } from '@entities/user/user.entity';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from '@firebase/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EUploadPath } from './enums/upload.enum';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async uploadAvatar(
    file: Express.Multer.File,
    path: string,
    userId: string,
  ) {
    if (path !== EUploadPath.AVATARS && path !== EUploadPath.FILES) {
      throw new BadRequestException('Invalid path');
    }
    const storage = getStorage();
    let fileName: string;

    if (path === EUploadPath.AVATARS) {
      const fileExtension = file.originalname.split('.').pop();
      fileName = `${userId}.${fileExtension}`;
    } else {
      fileName = file.originalname;
    }

    const fileRef = ref(storage, `${path}/${fileName}`);

    await uploadBytes(fileRef, file.buffer);
    const downloadURL = await getDownloadURL(fileRef);

    if (path === EUploadPath.AVATARS) {
      await this.userRepository.update(userId, { avatarURL: downloadURL });
    }

    return { fileUrl: downloadURL };
  }
}
