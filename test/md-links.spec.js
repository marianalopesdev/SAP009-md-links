const fileReader = require('../src/fileReader');
const fs = require("fs");
const path = require("path");

describe('fileReader', () => {

  it('fix me', () => {

    console.log('FIX ME!');
  });

});


describe('fileReader', () => {
  it('should read if the file extension is .md', () => {
    const filePath = 'test_files/README.md';

    return fileReader(filePath)
      .then((result) => {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        expect(result).toEqual(fileContents);
      })      
  });
  it('should throw error if the file extension is not .md', () => {
    const filePath = 'test_files/README.txt';
    const errorCode = 'INVALID_EXTENSION'; // Código de erro esperado

    return expect(fileReader(filePath)).rejects.toEqual(errorCode);
  });
});



