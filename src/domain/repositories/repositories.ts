import { Contact } from "../entities/contact";

interface ContactRepository { 
    getAll(): Promise<Contact[]>; 
    // getById(id: number): Promise<Contact>;
    create(contact: Contact): Promise<boolean>;
    // update(id: number, contact: Contact): Promise<boolean>;
    // delete(id: number): Promise<boolean>;
}

export { ContactRepository };