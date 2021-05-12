import mongoose, { Schema } from "mongoose";
// import { Patient } from './'

const { ObjectId } = Schema.Types;

const appointmentSchema = new Schema(
  {
    appointmentId: {
      type: Number,
      required: [true, "Please add some text"],
    },
    appointmentType: {
      type: String,
      required: [true, "Please add some text"],
    },
    appointmentStatus: {
      type: String,
      required: [true, "Please add some text"],
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    patient: {
      type: ObjectId,
      ref: "Patient",
    },
    fullName: {
      type: String,
    },
    noRegistered: {
      type: String,
    },
    creator: {
      type: ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    IsAllDay: {
      type: Boolean,
    },
    StartTimezone: {
      type: Date,
    },
    EndTimezone: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// appointmentSchema.pre('findOneAndUpdate', async function() {
//   await Patients.findOneAndUpdate({_id: this.patient._id},{$pull: {'appointments': this.appointmentId}})
// });

export default mongoose.model("Appointment", appointmentSchema);
//const Appointment = mongoose.model('Appointment', appointmentSchema)
//export default Appointment

/*
const appointmentSchema = new Schema({
  Id: {
    type: Number},
  subject: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
    },
  patient: [{
    type: ObjectId,
    ref: 'Patient'
  }],
  creator: [{
    type: ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})
*/
