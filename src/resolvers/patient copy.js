// import Joi from 'joi'
// import { signUp, signIn, objectId } from '../schemas'
// import { attemptSignIn, signOut } from '../auth'
// import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
import { Patient } from '../models'
import { Counters} from '../models'


export default {
  Query: {
    patients: (root, args, context, info) => {
      // TODO: projection, pagination
      // console.log('patients')
      return Patient.find({})
    },
    patient: async (root, args, context, info) => {
      return Patient.findById(args.id)
    },
    getPatientsByLastName: async (root, args, context, info) => {
      // console.log('root: ', args.lastName)
      // return Patient.find({})
      return Patient.find({ lastName: new RegExp(args.lastName) })
    }
  },
  Mutation: {
    createPatient: async (root, args, { req }, info) => {
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false })
      // const patient = await Patient.create(args)
      const historyId = await Counters.findOneAndUpdate({ _id: 'historyId'}, { $inc: { sequence_value: 1 } }, {new: true },function(err, response) {
        if (err) {
        // callback(err);
          throw new UserInputError('Patient creation did not finish.')
       } else {
        // callback(response);
        console.log('hystoryId: ',historyId)
       
       }
      })
      const patient = await Patient.create(args)
      return patient
      
    },
    updatePatient: async (root, args, { req }, info) => {
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false })
      // console.log('UpdatePatient:', args.id)
      const patient = await Patient.findByIdAndUpdate(args.id, args, { new: 'true' })
      // req.session.userId = patient.id
      return patient
    },
    deletePatient: async (root, args, { req }, info) => {
      // TODO: projection
      // await Joi.validate(args, signUp, { abortEarly: false })
      console.log('DeletePatient:', args.id)
      const patient = await Patient.findByIdAndDelete(args.id)
      // patient = await Patient.findById(args.id)
      // req.session.userId = patient.id
      return patient
    }
  },
  Patient: {
    appointments: async (patient, args, { req }, info) => {
      // TODO: should not be able to list other ppl's chats or read their msgs!
      console.log('parent - patient: ',patient)
      return (await patient.populate('appointments').execPopulate()).appointments
    }
  }
}
