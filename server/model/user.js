import mongoose from 'mongoose'

const Schema = mongoose.Schema
const userModel = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
})

export default mongoose.model('user', userModel)
