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
    const fullNameUpperCase = full_name.toUpperCase();

    const clientAlreadyExist = await this.clientsRepositories.findOne({
      full_name: fullNameUpperCase,
    });

    if (clientAlreadyExist) {
      throw new Error("Cliente já existe");
    }

    const citiesExist = await this.citiesService.cityAlreadyExist(cities_id);

    if (!citiesExist) {
      throw new Error("Cidade não existe");
    }

    const client = this.clientsRepositories.create({
      full_name: fullNameUpperCase,
      cities_id,
      birth_date,
      gender,
    });
    return await this.clientsRepositories.save(client);
  }
}

export { ClientsService };
