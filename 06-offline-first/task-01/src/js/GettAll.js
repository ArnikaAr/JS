function getAll(storageType, callback){

    let responce;
    switch (storageType){
    case'localStorage':
        // eslint-disable-next-line max-len
        responce = localStorage || undefined;
        if (callback && responce !== undefined){
            setTimeout(() => {
                callback(responce);
            }, 0);
        } else {
            console.log('no such element');
        }
        return responce;
    case'sessionStorage':
        // eslint-disable-next-line max-len
        responce = sessionStorage|| undefined;
        if (callback && responce !== undefined){
            setTimeout(() => {
                callback(responce);
            }, 0);
        } else {
            console.log('no such element');
        }
        return responce;
    case'indexedDB':
        let IDB = null;
        callback('store', 1, (db) => {
            db.createObjectStore('store');
        }).then((db) => {
            IDB = db;
            // eslint-disable-next-line max-len
            const transaction = IDB.transaction('store', 'readwrite');
            // eslint-disable-next-line max-len
            const ourStore = transaction.objectStore('store');
            const request = ourStore.getAll();
            request.onsuccess = () => {
                // eslint-disable-next-line max-len
                console.log( request.result);
            };
            request.onerror = () => {
                console.log(request.error);
            };
        });
        break;
    }
}