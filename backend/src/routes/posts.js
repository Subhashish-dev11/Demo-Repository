import {
  createPost, deletePost, getPostById, listAllPosts,
  listPostsByAuthor, listPostsByTag, updatePost,
} from '../services/posts.js'

export function postsRoutes(app) {
  app.get('/api/v1/posts', async (req, res, next) => {
    try {
      const { sortBy, sortOrder, author, tag } = req.query
      if (author && tag) return res.status(400).json({ error: 'Filter by either author or tag, not both' })
      const options = { sortBy, sortOrder }
      const posts = author ? await listPostsByAuthor(author, options)
        : tag ? await listPostsByTag(tag, options)
          : await listAllPosts(options)
      res.json(posts)
    } catch (error) { next(error) }
  })

  app.get('/api/v1/posts/:id', async (req, res, next) => {
    try {
      const post = await getPostById(req.params.id)
      if (!post) return res.status(404).json({ error: 'Post not found' })
      res.json(post)
    } catch (error) { next(error) }
  })

  app.post('/api/v1/posts', async (req, res, next) => {
    try {
      const post = await createPost(req.body || {})
      res.status(201).json(post)
    } catch (error) {
      if (error.name === 'ValidationError') return res.status(400).json({ error: error.message })
      next(error)
    }
  })

  app.patch('/api/v1/posts/:id', async (req, res, next) => {
    try {
      const post = await updatePost(req.params.id, req.body || {})
      if (!post) return res.status(404).json({ error: 'Post not found' })
      res.json(post)
    } catch (error) {
      if (error.name === 'ValidationError') return res.status(400).json({ error: error.message })
      next(error)
    }
  })

  app.delete('/api/v1/posts/:id', async (req, res, next) => {
    try {
      const result = await deletePost(req.params.id)
      if (!result.deletedCount) return res.status(404).json({ error: 'Post not found' })
      res.status(204).end()
    } catch (error) { next(error) }
  })
}
