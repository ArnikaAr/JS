## DESCRIPTION:

In this task you need to build a wrapper library to hold data offline, that supports different storage technologies and provide infrastructure to build it.

Implementation must be on ES6.

## REQUIREMENTS:

For this task use gulp.js with the following tasks:
- `bundle` - bundles js into single file and minifie them. Use `gulp-concat` plugin and for minification you can use `gulp-minify` or `gulp-uglify` or another.

- `сss` - bundles css in to one file, minify, add prefixes for different browser. For implementation add 3 css files with random styles. Use `minifyCss`, `autoprefixer`, `concat` at your discretion. For mification you can use `gulp-cssmin`, `gulp-clean-css`.

- `lint` - checks all js files before concatenation, use `gulp-eslint`. Add single `quotes`, `space-before-blocks`, `no-var`, `max-len`(`60` characters) rules.
    Add pipe which will check whether your file are correct then write to `dist`, for this purpose use `gulp-if`.

- All files after build should be in `dist` folder( js, css )

- Create default task which will be run with `gulp` command, that will run `bundle`, `css` and `lint` tasks.

**Library requirements**

1. Create `Storage` singleton object. `Storage` singleton object should be accessible in global scope.

2. `Storage` object should have 3 static properties `LOCAL_STORAGE`, `SESSION_STORAGE` and `INDEXED_DB` that are used to specify which type of the store should be used for operation.

3. `Storage` should have following public API:

  - `Storage.save = function(key, value, storageType, callback) { ... }` - saves record to storage.

  - `Storage.get = function(key, storageType, callback) { ... }` - retrieves record from storage.

  - `Storage.getAll = function(storageType, callback) { ... }` - retrieves all records for specified storage as object.

  - `storageType` is optional parameter in function arguments. If it's not specified, localStorage is used.

  - `callback` is optional is storage type is not eqal to `Storage.INDEXED_DB`

4. `get` and `getAll` should always **asynchronously** call `callback` with retrieved value. Moreover these methods should **synchronously** return retrieved value for `Storage.LOCAL_STORAGE` and `Storage.SESSION_STORAGE`, and `undefined` for `Storage.INDEXED_DB`.

5. Exception should be thrown in case if browser doesn't support specified storage mechanism.

6. Exception should be thrown in case when `Storage.INDEXED_DB` is passed as `storageType` but `callback` param is not a function.

7. Value can be of any type - `string`, `boolean`, `number`, `object`, `Blob` etc. Think how you will store types that are not natively supported by storage mechanism.

8. Return `undefiend` if value isn't present in storage.

9. Each function should be in it's own file. Use static property `_IDB_CONNECTION` on `Storage` object to save connection to IndexedDB and avoid its creation on each method call.

10. Create separate file storage.js which will contain static properties and link to DB connection.


**Examples:**

```js
Storage.save('myKey1', { prop: 'someObjProp' }, Storage.LOCAL_STORAGE); // saves object to localStorage

Storage.get('myKey1'); // returns { prop: 'someObjProp' } (object) from localStorage

const syncReturn = Storage.get('myKey1', Storage.LOCAL_STORAGE, (value) => {
  console.log('myKey1', value); // asynchronously logs 'myKey1' and { prop: 'someObjProp' } (after console.log(syncReturn) was executed)
});
console.log(syncReturn); // logs { prop: 'someObjProp' } before `callback` is called

Storage.save('myKey2', 'value', Storage.INDEXED_DB); // throws an exception - callback is required

Storage.save('myKey2', 'value', Storage.INDEXED_DB, () => { console.log('saved'); }); // `saved` is logged into console after value is successfuly saved

Storage.get('myKey2', Storage.INDEXED_DB); // throws exception -  callback is required
Storage.get('myKey2', Storage.INDEXED_DB, (value) => { console.log('myKey2', value); }); // asynchronously logs 'myKey2' and 'value'

```

You should use native browser implementation without libraries.

You are free to use `http-server` to serve static files from localhost and avoid probles with storages for `file:///` schema.

Support all major browsers:

* Chrome
* Firefox 
* Safari
* Edge


## WORKFLOW:

Commit implemented task to git into

branch `06-javascript-advanced`

folder `06-javascript-advanced/07-infrastructure-of-web-application/task-01`

Structure of resulted task should be:

```
<task folder>
    dist
      storage.min.js
      styles.min.css
    styles
       style-1.css
       style-2.css
       style-3.css
    storage-Save.js
    storage-get.js
    storage-getAll.js
    index.html
```

P.S Do not push your `node_modules` folder.

## SOURCES:

index.html - basic file that uses Storage object.


## DEADLINE:

Due Date - 01.03.2019

Penalty will be applied for each overdue day.
