import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    role: {
    type: String,
    enum: ['user', 'provider'],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  // Provider-specific fields (conditionally required on frontend/backend)
  gender: {
    type: String,
    enum: ['male', 'female', 'others']
  },
  profession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profession'
  },
  about: {
    type: String
  },

  // Firebase URLs
  profilePicUrl: {
    type: String
  },
  identityProofUrl: {
    type: String
  },
  resumeUrl: {
    type: String
  },

  isVerified: {
    type: Boolean,
    default: false
  },
    refreshToken: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('user', userSchema);