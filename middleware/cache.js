const cache = (req,res,next)=>{
    const period = 3600*24*30 // 30 days
    res.set('Cache-control','public',`max-age=${period}`)
    next()
}

module.exports = cache