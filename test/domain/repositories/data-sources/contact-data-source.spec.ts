// implement a unit test for ContactRepositoryImpl 
// using Jest and TypeScript
//  - create a mock for ContactDataSource
import { Contact } from '../../../../src/domain/entities/contact';
import { ContactRepository } from '../../../../src/domain/repositories/repositories';
import { ContactDataSource } from '../../../../src/domain/repositories/data-sources/contact-data-source';
import { ContactRepositoryImpl } from '../../../../src/domain/repositories/contact-repository';

describe('ContactRepositoryImpl', () => { 
  class MockContactDataSource implements ContactDataSource {
    getAll(): Promise<Contact[]> {
      // not implemented
      throw new Error('Method not implemented.');
    }
    create(contact: Contact): Promise<boolean> {
      // not implemented
      throw new Error('Method not implemented.');
    }
  }
  let mockContactDataSource: MockContactDataSource;
  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactDataSource = new MockContactDataSource();
    mockContactRepository = new ContactRepositoryImpl(mockContactDataSource);
  });

  test ('should return all contacts', async () => {
    const expectedData: Contact[] = [{ id: 1, firstName: 'John', lastName: 'Smith', email: 'john@gmail.com' }];
    jest.spyOn(mockContactDataSource, 'getAll').mockImplementation(() => Promise.resolve(expectedData));

    const response = await mockContactRepository.getAll();

    expect(response).toStrictEqual(expectedData);
    expect(mockContactDataSource.getAll).toHaveBeenCalledTimes(1);
  });

  test ('should create contact', async () => {
    const inputData: Contact = { id: 1, firstName: 'John', lastName: 'Smith', email: '' };
    jest.spyOn(mockContactDataSource, 'create').mockImplementation(() => Promise.resolve(true));

    const response = await mockContactRepository.create(inputData);

    expect(response).toBe(true);
    expect(mockContactDataSource.create).toHaveBeenCalledTimes(1);
  });
});