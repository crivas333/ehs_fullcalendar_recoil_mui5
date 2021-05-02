import mongoose, { Schema } from 'mongoose'

//const { ObjectId } = Schema.Types

const applicationFieldsSchema = new Schema({
  fieldView: {
    type: String},
  fieldType: {
    type: String},
  fieldData: {
    type: String
  }
}, {
  timestamps: true
})

//export default mongoose.model('ApplicationFields', customDataSchema)
const ApplicationFields = mongoose.model('ApplicationFields', applicationFieldsSchema)

export default ApplicationFields