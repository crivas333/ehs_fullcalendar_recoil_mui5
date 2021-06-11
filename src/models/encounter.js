import mongoose, { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

const encounterSchema = new Schema(
  {
    encounterId: {
      type: Number,
      required: [true, "Please add some text"],
    },
    patientId: {
      type: ObjectId,
      ref: "Patient",
    },
    encounterDate: {
      type: Date,
    },
    facility: {
      type: String,
    },
    encounterType: {
      type: String,
    },
    patientType: {
      type: String,
    },
    serviceType: {
      type: String,
    },
    Sensitivity: {
      type: String,
    },
    servicesBudle: {
      type: String,
    },
    encounterStatus: {
      type: String,
    },
    healthProf: {
      type: String,
    },

    chiefComplain: {
      type: String,
    },
    referend: {
      type: String,
    },
    creator: {
      type: ObjectId,
      ref: "User",
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
