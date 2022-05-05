import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const listDeviceSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

listDeviceSchema.plugin(timezone)
export default model("ListDevice", listDeviceSchema);
