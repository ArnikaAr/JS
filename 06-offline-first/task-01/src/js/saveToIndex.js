function saveToIndex(key, response, callback){
    let IDB = null;
    callback('store', 1, (db) => {
        db.createObjectStore('store');
    }).then((db) => {
        IDB = db;
        // eslint-disable-next-line max-len
        const transaction = IDB.transaction('store', 'readwrite');
        // eslint-disable-next-line max-len
        const ourStore = transaction.objectStore('store');
        const request = ourStore.put(key, response);
        request.onsuccess = () => {
            console.log('success');
        };
        request.onerror = () => {
            console.log(request.error);
        };
    });
}