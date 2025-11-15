const mongoose = require("mongoose");
const childSchema = require("./child.model.js");

const parentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    parentEmail: { type: String, required: true },
    parentPhone: { type: String, required: true },
    parentAddress: { type: String, required: true },
    numberOfChildren: { type: Number, required: true },
    children: [childSchema],
    startDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    membershipPlan: { type: String, required: true }, // e.g., "3-Days Access", "5-Days Access"
    location: { type: String, required: true }, // e.g., 'abuDhabi'
    totalAmountPaid: { type: Number, required: true }, // Final amount after discounts
    planType: { type: String, required: true }, // 'Kids Camp' or 'Football Clinic'
    discountCode: { type: String },
    discountPercent: { type: Number },
    discountType: {
      type: String,
      enum: ["normal", "adq employees", "adnec employees", "adnec staff", ""],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent_wintercamp", parentSchema);
