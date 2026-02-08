const { prisma } = require('../app');
const duplicateDetectionService = require('../services/duplicateDetectionService');

exports.createIssue = async (req, res) => {
  const { title, description, category, priority, visibility, mediaUrls } = req.body;
  const { hostel, block, room } = req.user; // From profile

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      category,
      priority,
      visibility,
      hostel,
      block,
      room,
      reporterId: req.user.id,
      mediaUrls: mediaUrls || [],
    },
  });

  // Check for duplicates
  const duplicates = await duplicateDetectionService.findDuplicates(issue);
  if (duplicates.length > 0) {
    // Notify admin or auto-merge logic here
  }

  res.status(201).json(issue);
};

exports.getIssues = async (req, res) => {
  const where = req.user.role === 'ADMIN' ? {} : { OR: [{ reporterId: req.user.id }, { visibility: 'PUBLIC' }] };
  const issues = await prisma.issue.findMany({ where, include: { comments: true } });
  res.json(issues);
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, assigneeId } = req.body;

  const issue = await prisma.issue.update({
    where: { id },
    data: { status, assigneeId },
  });

  await prisma.issueStatusHistory.create({
    data: { issueId: id, status, changedBy: req.user.id },
  });

  res.json(issue);
};

exports.mergeIssues = async (req, res) => {
  const { primaryId, duplicateIds } = req.body;
  await prisma.issue.updateMany({
    where: { id: { in: duplicateIds } },
    data: { mergedIntoId: primaryId },
  });
  res.json({ message: 'Issues merged' });
};