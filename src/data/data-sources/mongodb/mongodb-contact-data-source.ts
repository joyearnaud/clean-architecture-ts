import { Contact } from "../../../domain/entities/contact";
import { ContactDataSource } from "../contact-data-source";
import { DatabaseWrapper } from "../database-wrapper";

export class MongodbContactDataSource implements ContactDataSource {
  private database: DatabaseWrapper;

  constructor(database: DatabaseWrapper) {
    this.database = database;
  }

  async getAll(): Promise<Contact[]> {
    const result = await this.database.find({})
    return result.map(item => ({
        id: item._id.toString(),
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email
    }));
  }

  async create(contact: Contact): Promise<boolean> {
    const result = await this.database.insertOne(contact);
    return result !== null
  }
}