import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// This is a mock user database. In a real application, you'd use a proper database.
const users = [
  {
    id: 1,
    username: 'janedoe',
    passwordHash: bcrypt.hashSync('password123', 10),
    name: 'Jane Doe',
  },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  const user = users.find(u => u.username === username)

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '1h' }
  )

  res.status(200).json({ token, user: { id: user.id, name: user.name, username: user.username } })
}