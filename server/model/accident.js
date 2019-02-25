import mongoose from 'mongoose'

const Schema = mongoose.Schema
const accidentModel = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  event: { type: Schema.Types.ObjectId, ref: 'event' },
  description: { type: String }
})

export default mongoose.model('accident', accidentModel)
