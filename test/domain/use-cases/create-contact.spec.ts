import { Contact } from '../../../src/domain/entities/contact';
import { ContactRepository } from '../../../src/domain/repositories/repositories';
import { CreateContactUseCaseImpl as CreateContactUseCase } from '../../../src/domain/use-cases/create-contact';

describe('CreateContactUseCase', () => {
  class MockContactRepository implements ContactRepository {
    getAll(): Promise<Contact[]> {
      // not implemented
      throw new Error('Method not implemented.');
    }
    create(contact: Contact): Promise<boolean> {
      // not implemented
      throw new Error('Method not implemented.');
    }
  }
  let mockContactRepository: MockContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test ('should create contact', async () => {
    const inputData: Contact = { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@gmail.com' };
    jest.spyOn(mockContactRepository, 'create').mockImplementation(() => Promise.resolve(true));

    const createContactUseCase = new CreateContactUseCase(mockContactRepository);
    const response = await createContactUseCase.execute(inputData);
    
    expect(response).toBe(true);
    expect(mockContactRepository.create).toHaveBeenCalledTimes(1);
  });
});