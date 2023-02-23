import {DatabaseWrapper} from "../../../../src/data/data-sources/database-wrapper";
import {MongodbContactDataSource} from "../../../../src/data/data-sources/mongodb/mongodb-contact-data-source";


describe("MongoDB DataSource", () => {

    let mockDatabase: DatabaseWrapper;
    const testData = { firstName: 'John', lastName: 'Do', email: 'johndo@gmail.com' };

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongodbContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{...testData, _id: 123}]));

        const result = await ds.getAll();

        expect(result).toEqual([{...testData, id: "123"}]);
        expect(mockDatabase.find).toHaveBeenCalledTimes(1);
    })


    test("create", async () => {
        const ds = new MongodbContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "123" }))

        const result = await ds.create(testData);

        expect(result).toBeTruthy();
        expect(mockDatabase.insertOne).toHaveBeenCalledTimes(1);
    })

})