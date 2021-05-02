
import { ApplicationFields } from '../models'
//import {Patient} from '../models'

export default {
  Query: {
    getApplicationFields: async (root, args, context, info) => {
      // TODO: projection, pagination
      //console.log('getApplicationFields')
      // console.log('root - appointment: ',root)
      return await ApplicationFields.find({})
    },
  },
  Mutation: {
    addApplicationFields: async (root, args, { req }, info) => {
      try {
        const data = new ApplicationFields({
          fieldView: args.fieldView,
          fieldType: args.fieldType,
          fieldData: args.fieldData
        })
        const result = await data.save();
        return await ApplicationFields.find({})

      } catch (err) {
        console.log(err);
        throw err;
      }
      
    },
    updateApplicationFields: async (root, args, { req }, info) => {
      //console.log('updateApplicationFields: ',args)
      //console.log('updateApplicationFields: ',args.id)
      //console.log('updateApplicationFields: ',args.fieldData)
      await ApplicationFields.findByIdAndUpdate(args.id, {fieldData: args.fieldData}, { new: 'true' })  
      return await ApplicationFields.find({})
    },
    deleteApplicationFields: async (root, args, { req }, info) => {
      try {
        await ApplicationFields.findByIdAndDelete(args.id) 
        return await ApplicationFields.find({})

      } catch (err) {
        console.log(err);
        throw err;
      }
      
    },

  }
}