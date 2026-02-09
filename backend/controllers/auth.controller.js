const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' })
    }

    // 1️⃣ Cek Admin / User
    let user = await prisma.user?.findUnique?.({ where: { email } })
    let role = null

    // 2️⃣ Kalau bukan admin → cek customer
    if (!user) {
      user = await prisma.customer.findUnique({ where: { email } })
      if (!user) {
        return res.status(404).json({ message: 'Email tidak ditemukan' })
      }
      role = 'CUSTOMER'
    } else {
      role = user.role
    }

    // 3️⃣ Validasi password
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Password salah' })
    }

    // 4️⃣ Generate token
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

// ================= REGISTER CUSTOMER =================
exports.register = async (req, res) => {
  try {
    const { nama, email, password, noTelp, alamat } = req.body

    if (!nama || !email || !password || !noTelp) {
      return res.status(400).json({ message: 'Data tidak lengkap' })
    }

    // ❗ Cek email duplikat
    const exists = await prisma.customer.findUnique({ where: { email } })
    if (exists) {
      return res.status(400).json({ message: 'Email sudah terdaftar' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const customer = await prisma.customer.create({
      data: {
        nama,
        email,
        password: hashed,
        noTelp,
        alamat
      }
    })

    res.status(201).json({
      message: 'Register berhasil',
      customer: {
        id: customer.id,
        nama: customer.nama,
        email: customer.email
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Register gagal' })
  }
}
