const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    duration: { type: Number, default: 0 },
    audioFile: { type: String, required: true}
});

module.exports = mongoose.model('Project', projectSchema);