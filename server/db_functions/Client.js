import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  unpackMultipleDocuments,
  unpackSingleDocument,
} from "../utils/unpackDocument.js";

const schemaTypes = mongoose.Schema.Types;

export const ClientSchema = mongoose.Schema({
  username: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty."],
    unique: [true, "A user with this username already exists."],
  },
  email: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty."],
    unique: [true, "An account with this email already exists."],
  },
  password: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty."],
    minLength: [1, "Empty password entered."],
  },
});

export const ClientObject = mongoose.model("Client", ClientSchema);

export const createClient = (client) => {
  var { username, email, password } = client;

  const httpResponse = new ClientObject({
    username,
    email,
    password,
  })
    .save()
    .then((res) => {
      console.log(`New Client created with id ${res._id}`);
      const token = jwt.sign({ id: res._id, username: res.username }, "nnamdi");
      return { response: token };
    })
    .catch((err) => {
      return { error: err };
    });
  return httpResponse;
};

export const readClients = (params) => {
	return ClientObject.find(params)
		.then(unpackMultipleDocuments)
		.catch((err) => console.log("Error while getting Clients"));
};

export const readClient = (params) => {
	return ClientObject.findOne(params)
		.then(unpackSingleDocument)
		.catch((err) => console.log("Error while getting Client"));
};