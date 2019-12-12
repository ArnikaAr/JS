function connectDb(name, version, callback){
    return new Promise((res, rej) =>{
        const request = indexedDB.open(name, version);
        request.onsuccess = () => {
            res(request.result);
        };
        request.onerror = () => {
            rej(request.error);
        };
        request.onupgradeneeded = () => {
            callback(request.result);
            res(request.result);
        };
    });
}
