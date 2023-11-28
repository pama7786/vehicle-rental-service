import express from 'express';
import prisma from './lib/index.js';
import authenticate from './midleware/Authenticate.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
    const { startDate, returnDate, userId, vehicleId } = req.body;
    try {
        const newBooking = await prisma.booking.create({
            data: {
                startDate,
                returnDate,
                userId,
                vehicleId,
            },
        });

        res.json({
            status: 200,
            message: 'Booking created successfully!',
            newBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                Vehicle: {
                    select: {
                        id: true,
                        model: true,
                        type: true,
                    },
                },
            },
        });

        res.json({
            status: 200,
            bookings,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Get a specific booking by ID
router.get('/:id', async (req, res) => {
    const bookingId = parseInt(req.params.id);

    try {
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId,
            },
            include: {
                User: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                Vehicle: {
                    select: {
                        id: true,
                        model: true,
                        type: true,
                    },
                },
            },
        });

        if (!booking) {
            res.status(404).json({
                message: 'Booking not found',
            });
        } else {
            res.json({
                status: 200,
                booking,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Update a booking by ID
router.put('/:id', authenticate, async (req, res) => {
    const bookingId = parseInt(req.params.id);
    const { startDate, returnDate, userId, vehicleId } = req.body;

    try {
        const updatedBooking = await prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                startDate,
                returnDate,
                userId,
                vehicleId,
            },
        
        });

        res.json({
            status: 200,
            message: 'Booking updated successfully!',
            updatedBooking,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Delete a booking by ID
router.delete('/:id', async (req, res) => {
    const bookingId = parseInt(req.params.id);

    try {
        await prisma.booking.delete({
            where: {
                id: bookingId,
            },
        });

        res.json({
            status: 200,
            message: 'Booking deleted successfully!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

export default router;
