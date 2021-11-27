import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      delete ret._id;
    },
  },
  versionKey: false,
})
export class Question {
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
  question: string;

  @Prop({
    type: [String],
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 6,
  })
  answers: string[];

  @Prop({
    type: [String],
    required: true,
    trim: true,
    minlength: 1,
  })
  tags: string[];

  @Prop({
    type: Date,
    required: true,
  })
  date: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
