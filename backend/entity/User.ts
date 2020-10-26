import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
const uuidv4 = require("uuid/v4");

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255, nullable: true, unique: true })
  fbUniqid: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
  @Column({ type: "boolean", default: false })
  admin: boolean;
}
