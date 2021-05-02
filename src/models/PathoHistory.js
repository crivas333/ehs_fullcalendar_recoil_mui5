import mongoose, { Schema } from 'mongoose'
// import { Patient } from './'

const { ObjectId } = Schema.Types


const persPathoHistSchema = new Schema({
  date:{
    type: Date
  },
  type: {
    type: String
  },
  patient: {
    type: ObjectId,
    ref: 'Patient'
  },
  Description:{
    type: String
  },
  HealthProf: {
    type: String
  },
   creator: {
    type: ObjectId,
    ref: 'User'
  },
  
}, {
  timestamps: true
})
export default mongoose.model('PersPathoHist', persPathoHistSchema)

const famPathoHistSchema = new Schema({
    date:{
      type: Date
    },
    Relationship: {
      type: String
    },
    patient: {
      type: ObjectId,
      ref: 'Patient'
    },
    Description:{
      type: String
    },
    Diagnosis: {
      type: String
    },
    HealthProf: {
      type: String
    },
     creator: {
      type: ObjectId,
      ref: 'User'
    },
    
  }, {
    timestamps: true
  })
  export default mongoose.model('FamPathoHist', famPathoHistSchema)