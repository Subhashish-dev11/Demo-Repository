import mongoose from 'mongoose'
import { Post } from '../db/models/post.js'

const SORT_FIELDS = new Set(['createdAt', 'updatedAt', 'title', 'author'])

function sortOptions(options = {}) {
  const sortBy = SORT_FIELDS.has(options.sortBy) ? options.sortBy : 'createdAt'
  const sortOrder = options.sortOrder === 'ascending' || options.sortOrder === 'asc' ? 1 : -1
  return { [sortBy]: sortOrder }
}

export async function createPost(data) {
  return Post.create({
    title: data.title,
    author: data.author,
    contents: data.contents,
    tags: Array.isArray(data.tags) ? data.tags : [],
  })
}

export async function listAllPosts(options) {
  return Post.find({}).sort(sortOptions(options)).lean()
}

export async function listPostsByAuthor(author, options) {
  return Post.find({ author: new RegExp(`^${escapeRegex(author)}$`, 'i') }).sort(sortOptions(options)).lean()
}

export async function listPostsByTag(tag, options) {
  return Post.find({ tags: new RegExp(`^${escapeRegex(tag)}$`, 'i') }).sort(sortOptions(options)).lean()
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function getPostById(postId) {
  if (!mongoose.isValidObjectId(postId)) return null
  return Post.findById(postId)
}

export async function updatePost(postId, data) {
  if (!mongoose.isValidObjectId(postId)) return null
  const updates = {}
  for (const field of ['title', 'author', 'contents', 'tags']) {
    if (Object.hasOwn(data, field)) updates[field] = data[field]
  }
  return Post.findByIdAndUpdate(postId, { $set: updates }, { new: true, runValidators: true })
}

export async function deletePost(postId) {
  if (!mongoose.isValidObjectId(postId)) return { deletedCount: 0 }
  return Post.deleteOne({ _id: postId })
}
