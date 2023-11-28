import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import "dotenv/config";
import authenticate from './midleware/Authenticate.js' 
import prisma from "./lib/index.js"
const SECRET_KEY = process.env.SECRET_KEY
const router = express.Router()

// Admin sign up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {

    const adminCheck = await prisma.admin.findUnique({
      where: {
        email
      }
    })

    if (adminCheck) {
      return res.status(409).json({
        message: "admin is alredy exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.json({
      status: 200,
      message: "add creation succesfully!",
      newAdmin
    })


  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong"
    })
  }
})


router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {

    const isexistingadmin = await prisma.admin.findUnique({
      where: {
        email
      }
    })

    if (!isexistingadmin) {
      res.status(404).json({
        message: "admin was not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isexistingadmin.password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: isexistingadmin.id, email: isexistingadmin.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      message: "admin logedin successfully",
      token: token,
    });

  } catch (error) {
    return res.json({
      status: 500,
      message: "somthing went wrong"
    })
  }

})


// Update admin details
router.put('/:id' ,authenticate, async (req, res) => {
  const adminId = parseInt(req.params.id);
  const { name, email, password } = req.body;

  try {
    const updatedAdmin = await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    res.json({
      status: 200,
      message: "admin updated successfully!",
      updatedAdmin,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});


// Get a specific admin by ID
router.get('/:id',authenticate, async (req, res) => {
  const adminId = parseInt(req.params.id);

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    if (!admin) {
      res.status(404).json({
        message: "admin not found",
      });
    } else {
      res.json({
        status: 200,
        admin,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});

// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,}

    });

    res.json({
      status: 200,
      admins,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});



// Delete admin
router.delete('/:id', authenticate, async (req, res) => {
  const adminId = parseInt(req.params.id);

  try {
    await prisma.admin.delete({
      where: {
        id: adminId,
      },
    });

    res.json({
      status: 200,
      message: "admin deleted successfully!",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});


export default router