import mongoose, { Schema } from 'mongoose'


const { ObjectId } = Schema.Types


const encounterSchema = new Schema({
  appointment: {
    type: ObjectId,
    ref: 'Appointment'
  }, 
  patient: {
    type: ObjectId,
    ref: 'Patient'
  },
  encounterDate:{
    type: Date
  },
  facility:{
    type: String
  },
  encounterType:{
    type: String
  },
  patientType:{
    type: String
  },
  serviceType:{
    type: String
  },
  Sensitivity:{
    type: String
  },
  servicesBudle:{
    type: String
  },
  status:{
    type: String
  },
  healthProf:{
    type: String
  },

  fullName:{
    type: String
  },


  chiefComplain:{
    type: String
  },
  referend:{
    type: String
  },
  creator: {
    type: ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
})


  // appointmentSchema.pre('findOneAndUpdate', async function() {
  //   await Patients.findOneAndUpdate({_id: this.patient._id},{$pull: {'appointments': this.appointmentId}})
  // });

export default mongoose.model('Appointment', appointmentSchema)