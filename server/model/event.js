import mongoose from 'mongoose'

const Schema = mongoose.Schema
const eventModel = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  created_by: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  created_at: { type: Date, default: Date.now },
  status: { type: String, default: 'active' },
  description: { type: String }
})

export default mongoose.model('event', eventModel)
