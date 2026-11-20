import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [contents, setContents] = useState('')
  const [tags, setTags] = useState('')
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setTitle(''); setAuthor(''); setContents(''); setTags('')
    },
  })

  function handleSubmit(event) {
    event.preventDefault()
    mutation.mutate({ title: title.trim(), author: author.trim(), contents: contents.trim(), tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) })
  }

  return (
    <section className="panel create-panel">
      <h2>Create a post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} required placeholder="Give your post a title" /></label>
        <label>Author<input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={100} placeholder="Your name (optional)" /></label>
        <label>Content<textarea value={contents} onChange={(e) => setContents(e.target.value)} rows={4} placeholder="Write your post..." /></label>
        <label>Tags<input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="react, mongodb, javascript" /></label>
        <div className="form-footer"><button type="submit" disabled={!title.trim() || mutation.isPending}>{mutation.isPending ? 'Publishing...' : 'Publish post'}</button>{mutation.isSuccess && <span className="success" role="status">Post published!</span>}{mutation.isError && <span className="error" role="alert">{mutation.error.message}</span>}</div>
      </form>
    </section>
  )
}
