// Library for authenticating with and adding urls to Pocket

import request from 'superagent';

const handlePromiseError = (error) => console.error('ERROR!', error);


const getAccessToken = (consumerKey, requestToken) => {
  console.log("arrived in getAccessToken, requestToken: ", requestToken, "consumerKey: ", consumerKey)
  return new Promise((resolve, reject) => {
    request.post('https://getpocket.com/v3/oauth/authorize')
      .send({ consumer_key: consumerKey, code: requestToken })
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res.body.access_token);
      });
  }).catch(handlePromiseError);
};


//make request to pocket api to authenticate user
export default async function handler(req, res) {
  console.log("arrived in handler", req.body)
  const { code } = req.query;
  const consumer_key = process.env.POCKET_CONSUMER_KEY;
  const redirect_uri = "https://www.google.com";
  const requestToken = req.body;
  try {
      const accessToken = await getAccessToken(consumer_key, requestToken);
      return accessToken;
  }
  catch (handlePromiseError) {
    console.log('Error getting access token. end of handler', handlePromiseError);
  }

};
    

