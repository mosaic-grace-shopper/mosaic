const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})





// GET	'/posts'	index action	index page to display all posts
// GET	'/posts/:id'	show action	displays one blog post based on ID in the url
// PATCH (Sinatra POST)	'/posts/:id/edit'	edit action	edits one blog post based on ID in the url
// DELETE (Sinatra POST)	'/posts/:id/delete'	delete action	deletes one blog post based on ID in the url
// POST	'/posts'