const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  userName: {
    type: String,
    required: True,
  },
  password:{
    type:String,
    required:True
  },
  email:{
    type:String,
    required:True
  }
});
