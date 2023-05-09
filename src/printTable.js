const chalk = require("chalk");
module.exports = function prinTable(obj, table, path, type) {

 
    console.log(typeof type);
    const coisas = obj;
    const t = type;
    // console.log(t);
    // console.log("printable fn");
    // console.log(obj);
    if (t === "simple") {
      console.log("not ssimple simpwl");
      console.log(table);
      for (let i = 0; i <= obj.length - 1; i++) {
        table.push([
          coisas[i].link,
          coisas[i].status,
          coisas[i].text,
          path,
        ]);
      }
     // console.log(table.toString());
    } else {
      for (let i = 0; i <= obj.length - 1; i++) {
        table.push([coisas[i].link, coisas[i].text, path]);
      }
    
    }
    console.log(table.toString());

 
};
