const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE comment
router.post('/', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    req.status(200).json(dbCommentData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE comment post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!dbCommentData) {
      res.status(404).json({ message: 'No Comment Post found with this ID' });
      return;
    };

    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// UPDATE comment post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.update({
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id
      }
    }
    );

    if (!dbCommentData) {
      res.status(404).json({ message: 'No Comment Post found with this ID' });
      return;
    };

    res.status(200).json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
