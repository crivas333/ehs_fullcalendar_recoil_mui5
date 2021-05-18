import Joi from "joi";
import { startChat } from "../schemas";
import { User, Chat, Message, Patient, Appointment, Counters } from "../models";
import { UserInputError } from "apollo-server-express";

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
      console.log("addAppointment: ", args);
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
      console.log("resolver.appointment-updateAppointment: ", args);
      //return Appointment.findById(args.id)

      try {
        const appointment = await Appointment.findOneAndUpdate(
          { id: args.appointmentInput.appoId },
          {
            $set: {
              appointmentId: args.appointmentInput.id,
              type: args.appointmentInput.type,
              status: args.appointmentInput.status,
              start: args.appointmentInput.start,
              end: args.appointmentInput.end,
              patientId: args.appointmentInput.patientId || null,
              fullName: args.appointmentInput.fullName || "",
              notRegistered: args.appointmentInput.notRegistered || "",
              description: args.appointmentInput.description || "",
            },
          },
          { new: true }
        ).exec();
        console.log("changed appointment: ", appointment);

        const prevPatientRef = await Appointment.findOne(
          { appointmentId: args.appointmentInput.appointmentId },
          "patientId"
        ).exec();
        console.log("prevPatientRef: ", prevPatientRef);
        //const prevPatientRefstring=prevPatientRef.patient+''
        //const prevPatientRefstring=prevPatientRef.patient.toString()

        if (
          args.appointmentInput.patientId === null &&
          prevPatientRef.patientId === null
        ) {
          console.log(" empty patientRef  and empty previousRef");
        }
        if (
          args.appointmentInput.patientId === null &&
          prevPatientRef.patient !== null
        ) {
          console.log(" empty patientRef  and filled previousRef");
          await Patient.findOneAndUpdate(
            { _id: prevPatient.patientId + "" },
            { $pull: { appointments: args.appointmentInput.id } }
          ).exec();
        }
        if (
          args.appointmentInput.patientid !== null &&
          prevPatientRef.patient === null
        ) {
          console.log(" filled with patientRef  and empty previousRef");
          await Patient.findOneAndUpdate(
            { _id: args.appointmentInput.patientId },
            { $push: { appointments: appointment } }
          ).exec();
        }

        if (
          args.appointmentInput.patientId !== null &&
          prevPatientRef.patientId !== null
        ) {
          console.log("filled with patientRef  and filled with previousRef");

          if (args.appointmentInput.patientId !== prevPatientRef.patient + "") {
            console.log("PatientRef changed!");
            await Patient.findOneAndUpdate(
              { _id: prevPatient.patientId + "" },
              { $pull: { appointments: args.appointmentInput.id } }
            ).exec();
          } else {
            console.log("PatientRef didnt change!");
          }
        }

        //return(appointment)
        return Appointment.findById(args.id);
        //return (res.status(200))
        //return res.status(200).json(Appointment.findById(args.id));
      } catch (err) {
        console.log("updateAppointment-error: ", error);
      }
    },
  },
  Appointment: {
    patientId: async (appointment, args, context, info) => {
      // return (await appointment.populate('patient').execPopulate()).patient
      return await Patient.findById(appointment.patientId);
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
