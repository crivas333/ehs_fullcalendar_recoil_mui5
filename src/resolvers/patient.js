// import Joi from 'joi'
// import { signUp, signIn, objectId } from '../schemas'
// import { attemptSignIn, signOut } from '../auth'
// import { User } from '../models'
import { UserInputError } from "apollo-server-express";
import { Patient } from "../models";
import { Counters } from "../models";
//import { response } from 'express'

export default {
  Query: {
    patients: async (root, args, context, info) => {
      // TODO: projection, pagination
      //console.log("patients", args);
      return await Patient.find({});
    },
    patient: async (root, args, context, info) => {
      //console.log(await Patient.findById(args.id));
      return await Patient.findById(args.id);
    },
    searchPatientsByLastName: async (root, args, context, info) => {
      //console.log("searchPatientByLastName: ", args.lastName);
      // return Patient.find({})
      return await Patient.find({ lastName: new RegExp(args.lastName) });
    },
  },
  Mutation: {
    createPatient: async (root, args, { req }, info) => {
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false })
      // const patient = await Patient.create(args)
      // console.log('createPatient-args: ',args)
      let historyId;
      try {
        historyId = await Counters.findOneAndUpdate(
          { _id: "historyId" },
          { $inc: { sequence_value: 1 } },
          { new: true }
        );
        console.log("hystoryId: ", historyId);
        // const patient = await Patient.create(args)
      } catch (err) {
        console.log(err);
        throw err;
      }

      try {
        const patient = new Patient({
          historyId: historyId.sequence_value,
          //dni: args.patientInput.dni,
          idType: args.patientInput.idType,
          idTypeNo: args.patientInput.idTypeNo,
          firstName: args.patientInput.firstName,
          lastName: args.patientInput.lastName,
          lastName2: args.patientInput.lastName2,
          birthDay: args.patientInput.birthDay,
          sex: args.patientInput.sex,
          phone1: args.patientInput.phone1,
          phone2: args.patientInput.phone2,
          email: args.patientInput.email,
          address: args.patientInput.address,
          gName: args.patientInput.gName,
          gPhone1: args.patientInput.gPhone1,
          gPhone2: args.patientInput.gPhone2,
          gRelation: args.patientInput.gRelation,
          bloodType: args.patientInput.bloodType,
          marital: args.patientInput.marital,
          occupation: args.patientInput.occupation,
          religion: args.patientInput.religion,
          referral: args.patientInput.referral,
        });
        const result = await patient.save();
        // createdEvent = transformEvent(result);
        console.log("createPatient: ", result);
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    updatePatient: async (root, args, { req }, info) => {
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false })
      // console.log('UpdatePatient:', args.id)
      // const patient = await Patient.findByIdAndUpdate(args.id, args, { new: 'true' })
      const patient = await Patient.findByIdAndUpdate(
        args.id,
        args.patientInput,
        { new: "true" }
      );
      // req.session.userId = patient.id
      return patient;
    },
    deletePatient: async (root, args, { req }, info) => {
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false })
      //console.log('DeletePatient:', args.id)
      const patient = await Patient.findByIdAndDelete(args.id);
      // patient = await Patient.findById(args.id)
      // req.session.userId = patient.id
      return patient;
    },
  },
  Patient: {
    appointments: async (patient, args, { req }, info) => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      console.log("parent - patient: ", patient);
      return (await patient.populate("appointments").execPopulate())
        .appointments;
    },
  },
};

/*
   const historyId = await Counters.findOneAndUpdate({ _id: 'historyId'}, { $inc: { sequence_value: 1 } }, {new: true },function(err, response) {
        if (err) {
        // callback(err);
          throw new UserInputError('Patient creation did not finish.')
       } 
       
      })
*/
