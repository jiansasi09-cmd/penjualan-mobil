const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    let user = await prisma.user.findUnique({ where: { email } })
    let role = null

    if (user) {
      role = user.role
    } else {
      user = await prisma.customer.findUnique({ where: { email } })
      if (!user) {
        return res.status(404).json({ message: 'Email tidak ditemukan' })
      }
      role = 'CUSTOMER'
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Password salah' })
    }

    const token = jwt.sign(
      { id: user.id, role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.register = async (req, res) => {
  try {
    const { nama, email, password, noTelp } = req.body
    const hashed = await bcrypt.hash(password, 10)

    const customer = await prisma.customer.create({
      data: { nama, email, password: hashed, noTelp }
    })

    res.status(201).json(customer)
  } catch (err) {
    res.status(500).json({ message: 'Register gagal' })
  }
}
