import moment from "moment";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Cities } from "./Cities";

moment().locale("pt-br");

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

  getAge(year: number): number {
    const value = moment().subtract(year, "years").calendar();
    const [, age] = value.split("/00");
    return parseInt(age);
  }

  capitalizeName(name: string) {
    const full_name = name.replace(/\w\S*/g, (w) =>
      w.replace(/^\w/, (c) => c.toUpperCase())
    );

    return full_name;
  }

  changeName(name: string) {
    this.full_name = name;
    return name;
  }
}

export { Clients };
