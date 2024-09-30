const errorHandler = (err,req,res, next) =>{
if (err.status){
    res.status(err.status).json({msg:err.msg})
}else{
    res.status(500).json({msg:err.msg})
}
}

export default errorHandler;