import server from './server'
import ContactRouter from './presentation/routers/contact-router'
import { ContactRepositoryImpl } from './domain/repositories/contact-repository'
import { MongoClient } from 'mongodb'
import { DatabaseWrapper } from './data/data-sources/database-wrapper'
import { GetAllContactsUseCaseImpl } from './domain/use-cases/get-all-contacts'
import { CreateContactUseCaseImpl } from './domain/use-cases/create-contact'
import { MongodbContactDataSource } from './data/data-sources/mongodb/mongodb-contact-data-source'


(async () => {
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/contacts")
    await client.connect()
    const db = client.db("CONTACTS_DB");

    const contactDatabase: DatabaseWrapper = {
        find: (query) => db.collection("contacts").find(query).toArray(),
        insertOne: (doc) => db.collection("contacts").insertOne(doc)
    }

    const contactMiddleWare = ContactRouter(
        new GetAllContactsUseCaseImpl(new ContactRepositoryImpl(new MongodbContactDataSource(contactDatabase))),
        new CreateContactUseCaseImpl(new ContactRepositoryImpl(new MongodbContactDataSource(contactDatabase))),
    )

    server.use("/contact", contactMiddleWare)
    server.listen(4000, () => console.log("Running on server"))

})()