import { Clients } from "../models/Clients";
import { ClientsRepositories } from "../repositories/ClientsRepositories";
import { ClientsService } from "../services/ClientsServices";
import { Cities } from "../models/Cities";
import { CitiesRepositories } from "../repositories/CitiesRepositories";
import { CitiesService } from "../services/CitiesServices";
import { createConnection, getConnection, getCustomRepository } from "typeorm";

const biggerThen = (value: number) => {
  return value >= 27 ? true : false;
};

describe("Clients Service", () => {
  beforeAll(() => {
    return createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [Clients, Cities],
      synchronize: true,
      logging: false,
    });
  });

  afterAll(() => {
    const connection = getConnection();
    return connection.close();
  });

  it("The test must create a client", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const reqCity = {
      city: "NewTeste",
      state: "SA",
    };

    const resultSave = await cityService.executeCreateCity(reqCity);
    const { id } = resultSave;
    expect(id).toBe(1);

    const reqClient = {
      full_name: "Teste testando",
      gender: "male",
      birth_date: new Date("1994/08/24"),
      cities_id: id,
    };

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    const result = await clientService.executeCreateClient(reqClient);
    const resultCapitalize = result.capitalizeName(result.full_name);
    expect(resultCapitalize).toBe("Teste Testando");

    const year = result.birth_date.getFullYear();
    const resultAge = result.getAge(year);
    expect(true).toBe(biggerThen(resultAge));

    expect(result.id).toBe(1);
  });

  it("The test should try to add a client that already exists.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const reqCity = {
      city: "NewTeste1",
      state: "SB",
    };

    const resultSave = await cityService.executeCreateCity(reqCity);
    const { id } = resultSave;
    expect(id).toBe(2);

    const reqClient = {
      full_name: "Teste testando",
      gender: "male",
      birth_date: new Date("1994/08/24"),
      cities_id: id,
    };

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    try {
      await clientService.executeCreateClient(reqClient);
    } catch (error) {
      expect(<Error>error.message).toBe("Cliente já existe");
    }
  });

  it("The test should try to add a customer passing a city that doesn't exist.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const reqClient = {
      full_name: "Teste testando1",
      gender: "male",
      birth_date: new Date("1994/08/24"),
      cities_id: 3,
    };

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    try {
      await clientService.executeCreateClient(reqClient);
    } catch (error) {
      expect(<Error>error.message).toBe("Cidade não existe");
    }
  });

  it("This test should look for a client by id.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    const result = await clientService.executeGetClientById(1);
    expect(result.id).toBe(1);
  });

  it("This test should try to find a client with id that doesn't exist.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    try {
      await clientService.executeGetClientById(2);
    } catch (error) {
      expect(<Error>error.message).toBe("Cliente não existe");
    }
  });

  it("This test should look for a client by name", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    const result = await clientService.executeGetClientByName("Teste testando");
    expect(result.id).toBe(1);
  });

  it("This test should try to find a client with name that doesn't exist.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    try {
      await clientService.executeGetClientByName("Teste 123");
    } catch (error) {
      expect(<Error>error.message).toBe("Cliente não existe");
    }
  });

  it("This test should update a customer's name.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    const id = 1;
    const name = "Teste testinho";
    const result = await clientService.executeUpdateName(id, name);
    expect(result.full_name).toBe("teste testinho");
  });

  it("This test should try to update the name of a client that does not exist.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    const id = 10;
    const name = "Teste testinho";
    try {
      await clientService.executeUpdateName(id, name);
    } catch (error) {
      expect(<Error>error.message).toBe("Cliente não existe");
    }
  });

  it("This test should exclude a client given an id", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    const result = await clientService.executeDeleteClient(1);
    expect(result.affected).toBe(1);
  });

  it("This test should try to delete a client that doesn't exist.", async () => {
    const cityRepository = getCustomRepository(CitiesRepositories);
    const cityService = new CitiesService(cityRepository);

    const clientRepository = getCustomRepository(ClientsRepositories);
    const clientService = new ClientsService(clientRepository, cityService);

    try {
      await clientService.executeDeleteClient(10);
    } catch (error) {
      expect(<Error>error.message).toBe("Cliente com esse id não existe");
    }
  });
});
