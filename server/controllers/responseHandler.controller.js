const errorHandler  =(res, { statusCode = 500, message= "Internal server error"}) =>{
    return res.status(statusCode).json({
        success : false,
        message : message
    })
}






export {errorHandler};