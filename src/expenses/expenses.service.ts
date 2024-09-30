import { Injectable } from '@nestjs/common';
import { Expense } from './schema/expense.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly ExpenseModel: Model<Expense>,
  ) {}
}
