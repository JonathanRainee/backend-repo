import { auth } from '../config/firebaseConfig';
export const authMiddleware = async (req, res, next) => {
    console.log("masuk1");
    const authorization = req.headers.authorization;
    console.log("masuk2");
    if (!authorization || !authorization.startsWith('Bearer')) {
        res.status(401).json({
            message: "Unauthorized: no token!"
        });
        return;
    }
    console.log("masuk3");
    const token = authorization.split(' ')[1];
    console.log("masuk4");
    try {
        console.log("masuk5");
        const decodedToken = await auth.verifyIdToken(token, true);
        req.user = decodedToken;
        console.log("masuk6");
        next();
    }
    catch (error) {
        console.log("masuk7");
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Unauthorized: Invalid token woi!", error: error.message });
        console.log("masuk8");
        // res.status(401).json({
        //     message: "Unauthorized: invalid token!"
        // });
    }
};
