const express = require('express')
const { route } = require('./userRoutes')
const router = express.Router()

const noteRouter = require('./notesRoutes')

const {protect} = require('../middleware/authMiddleware')
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

router.use('/:ticketId/notes', noteRouter)
router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router