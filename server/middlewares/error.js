export const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        success: false,
        message: err.message ? err.message : 'Internal Server Error',
        // stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}   



export const TryCatch = (passedFunction)=> async(req,res,next)=>{
    try{
        await passedFunction(req,res,next)
    }catch(err){
        next(err)
    }
}