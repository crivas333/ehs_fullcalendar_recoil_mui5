import mongoose, { Schema } from 'mongoose'


const { ObjectId } = Schema.Types


const examSchema = new Schema({
  examId: {
    type: Number
  },
  examType: {
    type: String
  },
  examStatus: {
    type: String
  }, 
  examDateTime:{
    type: Date
  },
  patient: {
    type: ObjectId,
    ref: 'Patient'
  },
  historyId:{
    type: Number
  },
  fullName:{
    type: String
  },
  facility:{
    type: String
  },
  servicesBudle:{
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

export default mongoose.model('Exam', examSchema)