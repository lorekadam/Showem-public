import {
  Entity,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';
const uuidv4 = require('uuid/v4');

@Entity()
export class UserCategories extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Category)
  category: Category;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
