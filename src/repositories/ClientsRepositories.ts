import { EntityRepository, Repository } from "typeorm";
import { Clients } from "../models/Clients";

@EntityRepository(Clients)
class ClientsRepositories extends Repository<Clients> {}

export { ClientsRepositories };
