const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  studentId: { type: String, required: true },
  email: String,
  faculty: String,
  studyProgram: String,
  year: Number,
  phone: String,
  interests: [String],
  photoUrl: String,
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', regSchema);

