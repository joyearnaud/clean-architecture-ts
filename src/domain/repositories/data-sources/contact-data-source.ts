import { Contact } from "../../entities/contact";

export interface ContactDataSource {
  getAll(): Promise<Contact[]>;
  create(contact: Contact): Promise<boolean>;
}