import { Contact } from "../entities/contact";
import { ContactRepository } from "../repositories/repositories";
import { GetAllContactsUseCase } from "./use-cases";

export class GetAllContactsUseCaseImpl implements GetAllContactsUseCase {
    private readonly contactRepository: ContactRepository;

    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(): Promise<Contact[]> {
        return await this.contactRepository.getAll();
    }
}