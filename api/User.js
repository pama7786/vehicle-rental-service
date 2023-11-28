import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import "dotenv/config";
import authenticate from './midleware/Authenticate.js'
import prisma from "./lib/index.js"
const SECRET_KEY = process.env.SECRET_KEY
const router = express.Router()

// user sign up
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {

    const userCheck = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userCheck) {
      return res.status(409).json({
        message: "user is alredy exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    res.json({
      status: 200,
      message: " user creation succesfully!",
      newuser
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

    const isexistinguser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!isexistinguser) {
      res.status(404).json({
        message: "user was not found",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      isexistinguser.password
    );

    if (!checkPassword) {
      res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: isexistinguser.id, email: isexistinguser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      message: "user logedin successfully",
      token: token,
    });

  } catch (error) {
    return res.json({
      status: 500,
      message: "somthing went wrong"
    })
  }

})


// Update user details
router.put('/:id',authenticate ,async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email, password } = req.body;

  try {
    const updateduser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    res.json({
      status: 200,
      message: "user updated successfully!",
      updateduser,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});


// Get a specific user by ID
router.get('/:id', authenticate, async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      res.json({
        status: 200,
        user,
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});

// Get all users
router.get('/',async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,}
        
    });

    res.json({
      status: 200,
      users,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});



// Delete user
router.delete('/:id', authenticate,async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.json({
      status: 200,
      message: "user deleted successfully!",
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "something went wrong",
    });
  }
});


export default router