import { readClient } from "../Client.js";
import { readCounsellor } from "../Counsellor.js";

export const readUser = async(params) => {
    try {
      let isClient = true;
      var user = await readClient(params);
      if (!user) { 
        user = await readCounsellor(params) 
        isClient = false;
      }
  
      if (!user) throw "Can't find any user";
  
      console.log("User read", user);
      return {...user, isClient };
  
    } catch (error) {
      console.log("Err read user",error);
    }
  
  }