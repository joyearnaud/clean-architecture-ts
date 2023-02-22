// import Contact, ContactRepository
import { Contact } from "../entities/contact";
import { ContactRepository } from "./repositories";
import { ContactDataSource } from "./data-sources/contact-data-source";

export class ContactRepositoryImpl implements ContactRepository {
  private contactDataSource: ContactDataSource;

  constructor(contactDataSource: ContactDataSource) {
    this.contactDataSource = contactDataSource;
  }

  getAll(): Promise<Contact[]> {
    return this.contactDataSource.getAll();
  }

  create(contact: Contact): Promise<boolean> {
    return this.contactDataSource.create(contact);
  }
}