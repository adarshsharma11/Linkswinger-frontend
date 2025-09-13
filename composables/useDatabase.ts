

let dbInstance: IDBDatabase | null = null;


export function useDatabase() {
    if (!import.meta.client) return null;
    if (dbInstance) return dbInstance;

    if (dbInstance === null) {
        const DBOpenRequest = window.indexedDB.open('linkswinger', 2);
        DBOpenRequest.addEventListener("upgradeneeded", (event) => {
            const db = DBOpenRequest.result;
            console.log(`Upgrading to version ${db.version}`);
        });

        DBOpenRequest.onblocked = (event) => {

        }
        DBOpenRequest.onsuccess = (event) => {
            dbInstance = DBOpenRequest.result;
            console.log("db success")
            // const objectStore = dbInstance.createObjectStore("toDoList", {
            //     keyPath: "taskTitle",
            // });
        }
        DBOpenRequest.onerror = (event) => {
        }
    }

}