import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { deletePost, updatePost } from '../api/posts.js'

export function Post({ _id, title, author, contents, tags = [], createdAt }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState({ title, author: author || '', contents: contents || '', tags: tags.join(', ') })
  const queryClient = useQueryClient()
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  const updateMutation = useMutation({ mutationFn: () => updatePost(_id, { ...draft, tags: draft.tags.split(',').map((tag) => tag.trim()).filter(Boolean) }), onSuccess: () => { setEditing(false); refresh() } })
  const deleteMutation = useMutation({ mutationFn: () => deletePost(_id), onSuccess: refresh })

  if (editing) return (
    <article className="post-card">
      <form className="post-form" onSubmit={(e) => { e.preventDefault(); updateMutation.mutate() }}>
        <label>Title<input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required /></label>
        <label>Author<input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} /></label>
        <label>Content<textarea rows={4} value={draft.contents} onChange={(e) => setDraft({ ...draft, contents: e.target.value })} /></label>
        <label>Tags<input value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} /></label>
        <div className="actions"><button disabled={updateMutation.isPending}>Save changes</button><button type="button" className="secondary" onClick={() => setEditing(false)}>Cancel</button></div>
        {updateMutation.isError && <p className="error">{updateMutation.error.message}</p>}
      </form>
    </article>
  )

  return (
    <article className="post-card">
      <div className="post-topline"><span className="post-author">{author || 'Anonymous'}</span>{createdAt && <time dateTime={createdAt}>{new Date(createdAt).toLocaleString()}</time>}</div>
      <h3>{title}</h3>
      {contents && <p className="post-content">{contents}</p>}
      {!!tags.length && <div className="tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>}
      <div className="actions"><button type="button" className="secondary" onClick={() => setEditing(true)}>Edit</button><button type="button" className="danger" disabled={deleteMutation.isPending} onClick={() => { if (window.confirm('Delete this post? This cannot be undone.')) deleteMutation.mutate() }}>{deleteMutation.isPending ? 'Deleting...' : 'Delete'}</button></div>
      {deleteMutation.isError && <p className="error">{deleteMutation.error.message}</p>}
    </article>
  )
}

Post.propTypes = { _id: PropTypes.string, title: PropTypes.string, author: PropTypes.string, contents: PropTypes.string, tags: PropTypes.arrayOf(PropTypes.string), createdAt: PropTypes.string }
