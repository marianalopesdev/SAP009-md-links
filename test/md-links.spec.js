const fileReader = require("../src/fileReader");
const fs = require("fs");
const path = require("path");
const linkExtractor = require("../src/linkExtractor");
const validateLinks = require("../src/validateLink");
const { beforeEach } = require("@jest/globals");
// const jest = require('@jest/globals');
jest.mock("fs");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("fileReader", () => {
  it("fix me", () => {
    console.log("FIX ME!");
  });
});

describe("fileReader", () => {
  it("should read if the file extension is .md", () => {
    const mockReadFile = "string de teste";
    expect(fs.readFileSync.mockResolvedValueOnce(mockReadFile));
  });

  it("should throw error if the file extension is not .md", () => {
    const file = "path/to/file.txt";
    const errorCode = "INVALID_EXTENSION"; // Código de erro esperado

    expect(fs.readFileSync(file)).rejects.toEqual(errorCode);
  });
});

describe("linkExtractor", () => {
  it("should extract the links from filecontent", () => {
    //  jest.setTimeout(600000);
    //  const filePath = "test_files/README-fantasy.md";
    const a = "expect";
    const result = [{ link: "https://www.figma.com", text: "Figma" }];

    linkExtractor(a).then((result) => {
      expect(result).toEqual(a);
    });
  });
  it("should throw error has no links", () => {
    const filePath = "path/to/file/empty.md";
    const errorCode = "NO_LINKS"; // Código de erro esperado

    return expect(linkExtractor(filePath)).rejects.toEqual(errorCode);
  });
});

describe("validateLinks", () => {
  it("should return href status", () => {
    const links = ["https://www.figma.com"];

    const validatedLinks = [
      {
        link: "https://www.figma.com",
        status: "Status  OK - This site works fine!",
        text: 200,
        path: "",
      },
    ];

    return validateLinks(links).then((result) => {
      expect(result).toEqual(validatedLinks);
    });
  });
  it("should throw error if the file extension is not .md", () => {
    const filePath = "test_files/README.txt";
    const errorCode = "INVALID_EXTENSION"; // Código de erro esperado

    return expect(fileReader(filePath)).rejects.toEqual(errorCode);
  });
});
