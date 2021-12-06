import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const actuatorSchema = new Schema(
  {
    sw: {
      type: Object
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

actuatorSchema.plugin(timezone)
export default model("Actuator", actuatorSchema)
