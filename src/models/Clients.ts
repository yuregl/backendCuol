import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Cities } from "./Cities";

@Entity("clients")
class Clients {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column()
  full_name: string;

  @Column()
  gender: string;

  @Column()
  birth_date: Date;

  @Column()
  cities_id: number;

  @JoinColumn({ name: "cities_id" })
  @ManyToOne(() => Cities)
  cities: Cities;
}

export { Clients };
