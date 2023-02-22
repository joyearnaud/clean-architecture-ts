import { Contact } from "../entities/contact";
import { ContactRepository } from "../repositories/repositories";
import { CreateContactUseCase } from "./use-cases";

export class CreateContactUseCaseImpl implements CreateContactUseCase {
    private readonly contactRepository: ContactRepository;

    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(contact: Contact): Promise<boolean> {
       return await this.contactRepository.create(contact);
    }
}