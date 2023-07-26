
const { Novu } = require('@novu/node');
const novu = new Novu(process.env.NOVU_API_KEY);


export default async function handle(req, res) {
  const {userName, userEmail, productName, planName, productMessage} = req.body;
  try{
  await novu.trigger('on-boarding-notification', {
        to: { 
          subscriberId: process.env.NOVU_SUBSCRIBER_ID,
          email: "support@talkin-ai.com"
        },
        payload: {
          userName, userEmail, productName, planName, productMessage
        }
      });
      res.status(200).send({ message: "Your review has been submitted." })
    }catch (e) {
      console.log(e);
      res.status(500).send({
        message: 'Something went wrong.'
      })
    }
   
    }




