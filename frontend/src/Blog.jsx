import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'
import { PostList } from './Components/PostList.jsx'
import { CreatePost } from './Components/CreatePost.jsx'
import { PostFilter } from './Components/PostFilter.jsx'
import { PostSorting } from './Components/PostSorting.jsx'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [tag, setTag] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')
  const postsQuery = useQuery({
    queryKey: ['posts', { author, tag, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, tag, sortBy, sortOrder }),
  })

  return (
    <main className="blog-container">
      <header className="page-header">
        <p className="eyebrow">YOUR SPACE TO WRITE</p>
        <h1>My Blog</h1>
        <p className="subtitle">Create, manage and explore your posts.</p>
      </header>
      <CreatePost />
      <section className="toolbar" aria-label="Post filters and sorting">
        <PostFilter field="Author" value={author} onChange={setAuthor} />
        <PostFilter field="Tag" value={tag} onChange={setTag} />
        <PostSorting fields={['createdAt', 'updatedAt', 'title', 'author']} value={sortBy} onChange={setSortBy} orderValue={sortOrder} onOrderChange={setSortOrder} />
      </section>
      <section className="posts-section">
        <div className="section-heading"><h2>Recent posts</h2>{!postsQuery.isLoading && <span>{postsQuery.data?.length ?? 0} posts</span>}</div>
        {postsQuery.isLoading && <p className="status">Loading posts...</p>}
        {postsQuery.isError && <p className="error" role="alert">Could not load posts: {postsQuery.error.message}</p>}
        {postsQuery.isSuccess && <PostList posts={postsQuery.data ?? []} />}
      </section>
    </main>
  )
}
