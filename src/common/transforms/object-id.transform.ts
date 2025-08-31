// src/common/transforms/object-id.transform.ts
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export const ToObjectId = () => {
  return ({ value }: { value: string }) => {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`Invalid ObjectId: ${value}`);
    }
    return new Types.ObjectId(value);
  };
};
