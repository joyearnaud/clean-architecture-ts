import { Contact } from "../entities/contact";

interface CreateContactUseCase {
    execute(contact: Contact): Promise<boolean>;
}
interface GetAllContactsUseCase { 
    execute(): Promise<Contact[]>; 
}

// export all interfaces
export { CreateContactUseCase, GetAllContactsUseCase };