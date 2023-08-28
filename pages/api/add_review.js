
import {getAuth} from "@clerk/nextjs/server"
import { addReview } from "../../utils/functions";
//import { addUser, deleteUser, getUsers } from "../../utils/functions";




// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  
  try {

    const { userId } = getAuth(req);
    if(!userId){
    res.status(401).send("Not logged in");
    return;
    }
    
    console.log(userId);
    
    const {userEmail, userName, productName, planName,  productMessage, dateSubmitted } = req.body;

    

    addReview(userEmail, userName, productName, planName,  productMessage, dateSubmitted);

    return res.status(200).send("success")

  } catch (err) {
    res.send(err);
  }
};











