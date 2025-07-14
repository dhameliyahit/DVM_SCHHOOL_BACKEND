const mongoose = require("mongoose")

const RegisterSchema = mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    studentName: { type: String, required: true },
    parentName: { type: String, required: true },
    comment: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }

})

const Register = mongoose.model("register", RegisterSchema)

module.exports = Register