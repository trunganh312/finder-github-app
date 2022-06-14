import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: `token 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` },
})

// Get search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// Get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ])

  return { user: user.data, repos: repos.data }
}
