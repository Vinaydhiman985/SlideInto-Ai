const mongoose = require('mongoose');

const DMVariantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  metrics: {
    hook: { type: String },
    length: { type: String },
    cta: { type: String }
  }
});

const DMSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  profileUrl: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  outreachGoal: {
    type: String,
    required: true
  },
  contextBio: {
    type: String,
    default: ''
  },
  generatedDMs: [DMVariantSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DM', DMSchema);
