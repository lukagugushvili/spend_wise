import { BadRequestException, Injectable } from '@nestjs/common';
import { Expense } from './schema/expense.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly ExpenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const userId = new Types.ObjectId(createExpenseDto.user);

      const createNewExpense = new this.ExpenseModel({
        ...createExpenseDto,
        user: userId,
      });

      return await createNewExpense.save();
    } catch (e) {
      console.error('Error creating expense:', e);
      throw new BadRequestException('Could not save expense', e.message);
    }
  }
}
