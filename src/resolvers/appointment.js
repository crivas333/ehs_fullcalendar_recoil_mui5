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
        //subject: args.subject,
        //patient: args.patient,
        //creator: userId
        appointmentId: appointmentId.sequence_value,
        appointmentType: args.appointmentInput.appointmentType,
        appointmentStatus: args.appointmentInput.appointmentStatus,
        start: args.appointmentInput.start,
        end: args.appointmentInput.end,
        patient: args.patient || null,
        //comments: args.appointmentInput.comments,
        title: args.appointmentInput.title,
        IsAllDay: args.appointmentInput.IsAllDay,
      });
      //let createdAppo;
      try {
        appoRes = await appointment.save();
        console.log("appointment.save - result: ", appoRes);
      } catch (err) {
        console.log(err);
        throw err;
      }

      if (
        args.appointmentInput.patient !== "" &&
        args.appointmentInput.patient !== null
      ) {
        try {
          await Patient.findOneAndUpdate(
            { _id: args.patient },
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
      console.log("resolvers.appointment-updateAppointment: ", args);
      //return Appointment.findById(args.id)

      try {
        const appointment = await Appointment.findOneAndUpdate(
          { appointmentId: args.appointmentInput.appointmentId },
          {
            $set: {
              appointmentType: args.appointmentInput.appointmentType,
              appointmentStatus: args.appointmentInput.appointmentStatus,
              StartTime: args.appointmentInput.StartTime,
              EndTime: args.appointmentInput.EndTime,
              patient: args.appointmentInput.patient || null,
              fullName: args.appointmentInput.fullName || "",
              noRegistered: args.appointmentInput.noRegistered,
              creator: null,
              Description: args.appointmentInput.Description,
              Subject: args.appointmentInput.Subject,
              IsAllDay: args.appointmentInput.IsAllDay,
            },
          },
          { new: true }
        ).exec();
        console.log("changed appointment: ", appointment);

        const prevPatientRef = await Appointment.findOne(
          { appointmentId: args.appointmentInput.appointmentId },
          "patient"
        ).exec();
        console.log("prevPatientRef: ", prevPatientRef);
        //const prevPatientRefstring=prevPatientRef.patient+''
        //const prevPatientRefstring=prevPatientRef.patient.toString()

        if (
          args.appointmentInput.patient === null &&
          prevPatientRef.patient === null
        ) {
          console.log(" empty patientRef  and empty previousRef");
        }
        if (
          args.appointmentInput.patient === null &&
          prevPatientRef.patient !== null
        ) {
          console.log(" empty patientRef  and filled previousRef");
          await Patient.findOneAndUpdate(
            { _id: prevPatient.patient + "" },
            { $pull: { appointments: args.appointmentInput.id } }
          ).exec();
        }
        if (
          args.appointmentInput.patient !== null &&
          prevPatientRef.patient === null
        ) {
          console.log(" filled with patientRef  and empty previousRef");
          await Patient.findOneAndUpdate(
            { _id: args.appointmentInput.patient },
            { $push: { appointments: appointment } }
          ).exec();
        }

        if (
          args.appointmentInput.patient !== null &&
          prevPatientRef.patient !== null
        ) {
          console.log("filled with patientRef  and filled with previousRef");

          if (args.appointmentInput.patient !== prevPatientRef.patient + "") {
            console.log("PatientRef changed!");
            await Patient.findOneAndUpdate(
              { _id: prevPatient.patient + "" },
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
    patient: async (appointment, args, context, info) => {
      // return (await appointment.populate('patient').execPopulate()).patient
      return await Patient.findById(appointment.patient);
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
