import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  role: string;
  status: string;
  createdAtDate: Date;
  terminationDate?: Date;
  password: string;
  company: mongoose.Types.ObjectId;
}

const EmployeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    createdAtDate: {
      type: Date,
      required: true,
    },
    terminationDate: {
      type: Date,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const EmployeeModel = mongoose.model<IEmployee>(
  "Employee",
  EmployeeSchema
);
