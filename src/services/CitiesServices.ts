import { CitiesRepositories } from "../repositories/CitiesRepositories";

interface ICities {
  city: string;
  state: string;
}

class CitiesService {
  constructor(private citiesRepositories: CitiesRepositories) {}

  async executeCreateCity(req: ICities) {
    const { city, state } = req;

    const cityUpperCase = city.toUpperCase();
    const stateUpperCase = state.toUpperCase();

    const citiesAlreadyExist = await this.citiesRepositories.findOne({
      city: cityUpperCase,
      state: stateUpperCase,
    });

    if (citiesAlreadyExist) {
      throw new Error("Cidade já existe");
    }

    const saveCity = this.citiesRepositories.create({
      city: cityUpperCase,
      state: stateUpperCase,
    });

    return await this.citiesRepositories.save(saveCity);
  }
}

export { CitiesService };
