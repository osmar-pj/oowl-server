import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const deviceSchema = new Schema(
  {
    mac: String,
    door: Boolean,
    presence: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
);

roleSchema.plugin(timezone)
export default model("Role", roleSchema);
