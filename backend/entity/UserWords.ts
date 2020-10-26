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
import { Word } from './Word';
import { User } from './User';
const uuidv4 = require('uuid/v4');

@Entity()
export class UserWords extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Category)
  category: Category;
  @ManyToOne(() => Word)
  word: Word;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
