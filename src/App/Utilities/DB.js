import Dexie from "dexie";

const db = new Dexie("PRISM");

db.version(parseInt(1)).stores({
    pendingRequests: "++id"
});

export default db;
