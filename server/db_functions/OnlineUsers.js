import mongoose from "mongoose";
import {
  unpackMultipleDocuments,
  unpackSingleDocument,
} from "../utils/unpackDocument.js";

// collection that stores ids of online users - need to add and delete upon login / logout
const schemaTypes = mongoose.Schema.Types;

export const onlineUserSchema = mongoose.Schema({
    id: { 
      type: schemaTypes.ObjectId,
      required: [true, "This field cannot be empty."],
      unique: [true, "A user with this username already exists."]
    },
    isClient: {
      type: schemaTypes.Boolean,
      required: [true, "This field cannot be empty."],
    }
});

export const OnlineUserObject = mongoose.model("OnlineUser", onlineUserSchema);

export const addOnlineUser = async(id, isClient) => {
  console.log("Add user with:", id, isClient);
  const exists = OnlineUserObject
    .findOne({ id, isClient })
    .then((res) => {
      if (res) {
        console.log("User already in online users");
        return true;
      }
    })
    .catch(err => {
      console.log("Error checking exists", err);
      return false;
    })

  if (exists) return;

  const httpResponse = new OnlineUserObject({
    id,
    isClient
  })
  .save()
  .then((res) => {
    console.log(`Online ${isClient ? "Client" : "Counsellor"} added: ${id}`);
    return { response: 'ok' };
  })
  .catch(err =>  {
    console.log("Err in online user add:", err)
    { error: err }
  }
  );
}

export const getOnlineUsers = (id, isClient) => {
  return OnlineUserObject.find({})
    .then(unpackMultipleDocuments)
    .catch(err => console.log("Error getting online users:", err))
}