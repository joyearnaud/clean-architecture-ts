import { Contact } from "../../domain/entities/contact";
// import {ContactRepository} from "../../domain/repositories/repositories";

export interface ContactDataSource {
  getAll(): Promise<Contact[]>;
  create(contact: Contact): Promise<boolean>;
}