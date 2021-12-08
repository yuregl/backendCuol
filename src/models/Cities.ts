import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("cities")
class Cities {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  city: string;

  @Column()
  state: string;
}

export { Cities };
