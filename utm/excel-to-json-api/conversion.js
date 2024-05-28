const xlsx = require('xlsx');
const multer = require('multer');
const { saveJsonData, getJsonData } = require('./db');

function excelToJson(excelFilePath, page) {
    const workbook = xlsx.readFile(excelFilePath);
    const pageName = workbook.SheetNames[page];
    const worksheet = workbook.Sheets[pageName];

    if (!worksheet) {
        throw new Error(`Sheet with name "${sheetName}" not found`);
    }

    const jsonData = xlsx.utils.sheet_to_json(worksheet, { defval: null });
    saveJsonData(jsonData);
    return jsonData;
}

module.exports = excelToJson;
