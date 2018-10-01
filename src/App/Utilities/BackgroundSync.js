import Connection from "./Connection";
import DB from "./DB";
import axios from "axios";

class BackgroundSync {
    post(url, data) {
        return new Promise(resolve => {
            DB.pendingRequests.add({ url, data });
            resolve();
            this.sync();
        });
    }

    sync() {
        console.log('try sync');
        if (!this.isSyncing) {
            this.isSyncing = true;
            const tblPendReqs = DB.pendingRequests;
            const colPendReqs = tblPendReqs.toCollection();

            //Sync first request to test connection.
            colPendReqs.first(firstPendReq => {
                this.syncReq(firstPendReq)
                    .then(() => {
                        //first sync success, sync everything else.
                        //Convert to array to complete readonly transaction (it is a indexeddb thing)
                        tblPendReqs.toArray(arrPendReqs => {
                            const sentReqs = arrPendReqs.map(pendReq => this.syncReq(pendReq));
                            //Wait until all is done to update sync status;
                            axios.all(sentReqs).finally(responses => (this.isSyncing = false));
                        });
                    })
                    .catch(() => (this.isSyncing = false)); //Failed first req, no connection;
            });
        }
    }

    syncReq(req) {
        console.log("making", req.id);
        return Connection.post(req.url, req.data).then(() => DB.pendingRequests.delete(req.id)); //Delete successful request from pending request.
    }
}

const bgSync = new BackgroundSync();

setInterval(() => bgSync.sync(), (process.env.REACT_APP_STORE_FORWARD_SYNC_INTERVAL_SECONDS || 30) * 1000);

export default bgSync;
