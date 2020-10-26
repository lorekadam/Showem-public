import {
  Entity,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Translate } from "./Translate";
import { Category } from "./Category";
const uuidv4 = require("uuid/v4");

@Entity()
export class Word extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => Category)
  category: Category;
  @OneToOne(() => Translate)
  @JoinColumn()
  translate: Translate;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
  have: boolean;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
