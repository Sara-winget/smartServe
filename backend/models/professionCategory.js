import mongoose from 'mongoose';

const professionCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model('ProfessionCategory', professionCategorySchema);
