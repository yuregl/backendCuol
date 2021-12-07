import { ClientsRepositories } from "../repositories/ClientsRepositories";
import { CitiesService } from "../services/CitiesServices";

type ObjClient = {
  full_name: string;
  gender: string;
  birth_date: Date;
  cities_id: number;
};

class ClientsService {
  constructor(
    private clientsRepositories: ClientsRepositories,
    private citiesService: CitiesService
  ) {}

  async executeCreateClient(req: ObjClient) {
    const { full_name, cities_id, birth_date, gender } = req;
    const fullNameLowerCase = full_name.toLowerCase();

    const clientAlreadyExist = await this.clientsRepositories.findOne({
      full_name: fullNameLowerCase,
    });

    if (clientAlreadyExist) {
      throw new Error("Cliente já existe");
    }

    const citiesExist = await this.citiesService.cityAlreadyExist(cities_id);

    if (!citiesExist) {
      throw new Error("Cidade não existe");
    }

    const client = this.clientsRepositories.create({
      full_name: fullNameLowerCase,
      cities_id,
      birth_date,
      gender,
    });
    return await this.clientsRepositories.save(client);
  }

  async executeGetClientById(id: number) {
    const client = await this.clientsRepositories.findOne({ id });
    if (!client) {
      throw new Error("Cliente não existe");
    }
    return client;
  }

  async executeGetClientByName(full_name: string) {
    const nameLowerCase = full_name.toLowerCase();
    const client = await this.clientsRepositories.findOne({
      full_name: nameLowerCase,
    });

    if (client === undefined) {
      throw new Error("Cliente não existe");
    }
    return client;
  }

  async executeUpdateName(id: number, name: string) {
    const nameLowerCase = name.toLowerCase();
    const client = await this.clientsRepositories.findOne({ id });

    if (!client) {
      throw new Error("Cliente não existe");
    }
    client.changeName(nameLowerCase);
    return await this.clientsRepositories.save(client);
  }

  async executeDeleteClient(id: number) {
    const client = await this.clientsRepositories.findOne({ id });

    if (!client) {
      throw new Error("Cliente com esse id não existe");
    }

    return await this.clientsRepositories.delete({ id });
  }
}

export { ClientsService };
