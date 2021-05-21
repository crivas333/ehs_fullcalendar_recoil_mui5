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
      console.log("addAppointment-args: ", args);
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

      const appo = new Appointment({
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
        backgroundColor: args.appointmentInput.backgroundColor || "",
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

    updateAppointment: async (root, args, { req }, info) => {
      console.log("resolver.appointment-updateAppointment-args: ", args);
      //console.log("resolver.appointment-updateAppointment-args.id: ", args.id);
      //return Appointment.findById(args.id)
      //mongoose.Types.ObjectId.isValid(value)
      //const ID = new mongoose.Types.ObjectId(args.id);
      //console.log("ID", ID);
      //console.log(mongoose.Types.ObjectId.isValid(ID));
      //return Appointment.findById(args.id);
      var appointment;
      const doc = await Appointment.findById(args.id);
      //doc.appointmentId= args.appointmentInput.appointmentId, //it works with or without appointmentId
      doc.type = args.appointmentInput.type;
      doc.status = args.appointmentInput.status;
      doc.start = args.appointmentInput.start;
      doc.end = args.appointmentInput.end;
      doc.patientId = args.appointmentInput.patientId || null;
      doc.fullName = args.appointmentInput.fullName || "";
      doc.notRegistered =
        args.appointmentInput.notRegistered.toUpperCase() || "";
      doc.description = args.appointmentInput.description.toUpperCase() || "";
      doc.backgroundColor = args.appointmentInput.backgroundColor || "";
      return await doc.save();
      // try {
      //   const appointment = await Appointment.findOneAndUpdate(
      //     { _id: args.id },
      //     {
      //       $set: {
      //         appointmentId: args.appointmentInput.appointmentId,  //this filed must be included
      //         type: args.appointmentInput.type,
      //         status: args.appointmentInput.status,
      //         start: args.appointmentInput.start,
      //         end: args.appointmentInput.end,
      //         patientId: args.appointmentInput.patientId || null,
      //         fullName: args.appointmentInput.fullName || "",
      //         notRegistered: args.appointmentInput.notRegistered || "",
      //         description: args.appointmentInput.description || "",
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
    deleteAppointment: async (root, args, { req }, info) => {
      const appointment = await Appointment.findByIdAndDelete(args.id);
      // patient = await Patient.findById(args.id)
      // req.session.userId = patient.id
      return appointment;
    },
  },
  //in the following code: parent=appointment
  Appointment: {
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
