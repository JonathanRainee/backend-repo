import express, { NextFunction, Request, Response, Router } from "express";
import { updateUser, fetchUser , signInUser, signUpUser} from "../repository/userCollection.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { User, UserData } from "../entities/user.js"

const router : Router = express.Router()

router.get('/fetch-user-data/:id', authMiddleware, async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.id;
  
  try {
      const user = await fetchUser(userId);
      
      if(user){
        res.status(200).json(user);
      }else{
        res.status(404).json({
          message: "User not found!"
        });
      }
  } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred." });
      }
  }
})

router.put('/update-user-data/:id', authMiddleware, async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.id;
  const userData: Partial<User> = req.body;

  try {
    const updatedUser = await updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred." });
      }
  }
})


router.post('/sign-up', async (req: Request<{}, {}, UserData>, res: Response): Promise<void> => {
  const userData = req.body;

  if (!userData.email || !userData.password || !userData.age || !userData.name) {
    res.status(400).json({
      message: "Invalid input: All fields are required.",
    });
  }

  try {
    await signUpUser(userData.email, userData.password, userData.age, userData.name);
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred while signing up user." });
    }
  }
});

router.post('/sign-in', async (req: Request<{}, {}, UserData>, res: Response): Promise<void> => {
  const userData = req.body;

  if (!userData.email || !userData.password) {
    res.status(400).json({
      message: "Invalid input: All fields are required.",
    });
  }

  try {
    const response = await signInUser(userData.email, userData.password);
    res.status(201).json({ response: response });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred while signing in user." });
    }
  }
});

router.get('/', (req,res)=>{
  res.status(200);
  res.send("Welcome to root URL of Server");
})


export default router;