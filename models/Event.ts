// models/Event.ts
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  participants: [
    {
      // Podrías almacenar IDs de usuarios, o solo emails, etc.
      userId: { type: String },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  createdBy: { type: String }, // Por ejemplo, email del usuario que crea el evento
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
