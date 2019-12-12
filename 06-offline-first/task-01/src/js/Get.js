function get(key, storageType, callback){
    let response;
    switch (storageType){
    case'localStorage':
        // eslint-disable-next-line max-len
        response = JSON.parse(localStorage.getItem(key)) || undefined;
        if (callback && response !== undefined){
            setTimeout(() => {
                callback(response);
            }, 0);
        }else {
            console.log('no such element');
        }
        return response;
    case'sessionStorage':
        // eslint-disable-next-line max-len
        response = JSON.parse(sessionStorage.getItem(key)) || undefined;
        if (callback && response !== undefined){
            setTimeout(() => {
                callback(response);
            }, 0);
        }else {
            console.log('no such element');
        }
        return response;
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
            const request = ourStore.get(key);
            request.onsuccess = () => {
                // eslint-disable-next-line max-len
                console.log('element #', key,'=', request.result);
            };
            request.onerror = () => {
                console.log(request.error);
            };
        });
        break;
    }
}