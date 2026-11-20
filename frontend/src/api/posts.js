const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1').replace(/\/$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  })
  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try { message = (await response.json()).error || message } catch { /* response has no JSON body */ }
    throw new Error(message)
  }
  if (response.status === 204) return null
  return response.json()
}

export function getPosts(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  }
  return request(`/posts${query.size ? `?${query}` : ''}`)
}

export function createPost(post) {
  return request('/posts', { method: 'POST', body: JSON.stringify(post) })
}

export function updatePost(id, post) {
  return request(`/posts/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(post) })
}

export function deletePost(id) {
  return request(`/posts/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
