const { prisma } = require('../app');

exports.addComment = async (req, res) => {
  const { content, issueId, parentId } = req.body;
  const comment = await prisma.comment.create({
    data: { content, issueId, authorId: req.user.id, parentId },
  });
  res.status(201).json(comment);
};

exports.deleteComment = async (req, res) => {
  await prisma.comment.delete({ where: { id: req.params.id } });
  res.json({ message: 'Comment deleted' });
};