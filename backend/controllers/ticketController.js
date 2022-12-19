const asyncHandler = require('express-async-handler')
const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')


// @desc    Get User Tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets)
})


// @desc    Create New Ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, title,  description } = req.body

    if (!product || !title || !description) {
        res.status(400)
        throw new Error('Information missing in request')
    }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        title,
        description,
        status: 'new'
    })
    res.status(201).json(ticket)
})

// @desc    Get user Ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }
    res.status(200).json(ticket)
})

// @desc    DELETE user Ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }
    await ticket.remove()
    res.status(200).json({success: true})
})


// @desc    Update Ticket
// @route   PUT /api/tickets
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
    const { description } = req.body
    // if (!description) {
    //     res.status(400)
    //     throw new Error('Information missing in request')
    // }

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        res.status(404)
        throw new Error("Ticket not found")
    }
    
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(201).json(updatedTicket)
})

module.exports = {getTickets, createTicket, getTicket, deleteTicket, updateTicket}