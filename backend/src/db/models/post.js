import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
  author: { type: String, trim: true, default: 'Anonymous', maxlength: 100 },
  contents: { type: String, trim: true, default: '' },
  tags: { type: [String], default: [] },
}, { timestamps: true })

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)
