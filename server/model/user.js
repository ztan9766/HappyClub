import mongoose from 'mongoose'

const Schema = mongoose.Schema
const userModel = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'normal' }
})

export default mongoose.model('user', userModel)
