import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { Translate } from "./Translate";

const uuidv4 = require("uuid/v4");

export enum Icons {
  Default = "default",
  Movie = "movie",
  Book = "book",
  Place = "place",
  Object = "object",
  Animal = "animal",
  Occupation = "occupation",
  Food = "food",
}

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @OneToOne(() => Translate)
  @JoinColumn()
  translate: Translate;

  @Column({ type: "boolean", default: false })
  basic: boolean;

  @Column({ type: "enum", enum: Icons, default: Icons.Default })
  icon: Icons;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
