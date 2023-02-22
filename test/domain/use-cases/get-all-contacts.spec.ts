import { Contact } from '../../../src/domain/entities/contact';
import { ContactRepository } from '../../../src/domain/repositories/repositories';
import { GetAllContactsUseCaseImpl as GetAllContactsUseCase } from '../../../src/domain/use-cases/get-all-contacts';

describe('GetAllContactsUseCase', () => {
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

  test ('should return all contacts', async () => {
    const expectedData: Contact[] = [{ id: 1, firstName: 'John', lastName: 'Smith', email: 'john@gmail.com' }];
    jest.spyOn(mockContactRepository, 'getAll').mockImplementation(() => Promise.resolve(expectedData));

    const getAllContactsUseCase = new GetAllContactsUseCase(mockContactRepository);
    const response = await getAllContactsUseCase.execute();
    
    expect(response).toStrictEqual(expectedData);
    expect(mockContactRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
