import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // create connect to db and version being used
  const jateDb = await openDB('jate', 1);

  // create new transaction and specify database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // open up object store
  const store = tx.objectStore('jate');

  // use .put to store and pass in updated content
  const request = store.put({ id: 1, value: content });

  // get confirmation
  const result = await request;

  console.log('Data saved to the database', result)
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the database');

  // created connection to database and version we want
  const jateDb = await openDB('jate', 1);

  // create new transaction and specify database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //  open desired object store
  const store = tx.objectStore('jate');

  // use getall method to get all from database
  const request = store.getAll();

  // get confirmation
  const result = await request;
  console.log('result.value', result);
  return result.value;
}



initdb();
