const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
// TODO: Import the custom middleware
const withAuth = require('../utils/auth')
// GET all blog post for homepage
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'date_created', 'user_id', 'post_id'],
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

    const blogPosts = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog post
// TODO: Replace the logic below with the custom middleware
router.get('/blogPost/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page

  // If the user is logged in, allow them to view the blog post
  try {
    const dbBlogPostData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: blog,
        },
      ],
    });
    const blogPost = dbBlogPostData.get({ plain: true });
    res.render('blogpost', { blogPost, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
);


module.exports = router;
