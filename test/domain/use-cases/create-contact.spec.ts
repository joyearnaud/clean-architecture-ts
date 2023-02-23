import { Contact } from '../../../src/domain/entities/contact';
import { ContactRepository } from '../../../src/domain/repositories/repositories';
import { CreateContactUseCaseImpl as CreateContactUseCase } from '../../../src/domain/use-cases/create-contact';

describe('CreateContactUseCase', () => {
  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = {
      getAll: jest.fn(),
      create: jest.fn()
    }
  });

  test ('should create contact', async () => {
    const inputData: Contact = { id: 1, firstName: 'John', lastName: 'Do', email: 'johndo@gmail.com' };
    jest.spyOn(mockContactRepository, 'create').mockImplementation(() => Promise.resolve(true));

    const createContactUseCase = new CreateContactUseCase(mockContactRepository);
    const response = await createContactUseCase.execute(inputData);
    
    expect(response).toBe(true);
    expect(mockContactRepository.create).toHaveBeenCalledTimes(1);
  });
});