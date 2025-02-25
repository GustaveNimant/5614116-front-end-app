const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{
    collection : 'user_c'			    
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('userModel', userSchema);
