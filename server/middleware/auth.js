const {verify} = require('jsonwebtoken')


const validateToken = (req,res,next) => {
    const accessToken = req.header("accessToken")
    console.log("test", accessToken)

    if(!accessToken) return res.json({error:"You'r not logged in ! "})
    try{
        const checkToken = verify(accessToken, process.env.JWT_SECRET)
        // allow us to read the data from the token
        /*    const username = checkToken.email */
        // we can create a variable to store the data
    
        if(checkToken){
            // if true it'll go to next request 
            return next();
        }else{
            return res.json({"error": err})
        }
    }catch(err){
        console.log(err)
    }
    
}

module.exports = {validateToken}