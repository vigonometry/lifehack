import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {
  unpackMultipleDocuments,
  unpackSingleDocument,
} from "../utils/unpackDocument.js";

const schemaTypes = mongoose.Schema.Types;

export const CounsellorSchema = mongoose.Schema({
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
  institution: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty. "],
    validate: {
      validator: function (inst) {
        const insts = ["NUS", "NTU", "SMU", "Polytechnic", "ITE"];
        insts.includes(inst);
      },
      message: (props) => `Invalid institution entered.`,
    },
  },
  course: {
    type: schemaTypes.String,
    required: [true, "This field cannot be empty. "],
  },
});

export const CounsellorObject = mongoose.model("Counsellor", CounsellorSchema);

export const createCounsellor = (counsellor) => {
  var { username, email, password, institution, course } = counsellor;

  const httpResponse = new CounsellorObject({
    username,
    email,
    password,
    institution,
    course,
  })
    .save()
    .then((res) => {
      console.log(`New counsellor created with id ${res._id}`);
      const token = jwt.sign({ id: res._id, username: res.username }, "nnamdi");
      return { response: token };
    })
    .catch((err) => {
      return { error: err };
    });
  return httpResponse;
};

export const readCounsellors = (params) => {
	return CounsellorObject.find(params)
		.then(unpackMultipleDocuments)
		.catch((err) => console.log("Error while getting Counsellors"));
};

export const readCounsellor = (params) => {
	return CounsellorObject.findOne(params)
		.then(unpackSingleDocument)
		.catch((err) => console.log("Error while getting Counsellor"));
};