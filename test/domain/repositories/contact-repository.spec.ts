import { Contact } from '../../../src/domain/entities/contact';
import { ContactRepository } from '../../../src/domain/repositories/repositories';
import { ContactDataSource } from '../../../src/data/data-sources/contact-data-source';
import { ContactRepositoryImpl } from '../../../src/domain/repositories/contact-repository';

describe('ContactRepositoryImpl', () => { 

  let mockContactDataSource: ContactDataSource;
  let contactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactDataSource = {
      getAll: jest.fn(),
      create: jest.fn()
    }
    contactRepository = new ContactRepositoryImpl(mockContactDataSource);
  });

  test ('should return all contacts', async () => {
    const expectedData: Contact[] = [{ id: 1, firstName: 'John', lastName: 'Do', email: 'johndo@gmail.com' }];
    jest.spyOn(mockContactDataSource, 'getAll').mockImplementation(() => Promise.resolve(expectedData));

    const response = await contactRepository.getAll();

    expect(response).toStrictEqual(expectedData);
    expect(mockContactDataSource.getAll).toHaveBeenCalledTimes(1);
  });

  test ('should create contact', async () => {
    const inputData: Contact = { id: 1, firstName: 'John', lastName: 'Do', email: '' };
    jest.spyOn(mockContactDataSource, 'create').mockImplementation(() => Promise.resolve(true));

    const response = await contactRepository.create(inputData);

    expect(response).toBe(true);
    expect(mockContactDataSource.create).toHaveBeenCalledTimes(1);
  });
});