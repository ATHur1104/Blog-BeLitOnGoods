const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    req.status(200).json(dbBlogData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
