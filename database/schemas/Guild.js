const mongoose = require("mongoose");

const guildConfigSchema = mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model(`guildDatabase`, guildConfigSchema);
