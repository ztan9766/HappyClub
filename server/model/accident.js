import mongoose from 'mongoose'

const Schema = mongoose.Schema
const accidentModel = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  credit: { type: Number, default: 1 },
  created_by: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  created_at: { type: Date, default: Date.now },
  event: { type: Schema.Types.ObjectId, ref: 'event', required: true },
  description: { type: String }
})

export default mongoose.model('accident', accidentModel)
