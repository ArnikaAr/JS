// const parseDate = require("./dateParser");


function checkFilesType(files) {
    const typesOfFile = {
        JS: ['js', 'jsx'],
        TS: ['ts', 'tsx'],
        DEF: ['d.ts'],
        CONF: ['json', 'yaml', 'yml'],
        IMG: [`jpg`, `jpeg`, `png`, `svg`, `gif`]
    };
    const result = [];
    files.forEach(fileElement => {
        let fileType = fileElement.split('.').pop().toLowerCase();
        const fileObj = {
            name: fileElement
        };
        for (let type in typesOfFile) {
            if (typesOfFile[type].some(el => el === fileType)) {
                fileObj.type = type;
                break;
            } else if (fileType === "LOG" || fileElement.includes("logs")) {
                fileObj.type = "Logs";
                fileObj.date = parseDate(fileElement.split("/")[2]);
            } else {
                fileObj.type = "Other";
            }
        }
        result.push(fileObj);
    });
   return result;
}

module.exports = checkFilesType;