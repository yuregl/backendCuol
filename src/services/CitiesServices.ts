import { CitiesRepositories } from "../repositories/CitiesRepositories";

type ObjCities = {
  city: string;
  state: string;
};

class CitiesService {
  constructor(private citiesRepositories: CitiesRepositories) {}

  async executeCreateCity(req: ObjCities) {
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

  async cityAlreadyExist(id: number) {
    const existAlready = await this.citiesRepositories.findOne({
      id,
    });

    if (!existAlready) {
      return false;
    }

    return existAlready;
  }
}

export { CitiesService };
