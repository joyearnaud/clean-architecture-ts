import request from "supertest";
import { Contact } from "../../../src/domain/entities/contact";
import { CreateContactUseCase, GetAllContactsUseCase } from "../../../src/domain/use-cases/use-cases";
import ContactsRouter from "../../../src/presentation/routers/contact-router";
import server from "../../../src/server";

// implement the mocked interface GetAllContactsUseCase with not implemented methods
class GetAllContactsUseCaseMock implements GetAllContactsUseCase {
  execute(): Promise<Contact[]> {
    throw new Error("Method not implemented.");
  }
}

class CreateContactUseCaseMock implements CreateContactUseCase {
  execute(contact: Contact): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}

describe("ContactsRouter", () => {
  let mockCreateContactUseCase: CreateContactUseCase;
  let mockGetAllContactsUseCase: GetAllContactsUseCase;

  beforeAll(() => {
    mockCreateContactUseCase = new CreateContactUseCaseMock();
    mockGetAllContactsUseCase = new GetAllContactsUseCaseMock();
    server.use("/contacts", ContactsRouter(mockGetAllContactsUseCase, mockCreateContactUseCase));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe  ("GET /contacts", () => {
      it("should return 200 with data", async () => { 
        const ExpectedData: Contact[] = [{ id: 1, firstName: "John", lastName: "Smith", email: "john@gmail.com" }];
        jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData));

        const response = await request(server).get("/contacts");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(ExpectedData);
        expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1);
      });

      it("should return 500 when an error occurs", async () => {
        jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.reject(new Error("Error")));

        const response = await request(server).get("/contacts");

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Error fetching data" });
        expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1);
      });
  });

  describe("POST /contacts", () => {
    it("should return 201 with data", async () => {
      const inputData: any = { id: 1, firstName: "John", lastName: "Smith", email: "john@gmail.com" };
      jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.resolve(true));
      
      const response = await request(server).post("/contacts").send(inputData);
      expect(response.status).toBe(201);
    });

    it("should return 500 when an error occurs", async () => {
      const inputData: any = { id: 1, firstName: "John", lastName: "Smith", email: "john@gmail.com" };
      jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(new Error("Error")));

      const response = await request(server).post("/contacts").send(inputData);
      expect(response.status).toBe(500);
    });
  });
});