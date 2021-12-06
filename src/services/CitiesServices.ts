import { CitiesRepositories } from "../repositories/CitiesRepositories";

interface ICities {
  city: string;
  state: string;
}

class CitiesService {
  constructor(private citiesRepositories: CitiesRepositories) {}

  async executeCreateCity(req: ICities) {
    const { city, state } = req;

    const citiesAlreadyExist = await this.citiesRepositories.findOne({
      city,
      state,
    });

    if (citiesAlreadyExist) {
      throw new Error("Cidade já existe");
    }

    const saveCity = this.citiesRepositories.create({
      city,
      state,
    });

    return await this.citiesRepositories.save(saveCity);
  }
}

export { CitiesService };
