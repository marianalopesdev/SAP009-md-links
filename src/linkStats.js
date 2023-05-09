const https = require("https");
const fetch = require("node-fetch");
const showHttpStatusMessages = require("./httpStatusMessages");
//const fetch = require("node-fetch");

module.exports = function linkExtractor(links) {
  let verifiedLinks = links.length;
  let uniqueLinks = [...new Set(links)];
  let uniqueLinksLength = uniqueLinks.length;
  let a = [];
  let b = 0;

  return Promise.all(
    uniqueLinks.map((link) =>
      fetch(link)
        .then((response) => {
      
          const obj = {
            link,
            status: response.status,
            ok: response.ok,
          };
          a.push(obj);
          // console.log(a);
        })
        .catch((error) => {
          //console.log("Código do erro:", error);
          b++;
          // console.log('error.code');
          
          // console.log(error.code);
          // console.log('efim rror.code');
          
          console.log({ link, ok: false, status: showHttpStatusMessages(error.code) });
        })
    )
  ).then(() => {
    return { b, uniqueLinksLength, verifiedLinks };
  });
};

// module.exports = function linkExtractor (links){
//   console.log(links);
//   return Promise.all(links.map((eachObj) => {
//     console.log(eachObj);
//       return fetch(eachObj.href)
//         .then((result) => {
//           console.log('newObjFetch');
//           const newObjFetch = {...eachObj, status: result.status, ok: result.ok};
//        //  console.log(newObjFetch);
//           return newObjFetch;
//         })
//       //  .catch((err) => ({...eachObj, status: 'dd', ok: false }));
//     })
//   );
// // }
// module.exports =
// function linkExtractor(links) {
//   return Promise.all(
//     links.map((link) => fetch(link)
//       .then((response) => ({

//         status: response.status,
//         ok:
//         !!response.ok,
//       }))

//       .catch((error) => ({ link, ok: false, status: error }))),
//   );
// }

// module.exports = function linkExtractor(links) {
//   return new Promise((resolve, reject) => {
//     let verifiedLinks = links.length;
//     let uniqueLinks = [...new Set(links)];
//     console.log(uniqueLinks);
//     let counter = 0;

//     const requests = uniqueLinks.map((link) => {
//       return new Promise((resolve, reject) => {
//         https.get(link, (res) => {
//           console.log('statusCode:', res.statusCode);
//           if (res.statusCode === 200) {
//             counter++;
//            // console.log(counter);
//           }
//           resolve();
//         }).on('error', (e) => {
//           console.error(e);
//           resolve(); // Resolve mesmo em caso de erro para não interromper o loop
//         });
//       });
//     });

//     Promise.all(requests)
//       .then(() => {
//         let b = [];
//         const obj = {
//           allLinks: verifiedLinks,
//           uniqueLinks: uniqueLinks.length,
//           bro: counter
//         };
//         b.push(obj);
//         console.log(b);
//         resolve(b);
//       })
//       .catch(reject);
//   });
// };
