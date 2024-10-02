import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@Schema({ timestamps: true })
export class Expense extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
