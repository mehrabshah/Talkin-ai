
import {getAuth} from "@clerk/nextjs/server"
import { checkNewUserTrial } from "../../utils/functions";


export default async function handler(req, res) {

  try {
  const { userId } = getAuth(req);
  if(!userId){
  res.status(401).send("Not logged in");
  return;
  }
  
  console.log(userId);

  //const subscriptionStart = req.query.startDate;

  const result = await checkNewUserTrial(userId);
  
  console.log(result);
  

  res.json({ "trialUsage" : result });
} catch (err) {
  res.send(err);
}

} 
