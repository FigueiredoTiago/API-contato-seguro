import mongoose, { Schema, Document } from "mongoose";
import { EmployeeStatus, employeeStatus } from "../schemas/employee.schema";

export interface IEmployee extends Document {
  name: string;
  email: string;
  role: string;
  status: EmployeeStatus;
  createdAtDate: Date;
  terminationDate?: Date;
  password: string;
  companyId: mongoose.Types.ObjectId;
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
      enum: employeeStatus.options,
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
      select: false,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

EmployeeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const EmployeeModel = mongoose.model<IEmployee>(
  "Employee",
  EmployeeSchema
);
