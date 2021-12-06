import { EntityRepository, Repository } from "typeorm";
import { Cities } from "../models/Cities";

@EntityRepository(Cities)
class CitiesRepositories extends Repository<Cities> {}

export { CitiesRepositories };
