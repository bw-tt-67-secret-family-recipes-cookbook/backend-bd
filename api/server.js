const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const userRouter = require('./users/users-router')

const server = express()
server.use(helmet())
server.use(cors())

server.use(express.json())
server.use('/api/users', userRouter)

module.exports = server