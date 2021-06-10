import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get('/api/users/currentuser', (req,res) => {

    //is the jwt empty?
    if (!req.session?.jwt){
        return res.send({currentUser: null});
    }

    // is the jwt valid?
    try {
    const payload = jwt.verify(req.session.jwt,process.env.JWT_KEY!);
    //If valid, send the payload jwt token back
    res.send({currentUser: payload});
    } catch (err) {
        res.send({currentUser: null});
    }


})

export {router as currentUserRouter}