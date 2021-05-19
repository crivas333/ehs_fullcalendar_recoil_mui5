//import Joi from "joi";
//import { startChat } from "../schemas";
import { Patient, Appointment, Counters } from "../models";
//import { UserInputError } from "apollo-server-express";
//import mongoose from "mongoose";

export default {
  Query: {
    appointments: async (root, args, context, info) => {
      // TODO: projection, pagination
      // console.log('patients')
      console.log("appointment: ", args);
      return Appointment.find({});
    },
    getAppointmentsByTimeframe: async (root, args, context, info) => {
      // TODO: projection, pagination
      //console.log("getAppointmentsByTimeframe: ", args);
      try {
        const doc = await Appointment.find({
          start: { $gte: args.start },
          end: { $lte: args.end },
        }).exec();
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
    addAppointment: async (root, args, { req }, info) => {
      //console.log("addAppointment: ", args);
      //const { userId } = req.session;
      //console.log("AddAppointmente - userId: ", userId);
      let appointmentId;
      let appoRes;
      try {
        appointmentId = await Counters.findOneAndUpdate(
          { _id: "appointmentId" },
          { $inc: { sequence_value: 1 } },
          { new: true }
        );
      } catch (err) {
        throw new Error("AppointmentId not generated");
      }

      const appointment = new Appointment({
        //creator: userId
        appointmentId: appointmentId.sequence_value,
        type: args.appointmentInput.type,
        status: args.appointmentInput.status,
        start: args.appointmentInput.start,
        end: args.appointmentInput.end,
        patientId: args.appointmentInput.patientId || null,
        fullName: args.appointmentInput.fullName || "",
        notRegistered: args.appointmentInput.notRegistered || "",
        description: args.appointmentInput.description || "",

        //IsAllDay: args.appointmentInput.IsAllDay,
      });
      //let createdAppo;
      try {
        appoRes = await appointment.save();
        //console.log("appointment.save - result: ", appoRes);
      } catch (err) {
        console.log(err);
        throw err;
      }

      if (
        args.appointmentInput.patientId !== "" &&
        args.appointmentInput.patientId !== null
      ) {
        // console.log(
        //   "addApointment-patientId: ",
        //   args.appointmentInput.patientId
        // );
        try {
          await Patient.findOneAndUpdate(
            { _id: args.appointmentInput.patientId },
            { $push: { appointments: appoRes } }
          ).exec();
        } catch {}
      }
      // patient.appointments.push(appointment);
      //patient.appointments.push(result);
      //await patient.save();

      return appoRes;
    },

    updateAppointment: async (root, args, { req }, info) => {
      console.log("resolver.appointment-updateAppointment-args: ", args);
      console.log("resolver.appointment-updateAppointment-args.id: ", args.id);
      //return Appointment.findById(args.id)
      //mongoose.Types.ObjectId.isValid(value)
      //const ID = new mongoose.Types.ObjectId(args.id);
      //console.log("ID", ID);
      //console.log(mongoose.Types.ObjectId.isValid(ID));
      //return Appointment.findById(args.id);
      //var appointment;
      const doc = await Appointment.findById(args.id);
      doc.type = args.appointmentInput.type;
      doc.status = args.appointmentInput.status;
      doc.start = args.appointmentInput.start;
      doc.end = args.appointmentInput.end;
      doc.patientId = args.appointmentInput.patientId || null;
      doc.fullName = args.appointmentInput.fullName || "";
      doc.notRegistered = args.appointmentInput.notRegistered || "";
      doc.description = args.appointmentInput.description || "";
      return await doc.save();
      try {
        appointment = await Appointment.findOneAndUpdate(
          { id: args.id },
          {
            //appointmentId: args.appointmentInput.appointmentId,
            type: args.appointmentInput.type,
            status: args.appointmentInput.status,
            start: args.appointmentInput.start,
            end: args.appointmentInput.end,
            patientId: args.appointmentInput.patientId || null,
            fullName: args.appointmentInput.fullName || "",
            notRegistered: args.appointmentInput.notRegistered || "",
            description: args.appointmentInput.description || "",
          },
          { new: true }
        );
      } catch (err) {
        console.log("updateAppointment-error: ", error);
      }
      return appointment;
    },
  },
  // Appointment: {
  //   patientId: async (appointment, args, context, info) => {
  //     // return (await appointment.populate('patient').execPopulate()).patient
  //     return await Patient.findById(appointment.patientId);
  //   },
  //   // creator: async (appointment, args, context, info) => {
  //   //       // console.log('parent - appointment: ',appointment)
  //   //       // console.log('parent - appointment: ',appointment.creator)
  //   //       //return (await appointment.populate('creator').execPopulate()).creator
  //   //       // return Message.find({ chat: chat.id })
  //   //   return (await User.findById(appointment.creator))
  //   // }
  // },
};

// Patient: {
//   appointments: async (patient, args, { req }, info) => {
//     // TODO: should not be able to list other ppl's chats or read their msgs!
//     return (await patient.populate('appointments').execPopulate()).appointments
//   }
// }
