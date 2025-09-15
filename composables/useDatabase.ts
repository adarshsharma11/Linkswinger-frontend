

let dbInstance: IDBDatabase | null = null;

export class LoginDBStore
{
    id! : number
    loginId! : number
}

export function useDatabase() {
    if (!import.meta.client) return null;
    if (dbInstance) return dbInstance;

    if (dbInstance === null) {
        const DBOpenRequest = window.indexedDB.open('linkswinger', 2);
        DBOpenRequest.addEventListener("upgradeneeded", (event) => {
            const db = DBOpenRequest.result;
            if (!db.objectStoreNames.contains('login_store')) {
                db.createObjectStore('login_store', { keyPath: 'id' });
            }
        });

        DBOpenRequest.onblocked = (event) => {

        }
        DBOpenRequest.onsuccess = (event) => {
            dbInstance = DBOpenRequest.result;
        }
        DBOpenRequest.onerror = (event) => {

        }
    }

}
export async function storerole(loginId: number) {
  return new Promise<void>((resolve, reject) => {
    if (!dbInstance) return reject("Database not initialized");

    const tx = dbInstance.transaction("login_store", "readwrite");
    const store = tx.objectStore("login_store");

    const req = store.put({ id: 1, loginId });

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function clearloginstore() {
  return new Promise<void>((resolve, reject) => {
    if (!dbInstance) return reject("Database not initialized");

    const tx = dbInstance.transaction("login_store", "readwrite");
    const store = tx.objectStore("login_store");

    const req = store.clear();

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}