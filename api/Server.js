import express from 'express';
import addminRoute from './Admin.js'
import UserRoute from './User.js'
import vehicles from './Vehicle.js'
import booking from './Booking.js'
const server = express()
server.use(express.json())


server.use("/api/admin", addminRoute)
server.use("/api/user", UserRoute)
server.use("/api/vehicles", vehicles)
server.use("/api/booking", booking)

export default server;