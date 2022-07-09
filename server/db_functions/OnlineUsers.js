import mongoose from "mongoose";
import {
  unpackMultipleDocuments,
  unpackSingleDocument,
} from "../utils/unpackDocument.js";
import { readUser } from "./utils/readUser.js";

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
  const exists = await OnlineUserObject.findOne({ id, isClient});

  if (exists) {
    console.log("User exists");
    return;
  }

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
  return httpResponse;
}

export const deleteOnlineUser = async(id) => {
  try {
    const res = await OnlineUserObject.findOneAndDelete({ id: id });
    console.log("Del done");
    return res;
  } catch (error) {
    console.log("Err del:", error);
    return error;
  }
    // .then(res => console.log("After deleting user", res))
    // .catch(err => console.log("Deleting online user err", err));
}



export const getOnlineUsers = (id, isClient) => {
  return OnlineUserObject.find({})
    .then(unpackMultipleDocuments)
    .then(array => array.map(obj => readUser({ _id: obj.id })))
    .then(promises => Promise.all(promises))
    .then(values => {
      console.log("Values of each user", values);
      return values;
    })
    .catch(err => console.log("Error getting online users:", err))
}