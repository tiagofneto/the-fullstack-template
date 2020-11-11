const { Pool } = require('pg')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'db-sql',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
})

let posts = [{
  pid: '0',
  title: 'Consequatur Accusamus Explicabo',
  content: 'Ratione molestiae similique molestiae magnam.\
  Corrupti rerum nihil.\
  Quasi officiis molestiae reiciendis eaque ipsum aliquid fuga.'
},
{
  pid: '1',
  title: 'Minima Libero Fugit',
  content: 'Voluptas sit enim minima doloremque excepturi vitae.\
    Omnis et occaecati ut illo nulla.\
  Saepe eos autem.'
}]


function postFromList(pid) {
  return posts.find(obj => obj.pid === pid)
}

async function queryUser(email) {
  const text = 'SELECT * FROM users WHERE email=$1'
  const values = [email]

  const res = await pool.query(text, values)

  return res.rows[0]
}

async function queryUserUid(uid) {
  const text = 'SELECT * FROM users WHERE uid=$1'
  const values = [uid]

  const res = await pool.query(text, values)
  return res.rows[0]
}

let pidCount = posts.length

const resolvers = {
  Query: {
    feed: () => posts,
    getPost: (_, { pid }) => postFromList(pid),

    getUser: (_, { uid }) => userFromList(uid),

    login: async (_, { email, password }) => {
      const user = await queryUser(email)

      if (!user) {
        throw new Error('User does not exist')
      }

      const isEqual = await bcrypt.compare(password, user.password)
      if (!isEqual) {
        //TODO change to same message, no hints
        throw new Error('Passsowrd is incorrect')
      }

      const expire = '15m'

      const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, {
        expiresIn: expire
      });

      return { uid: user.uid, token: token, expiration: expire }
    },

    currentUser: async (_a, _b, { uid }) => {
      if (!uid) {
        throw new Error('Not authenticated')
      }
      const user = await queryUserUid(uid)
      return user
    }
  },
  Mutation: {
    post: (_, { title, content }) => {
      const currPost = {
        pid: `${pidCount++}`,
        title: title,
        content: content,
      }
      posts.push(currPost)
      return currPost
    },
    updatePost: (_, { pid, title, content }) => {
      const currPost = postFromList(pid)
      if (title) currPost.title = title
      if (content) currPost.content = content
      return currPost
    },
    deletePost: (_, { pid }) => {
      const post = postFromList(pid)
      const index = posts.indexOf(post)
      if (index > -1)
        posts.splice(index, 1)
      return post
    },

    createUser: async (_, { email, password }) => {
      const text = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *'
      const hashedPassword = await bcrypt.hash(password, 10)
      const values = [email, hashedPassword]

      const res = await pool.query(text, values)
      return res.rows[0]
    },
    updateUser: (_, { uid, email, password }) => {
      const currUser = userFromList(uid)
      if (email) currUser.email = email
      if (password) currUser.password = password
      return currUser
    },
    deleteUser: (_, { uid }) => {
      const user = userFromList(uid)
      const index = users.indexOf(user)
      if (index > -1)
        users.splice(index, 1)
      return user
    },
  },
};

module.exports = { resolvers }