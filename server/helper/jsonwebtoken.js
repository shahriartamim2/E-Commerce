import jwt from 'jsonwebtoken';

const generateToken = (payload, privateKey, expiresIn) => {
    if(typeof payload !== "object" || !payload){
        throw new Error("Payload must be a plain non-empty object");
    }
    if(typeof privatekey !== 'string' || privateKey ===''){
        throw new Error
    }
    try {
        
          const token = jwt.sign(payload, privateKey, { expiresIn });
    } catch (error) {
        console.error("Error generating token", error);
        throw error;
    }
  
    return token;
};

export  {generateToken};
