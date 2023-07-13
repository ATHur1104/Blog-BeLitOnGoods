const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE blog post
router.post('/', withAuth, async (req, res) => {
  console.log("server send data");
  const body = req.body
  try {
    const dbBlogData = await Blog.create({
      ...body,
      user_id: req.session.user_id,
    });
    res.json(dbBlogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE blog post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!dbBlogData) {
      res.status(404).json({ message: 'No Blog Post found with this ID' });
      return;
    };

    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// UPDATE blog post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.update({
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id
      }
    }
    );

    if (!dbBlogData) {
      res.status(404).json({ message: 'No Blog Post found with this ID' });
      return;
    };

    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
