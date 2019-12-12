function save(key, value, storageType, callback){
    let response = JSON.stringify(value) || undefined;
    switch (storageType){
    case'localStorage':
        // eslint-disable-next-line max-len
        localStorage.setItem(key, response);
        break;
    case'sessionStorage':
        sessionStorage.setItem(key, response);
        break;
    case'indexedDB':
        if(value instanceof Blob){
            const fileReader = new FileReader();
            fileReader.onload = ()=> {
                response = fileReader.readAsDataURL(value);
                console.log(response);
                // eslint-disable-next-line max-len
                storageItem.saveToIndex(key, response, callback);
            };
        }else {
            // eslint-disable-next-line max-len
            storageItem.saveToIndex(key, response, callback);
        }
        break;
    }
}