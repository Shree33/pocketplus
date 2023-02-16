// Library for authenticating with and adding urls to Pocket

import request from 'superagent';

const handlePromiseError = (error) => console.error('ERROR!', error);

const getRequestToken = (consumerKey:string, callback:string) => {
  console.log("arrived in getRequestToken, callback: ", callback, "consumerKey: ", consumerKey)
  return new Promise((resolve) => {
    request.post('https://getpocket.com/v3/oauth/request')
      .send({
        consumer_key: consumerKey,
        redirect_uri: callback
      })
      .end((err, res) => {
        if (err) {
          console.log('Error getting request token', err);
          return;
        }

        resolve(res.body.code);
      });
  }).catch(handlePromiseError);
};


//make request to pocket api to authenticate user
export default async function handler(req, res) {
  console.log("arrived in handler", req.query)
  const { code } = req.query;
  const consumer_key = process.env.POCKET_CONSUMER_KEY;
  const redirect_uri = "https://www.google.com";
  const url = `https://getpocket.com/v3/oauth/request?consumer_key=${consumer_key}&redirect_uri=${redirect_uri}`;
  try {
      const requestToken = await getRequestToken(consumer_key, redirect_uri);
      console.log("requestToken: ", requestToken)
      const AUTH_URL = `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${redirect_uri}`;
      console.log("AUTH_URL within the function ", AUTH_URL)
      return res.status(200).json({ url: AUTH_URL, token: requestToken });
  }
  catch (handlePromiseError) {
    console.log('Error getting request token. end of handler', handlePromiseError);
  }

};
    

