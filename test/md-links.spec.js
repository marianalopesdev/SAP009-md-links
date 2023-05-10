const fileReader = require('../src/fileReader');
const fs = require("fs");
const path = require("path");
const linkExtractor = require('../src/linkExtractor');
// const jest = require('@jest/globals');
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


describe('linkExtractor', () => {
  it('should extract the links from filecontent', () => {
  //  jest.setTimeout(600000);
    const filePath = 'test_files/README.md';
    const a = [
      { link: 'https://www.figma.com', text: 'Figma' },
      { link: 'https://www.sketch.com', text: 'Sketch' },
      { link: 'https://www.sketch.com', text: 'Sketch' },
      { link: 'https://www.git.com', text: ' git' }
    ];

  
    return linkExtractor(filePath)
      .then((result) => {
       // const fileContents = result;
         //  jest.setTimeout(600000);
        expect(result).toEqual(a);
      })      
  });
  
});