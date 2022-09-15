module.exports = ( req, res, next ) => {
    //console.log('validateCreatePostMiddleware has been called.')
    //logger.error('validateCreatePostMidddleware has been called')
    if(!req.files || !req.body.username || !req.body.title || !req.body.content ) {
        return res.redirect('/pagenotfound')
    }
    next()
}