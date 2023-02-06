// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
//call pocket api to get request token
const getRequestToken = async (req, res) => {
  try {
    const response = await fetch ("https://getpocket.com/v3/oauth/request?redirect_uri=http://www.google.com&consumer_key=105840-0b6d74eed0d3768a1c6ef11", 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        });
    const json = await response.json();
    console.log("Response: ", json)
    return await res.status(200).json({ code: json.data.code});
  }
  catch (error) {
    return res.status(400).json({ message: error.message, type: "Internal server error" });
  }
}

  // const response = await axios.post("https://getpocket.com/v3/oauth/request?redirect_uri=http://www.google.com&consumer_key=105840-0b6d74eed0d3768a1c6ef11")
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
    // const response = await axios.post("https://getpocket.com/v3/oauth/request", {
    //     consumer_key: "105840-0b6d74eed0d3768a1c6ef11",
    //     redirect_uri: "www.google.com",
    // });
  //   console.log(response);
  //   if (response.status === 200) {
  //     console.log(response);
  //     res.status(200).json({ data: response.data.code });
  //     //res.status(200).json(response.data.code);
  //   }
  // catch (error) {
  //   console.error(error);
  //   res.status(401).json({ name: "mistakes were made" });
  
// }

// const getRequestToken = async (req, res) => {
//   console.log('req', req);
//   try {
//     console.log("Got here")
//     const response = await axios.post("https://getpocket.com/v3/oauth/request?redirect_uri=http://www.google.com&consumer_key=105840-0b6d74eed0d3768a1c6ef11")
//     // const response = await axios.post("https://getpocket.com/v3/oauth/request", {
//     //     consumer_key: "105840-0b6d74eed0d3768a1c6ef11",
//     //     redirect_uri: "www.google.com",
//     // });

//     if (response.status === 200) {
//       console.log(response);
//       res.status(200).json(response.data.code);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

export default getRequestToken;