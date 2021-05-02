import mongoose, { Schema } from 'mongoose'


const { ObjectId } = Schema.Types


const alergiesSchema = new Schema({
  
  type:{
    type: String
  },
  dateofService:{
    type: Date
  },
  patient: {
    type: ObjectId,
    ref: 'Patient'
  },
  description: {
    type: String
  },
  creator: {
    type: ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})

export default mongoose.model('Alergies', alergiesSchema)


const vitalsSchema = new Schema({
  
    group: {
      type: String
    },
    param:{
      type: String
    },
    date:{
      type: Date
    },
    patient: {
      type: ObjectId,
      ref: 'Patient'
    },
    description: {
      type: String
    },
    creator: {
      type: ObjectId,
      ref: 'User'
    },
  }, {
    timestamps: true
  })
  
  export default mongoose.model('Vitals', vitalsSchema)