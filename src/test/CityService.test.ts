import { Cities } from "../models/Cities";
import { CitiesRepositories } from "../repositories/CitiesRepositories";
import { CitiesService } from "../services/CitiesServices";
import { createConnection, getConnection, getCustomRepository } from "typeorm";

describe("City Service", () => {
  beforeAll(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Cities],
      synchronize: true,
      logging: false,
    });
  });

  afterAll(() => {
    const connection = getConnection();
    return connection.close();
  });

  it("Should create a city", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const req = {
      city: "teste",
      state: "TE",
    };

    const quantityBefore = await cityRepository.count();
    const result = await cityService.executeCreateCity(req);
    const quantityAfter = await cityRepository.count();

    expect(quantityBefore).toBe(0);
    expect(result.id).toBe(1);
    expect(quantityAfter).toBe(1);
  });

  it("The test should try to add a city that already exists", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const req = {
      city: "teste",
      state: "TE",
    };
    try {
      await cityService.executeCreateCity(req);
    } catch (error) {
      expect((<Error>error).message).toBe("Cidade já existe");
    }
  });

  it("The test should check if a city exists.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const req = {
      city: "teste1",
      state: "TE",
    };

    const resultSave = await cityService.executeCreateCity(req);
    expect(resultSave.id).toBe(2);

    const result = await cityService.cityAlreadyExist(2);
    expect(result).toHaveProperty("id");
  });

  it("The test must verify that a city does not exist.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const result = await cityService.cityAlreadyExist(5);
    expect(result).toBe(false);
  });

  it("The test should look for the cities given the parameters", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const req = {
      city: "teste1",
      state: "TE",
    };

    const result = await cityService.getCities(req);
    expect(result.length).toBe(1);
  });

  it("The test must search the city given the id", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const result = await cityService.getCityById(1);
    expect(result.id).toBe(1);
  });

  it("The test should fail when trying to search for a city that doesn't exist given the id", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    try {
      await cityService.getCityById(5);
    } catch (error) {
      expect((<Error>error).message).toBe("Cidade não existe");
    }
  });
});
