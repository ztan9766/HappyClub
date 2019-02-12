import mongoose from 'mongoose'

const Schema = mongoose.Schema
const eventModel = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String }
})

export default mongoose.model('event', eventModel)
