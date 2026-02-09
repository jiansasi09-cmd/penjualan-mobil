exports.onlyCustomer = (req, res, next) => {
  if (req.user.role !== 'CUSTOMER') {
    return res.status(403).json({ message: 'Akses khusus customer' })
  }
  next()
}

exports.onlyAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Akses khusus admin' })
  }
  next()
}
