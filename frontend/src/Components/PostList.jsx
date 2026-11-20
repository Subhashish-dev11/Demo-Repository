import PropTypes from 'prop-types'
import { Post } from './Post.jsx'

export function PostList({ posts = [] }) {
  if (!posts.length) return <p className="empty-state">No posts found. Create your first post or change the filters.</p>
  return <div className="post-list">{posts.map((post) => <Post key={post._id} {...post} />)}</div>
}

PostList.propTypes = { posts: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, title: PropTypes.string, author: PropTypes.string, contents: PropTypes.string, tags: PropTypes.arrayOf(PropTypes.string), createdAt: PropTypes.string })).isRequired }
