import { Contact } from "../models/Contact";
import { db } from "./database";

function createContactTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT NOT NULL, 
            phone TEXT NOT NULL, 
            isFavorite BOOLEAN default 0, 
            image TEXT, 
            contactId TEXT
          )`,
        [],
        (_, { rows }) => {
          resolve(rows._array[0]);
        }
      );
    }, reject);
  });
}

function dropContactTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS contacts", [], (_, { rows }) => {
        resolve(rows._array[0]);
      });
    }, reject);
  });
}

function addContact(contact: Contact) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO contacts (name, phone, isFavorite, image, contactId) VALUES (?, ?, ?, ?, ?)",
        [
          contact.name,
          contact.phone,
          contact.isFavorite == 1 ? 1 : 0,
          contact.image,
          contact.contactId || "",
        ],
        (_, { rows }) => {
          console.log(rows);
          resolve(rows._array[0]);
        }
      );
    }, reject);
  });
}

function deleteContact(contact: Contact) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM contacts WHERE id = ?",
        [contact.id],
        (_, { rows }) => {
          resolve(rows._array[0]);
        }
      );
    }, reject);
  });
}

function readAllContacts(): Promise<Contact[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM contacts", [], (_, { rows }) => {
        resolve(rows._array as Contact[]);
      });
    }, reject);
  });
}

function getContactById(id: number): Promise<Contact> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts WHERE id = ?",
        [id],
        (_, { rows }) => {
          resolve(rows._array[0]);
        }
      );
    }, reject);
  });
}

function updateContact(contact: Contact) {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "UPDATE contacts SET name = ?, phone = ?, isFavorite = ?, image = ?, contactId = ? WHERE id = ?",
          [
            contact.name,
            contact.phone,
            contact.isFavorite == 1 ? 1 : 0,
            contact.image,
            contact.contactId || "",
            contact.id,
          ]
        );
      },
      reject,
      () => {
        resolve("updated");
      }
    );
  });
}

function searchContacts(query: string): Promise<Contact[]> {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM contacts WHERE name LIKE ?",
        [`%${query}%`],
        (_, { rows }) => {
          resolve(rows._array);
        }
      );
    }, reject);
  });
}

export {
  createContactTable,
  dropContactTable,
  addContact,
  deleteContact,
  readAllContacts,
  getContactById,
  updateContact,
  searchContacts,
};
