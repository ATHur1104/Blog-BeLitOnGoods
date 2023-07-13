const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth')
// GET all blog post for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [User]
    });

    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );
    
    const userId = req.session.user_id

    console.log("Session User ID:", userId);

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
      userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// blog by id
router.get('/blog/:id', async (req, res) => {
  try{
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (blogData) {
      const blog = blogData.get({plain: true});
      res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).json({ message: 'Blog not found'})
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/newblog', (req, res) => {
  res.render('newblog', {
    loggedIn: req.session.loggedIn,
  })
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  })
})

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  } else {

    res.render('login');
  }
});

module.exports = router;
