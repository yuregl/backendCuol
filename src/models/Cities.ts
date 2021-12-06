import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}

@Entity("cities")
class Cities {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  city: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  state: string;
}

export { Cities };
