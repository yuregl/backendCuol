import { CitiesRepositories } from "../repositories/CitiesRepositories";

type ObjCities = {
  city?: string;
  state?: string;
};

class CitiesService {
  constructor(private citiesRepositories: CitiesRepositories) {}

  async executeCreateCity(req: ObjCities) {
    const { city, state } = req;

    const cityLowerCase = city.toLowerCase();
    const stateUpperCase = state.toUpperCase();

    const citiesAlreadyExist = await this.citiesRepositories.findOne({
      city: cityLowerCase,
      state: stateUpperCase,
    });

    if (citiesAlreadyExist) {
      throw new Error("Cidade já existe");
    }

    const saveCity = this.citiesRepositories.create({
      city: cityLowerCase,
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

  async getCities(value: ObjCities) {
    const cities = await this.citiesRepositories.find(value);
    return cities;
  }

  async getCityById(id: number) {
    const city = await this.citiesRepositories.findOne({ id });
    if (!city) {
      throw new Error("Cidade não existe");
    }
    return city;
  }
}

export { CitiesService };
