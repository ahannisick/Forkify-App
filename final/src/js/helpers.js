import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// We can put getJSON and sendJSON into one funtion called AJAX...
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// // Let's learn how we can actually send data using the fetch()
// // function. Up until this point, all we ever did was pass a url
// // into the fetch() function and that would automatically create
// // a GET request.
// export const sendJSON = async function (url, uploadData) {
//   try {
//     // To specify a POST request, rather than just passing in the url,
//     // we need to specify an object of options. We'll need to specify
//     // the http method and pass in an object of headers.
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Payload -> the data we want to send...
//       body: JSON.stringify(uploadData),
//     });

//     // We still have the above request racing about a timeout function.
//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     // We'll also await any data coming back. Because this API will actually
//     // return the data back that we just sent.
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
