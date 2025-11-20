import mongoose, { Schema, Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  sector: string;
  cnpj: string;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sector: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = mongoose.model<ICompany>(
  "Company",
  CompanySchema
);
