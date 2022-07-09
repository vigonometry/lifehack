import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  unpackMultipleDocuments,
  unpackSingleDocument,
} from "../utils/unpackDocument.js";

const schemaTypes = mongoose.Schema.Types;

export const ChatSchema = mongoose.Schema({
  clientId: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty."],
  },
  counsellorId: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty."],
  },
});

export const ChatObject = mongoose.model("Chat", ChatSchema);

export const createChat = (chat) => {
  const httpResponse = new ChatObject({ ...chat })
    .save()
    .then((res) => ({ response: res._id }))
    .catch((err) => ({ error: err }));
  return httpResponse;
};

export const readChats = (params) => {
  return ChatObject.find(params)
    .then(unpackMultipleDocuments)
    .catch((err) => console.log("Error while getting Chats"));
};
export const readChat = (params) => {
  return ChatObject.findOne(params)
    .then(unpackSingleDocument)
    .catch((err) => console.log("Error while getting Chat"));
};

export const updateChat = (query, update) => {
  return ChatObject.findOne(query)
    .then((res) => {
      res.messages.push(update);
    })
    .then((res) => ({ response: res._id }))
    .catch((err) => ({ error: err }));
};

export const deleteChat = (params) => {
  return ChatObject.findOneAndDelete(params)
    .then((res) => ({ response: "Deleted" }))
    .catch((err) => ({ error: err }));
};
