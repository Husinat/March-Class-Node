const moongoose = require("mongoose");

const todoSchema = new moongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = moongoose.model('todo', todoSchema);
