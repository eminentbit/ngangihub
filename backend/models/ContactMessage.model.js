import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
  fullName:  { type: String, required: true },
  email:     { type: String, required: true },
  message:   { type: String, required: true },
  createdAt: { type: Date,   default: () => new Date() },
});

export default mongoose.model('ContactMessage', ContactMessageSchema);
