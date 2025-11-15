const mongoose = require("mongoose");
const { Schema } = mongoose;

const consentFormSchema = new Schema(
  {
    parentBooking: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
      required: false,
    },
    // Kids Details
    kidFullName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    // Parent Guardian Details (simplified to 1 parent)
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentEmail: { type: String, required: true },
    // Emergency Contact
    emergencyName: { type: String, required: true },
    emergencyRelation: { type: String, required: true },
    emergencyPhone1: { type: String, required: true },
    emergencyPhone2: { type: String, required: true },
    // Pick Up & Drop (simplified to 1 person)
    pickupName: { type: String, required: true },
    pickupNumber: { type: String, required: true },
    // Medical Questionnaire (default to "No")
    medQ1: { type: String, required: true, default: "No" },
    medQ2: { type: String, required: true, default: "No" },
    medQ3: { type: String, required: true, default: "No" },
    medQ4: { type: String, required: true, default: "No" },
    medQ5: { type: String, required: true, default: "No" },
    medQ6: { type: String, required: true, default: "No" },
    medQ7: { type: String, required: true, default: "No" },
    medQ8: { type: String, required: true, default: "No" },
    // Medical Details (conditional fields)
    hasHealthInfo: { type: String, required: true, default: "No" },
    healthInfo: { type: String, required: false },
    hasMedications: { type: String, required: true, default: "No" },
    medications: { type: String, required: false },
    hasHealthConcerns: { type: String, required: true, default: "No" },
    healthConcerns: { type: String, required: false },
    // Declaration
    guardianName: { type: String, required: true },
    guardianSignature: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ConsentForm_wintercamp", consentFormSchema);
