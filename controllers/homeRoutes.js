const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth')
// GET all blog post for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'date_created', 'user_id', 'blog_id'],
          include: {
            model: User,
            attributes: ['name'],
          }
        },
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// remember to make this async with withAuth
router.get('/dashboard', (req, res) => {
  // I will need to pass the user's blog posts and comments and user to the views
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  });
});

// remember to make this async with withAuth
router.get('/blog/:id', (req, res) => {
  // need to pass blog id and the comments that go along with it.
  res.render('blog', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  } else {

    res.render('login');
  }
});

module.exports = router;
