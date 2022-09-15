const Post = require('../database/models/Post')
module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id)
    //console.log(req.params)
    //logger.log('info', req.params)
    //logger.info('this fires after the `/post` page', {color: 'green' });
    res.render('post', {
        post
    })
}