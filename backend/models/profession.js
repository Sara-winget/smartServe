import mongoose from 'mongoose';

const professionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'professionCategory',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('profession', professionSchema);
