const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get blog posts by session user
router.get('/', async (req, res) => {
  try {
    const userID = req.session.user_id

    const blogData = await Blog.findAll({
      where: {
        user_id: userID
      },
      include: [User]
    })

    const blogs = blogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('dashboard', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
