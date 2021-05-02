import Joi from 'joi'
//import { startChat } from '../schemas'
import { User, Chat, Message, Patient, Appointment, Exam, Counters } from '../models'
//import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    getExamByPatientID: async (root, args, context, info) => {
      // TODO: projection, pagination
      // console.log('patients')
      // console.log('root - appointment: ',root)
      //return Exam.find({})
      //return await Exam.findById(args.id)
      //console.log('getExamByPatientID: ',await Exam.find({ patient: args.id }))
      return await Exam.find({ patient: args.id })
    },
  },  
  Mutation: {
    addExamData: async (root, args, { req }, info) => {
      //console.log('addExam-req.session: ',req.session)
      const { userId } = req.session
      console.log('Mutation - addExam - args: ', args)
      const examId = await Counters.findOneAndUpdate({ _id: 'examId'}, { $inc: { sequence_value: 1 } }, {new: true })
         
      const exam = new Exam({
        //subject: args.subject,
        //patient: args.patient,
        //creator: userId
        examId: examId.sequence_value,
        examType: args.examInput.examType,
        examStatus: args.examInput.examStatus,
        examDateTime: args.examInput.examDateTime,
        patient: args.examInput.patient,
        //historyId: parseInt(args.examInput.historyId)
        historyId: args.examInput.historyId
        
      });
      //let createdAppo;
      try {
        const result = await exam.save();
        // createdEvent = transformEvent(result);
        //const patient = await Patient.findById(args.examInput.patientId);
        const patient = await Patient.findById(args.examInput.patient);
  
        if (!patient) {
          throw new Error('Patient not found.');
        }
        //await Patient.findOneAndUpdate({ _id: eventData[a].patient}, {$push: { appointments: result }}).exec()
        
        // patient.appointments.push(appointment);
        patient.exams.push(result);
        await patient.save();
        
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    
    },
    updateRowExam: async (root, args, { req }, info) => {
      console.log('resolvers.exam-updateRowExam: ',args)

      try{
        const exam = await Exam.findByIdAndUpdate(args.id, args.examInput, { new: 'true' })
    
        console.log('updateRowExam: ',exam)

      //return(exam)
      return Exam.findById(args.id)
      }catch(err){
        console.log('updateRowExam-error: ',error)
      } 

    }
  },
  Exam: {
    patient: async (exam, args, context, info) => {
            // return (await appointment.populate('patient').execPopulate()).patient
      return (await Patient.findById(exam.patient))
    },
    // creator: async (appointment, args, context, info) => {
    //       // console.log('parent - appointment: ',appointment)
    //       // console.log('parent - appointment: ',appointment.creator)
    //       //return (await appointment.populate('creator').execPopulate()).creator
    //       // return Message.find({ chat: chat.id })
    //   return (await User.findById(appointment.creator))
    // }
  }
}