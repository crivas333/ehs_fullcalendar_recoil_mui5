import mongoose, { Schema } from 'mongoose'
// import mongoose from 'mongoose'
// import { hash, compare } from 'bcryptjs'

const patientSchema = new mongoose.Schema({
  idType: {
    type: String,
    //required: [true, 'Please add DNI']
  },
  idTypeNo: {
    type: String,
    //required: [true, 'Please add DNI']
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  },
  lastName2: {
    type: String,
    trim: true,
    required:false
  },
  birthDay: {
    type: Date,
    //type: String,
    required:false
  },
  sex: {
    type: String,
    trim: true,
    required:false
  },
  phone1: {
    type: String,
    trim: true,
    required:false
  },
  phone2: {
    type: String,
    trim: true,
    required:false
  },
  email: {
    type: String,
    trim: false,
    required: false
  },
  address: {
    type: String,
    trim: true,
    required:false
  },
  gName: {
    type: String,
    trim: true,
    required:false
  },
  gPhone1: {
    type: String,
    trim: true,
    required:false
  },
  gPhone2: {
    type: String,
    trim: true,
    required:false
  },
  gRelation: {
    type: String,
    trim: true,
    required:false
  },
  bloodType: {
    type: String,
    trim: true,
    required:false
  },
  marital: {
    type: String,
    trim: true,
    required:false
  },
  occupation: {
    type: String,
    trim: true,
    required:false
  },
  religion: {
    type: String,
    trim: true,
    required:false
  },
  referral: {
    type: String,
    trim: true,
    required:false
  },
  historyId: {
    type: Number
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  exams: [{
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  }]
  // age: {
  //   type: String,
  //   required:false
  // },
}, {
  timestamps: true,
  getters: true
})
patientSchema.virtual('fullName').get(function (value, virtual, doc) {
  return this.lastName + ' ' + this.lastName2 + ', ' + this.firstName;
});
patientSchema
    .set('toObject', { virtuals: true })
    .set('toJSON', { virtuals: true });
const Patient = mongoose.model('Patient', patientSchema)

export default Patient
