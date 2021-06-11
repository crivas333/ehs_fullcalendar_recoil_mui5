//import Joi from "joi";
//import { startChat } from "../schemas";
import Encounter from "../../client/src/components/encounter/Encounters";
import { Patient, Appointment, Counters } from "../models";
//import { UserInputError } from "apollo-server-express";
//import mongoose from "mongoose";

export default {
  Query: {
    encounters: async (root, args, context, info) => {
      // TODO: projection, pagination
      // console.log('patients')
      console.log("encounters: ", args);
      return await Encounter.find({}).exec();
    },
    getEncountersByTimeframe: async (root, args, context, info) => {
      // TODO: projection, pagination
      console.log("getEncountersByTimeframe: ", args);
      try {
        const doc = await Encounter.find({
          encounterDate: { $gte: args.encounterDate },
          encounterDate: { $lte: args.encounterDate },
        })
          .sort({ start: "asc" })
          .exec();
        //console.log(doc);
        return doc;
      } catch (err) {
        console.log(err);
        //throw err;
        return err;
      }
    },
  },
  Mutation: {
    addEncounter: async (root, args, { req }, info) => {
      console.log("addEncounter-args: ", args);
      //const { userId } = req.session;
      //console.log("AddAppointmente - userId: ", userId);
      let encounterId;
      let encounterRes;
      try {
        encounterId = await Counters.findOneAndUpdate(
          { _id: "encounterId" },
          { $inc: { sequence_value: 1 } },
          { new: true }
        );
      } catch (err) {
        throw new Error("EncounterId not generated");
      }

      const appo = new Encounter({
        //creator: userId
        encounterId: encounterId.sequence_value,
        patientId: args.encounterInput.patientId || null,
        encounterDate: args.encounterInput.encounterDate,
        facility: args.encounterInput.facility,
        encounterType: args.encounterInput.encounterType,
        patientType: args.encounterInput.patientType,
        serviceType: args.encounterInput.serviceType,
        sensitivity: args.encounterInput.sensitivity,
        serviceBundle: args.encounterInput.serviceBundle,
        status: args.encounterInput.status,
        healthProf: args.encounterInput.healthProf,
        chiefComplain: args.encounterInput.chiefComplain,
      });
      //let createdAppo;
      try {
        appoRes = await appo.save();
        //console.log("appointment.save - result: ", appoRes);
      } catch (err) {
        console.log("apointmenteSave-err: ", err);
        throw err;
      }

      return appoRes;
    },

    updateEncounter: async (root, args, { req }, info) => {
      console.log("resolver.encounter-updateEncounter-args: ", args);
      const doc = await Encounter.findById(args.id);
      doc.encounterId = args.encounterInput.encounterId;
      doc.patientId = args.encounterInput.patientId;
      doc.encounterDate = args.encounterInput.encounterDate;
      doc.facility = args.encounterInput.facility;
      doc.encounterType = args.encounterInput.encounterType;
      doc.patientType = args.encounterInput.patientType;
      doc.serviceType = args.encounterInput.serviceType;
      doc.sensitivity = args.encounterInput.sensitivity;
      doc.serviceBundle = args.encounterInput.serviceBundle;
      doc.status = args.encounterInput.status;
      doc.healthProf = args.encounterInput.healthProf;
      doc.chiefComplain = args.encounterInput.chiefComplain;
      return await doc.save();
      // try {
      //   const appointment = await Appointment.findOneAndUpdate(
      //     { _id: args.id },
      //     {
      //       $set: {
      //         appointmentId: args.encounterInput.appointmentId,  //this filed must be included
      //         type: args.encounterInput.type,
      //         status: args.encounterInput.status,
      //         start: args.encounterInput.start,
      //         end: args.encounterInput.end,
      //         patientId: args.encounterInput.patientId || null,
      //         fullName: args.encounterInput.fullName || "",
      //         notRegistered: args.encounterInput.notRegistered || "",
      //         description: args.encounterInput.description || "",
      //       },
      //     },
      //     { new: true }
      //   ).exec();
      //   console.log("update-appointment: ", appointment);
      //   return appointment;
      // } catch (err) {
      //   console.log("updateAppointment-error: ", error);
      // }
    },
    deleteEncounter: async (root, args, { req }, info) => {
      const encounter = await Encounter.findByIdAndDelete(args.id);
      // patient = await Patient.findById(args.id)
      // req.session.userId = patient.id
      return encounter;
    },
  },
  //in the following code: parent=appointment
  Encounter: {
    patientId: async (parent, args, context, info) => {
      //console.log("Mutation-Appointment-parent: ", parent);
      // return (await appointment.populate('patient').execPopulate()).patient
      return await Patient.findById(parent.patientId);
    },
    // creator: async (appointment, args, context, info) => {
    //       // console.log('parent - appointment: ',appointment)
    //       // console.log('parent - appointment: ',appointment.creator)
    //       //return (await appointment.populate('creator').execPopulate()).creator
    //       // return Message.find({ chat: chat.id })
    //   return (await User.findById(appointment.creator))
    // }
  },
};

// Patient: {
//   appointments: async (patient, args, { req }, info) => {
//     // TODO: should not be able to list other ppl's chats or read their msgs!
//     return (await patient.populate('appointments').execPopulate()).appointments
//   }
// }
