import express from 'express';
import prisma from './lib/index.js';

const router = express.Router();

// Create a new vehicle
router.post('/', async (req, res) => {
    const { name, image, type, rent, model, schudule, availability, adminId } = req.body;
    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
                image,
                type,
                rent,
                model,
                schudule,
                availability,
                adminId,
            },
        });

        res.json({
            status: 200,
            message: 'Vehicle created successfully!',
            newVehicle,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            include: {
                Admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        res.json({
            status: 200,
            vehicles,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Get a specific vehicle by ID
router.get('/:id', async (req, res) => {
    const vehicleId = parseInt(req.params.id);

    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: {
                id: vehicleId,
            },
            include: {
                Admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!vehicle) {
            res.status(404).json({
                message: 'Vehicle not found',
            });
        } else {
            res.json({
                status: 200,
                vehicle,
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

// Update a vehicle by ID
router.put('/:id', async (req, res) => {
    const vehicleId = parseInt(req.params.id);
    const {image, type, rent, model, schudule, availability, adminId } = req.body;

    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: {
                id: vehicleId,
            },
            data: {
                name,
                image,
                type,
                rent,
                model,
                schudule,
                availability,
                adminId,
            },
            
        });

        res.json({
            status: 200,
            message: 'Vehicle updated successfully!',
            updatedVehicle,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
        });
    }
});

// Delete a vehicle by ID
router.delete('/:id', async (req, res) => {
    const vehicleId = parseInt(req.params.id);

    try {
        await prisma.vehicle.delete({
            where: {
                id: vehicleId,
            },
        });

        res.json({
            status: 200,
            message: 'Vehicle deleted successfully!',
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
