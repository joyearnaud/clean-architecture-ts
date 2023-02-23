import { Contact } from '../../../src/domain/entities/contact';
import { ContactRepository } from '../../../src/domain/repositories/repositories';
import { GetAllContactsUseCaseImpl as GetAllContactsUseCase } from '../../../src/domain/use-cases/get-all-contacts';

describe('GetAllContactsUseCase', () => {
  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = {
      getAll: jest.fn(),
      create: jest.fn()
    }
  });

  test ('should return all contacts', async () => {
    const expectedData: Contact[] = [{ id: 1, firstName: 'John', lastName: 'Do', email: 'johndo@gmail.com' }];
    jest.spyOn(mockContactRepository, 'getAll').mockImplementation(() => Promise.resolve(expectedData));

    const getAllContactsUseCase = new GetAllContactsUseCase(mockContactRepository);
    const response = await getAllContactsUseCase.execute();
    
    expect(response).toStrictEqual(expectedData);
    expect(mockContactRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
