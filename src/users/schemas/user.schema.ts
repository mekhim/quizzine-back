import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret.id;
    },
  },
  versionKey: false,
})
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: any;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  image: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  password: string;

  @Prop(
    raw({
      exp: {
        type: Number,
        required: true,
        trim: true,
      },
      goodAnswers: {
        type: Number,
        required: true,
        trim: true,
      },
      totalAnswers: {
        type: Number,
        required: true,
        trim: true,
      },
    }),
  )
  stats: any;

  @Prop({
    type: Boolean,
    required: true,
  })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
