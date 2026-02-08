const { prisma } = require('../app');

exports.createAnnouncement = async (req, res) => {
  const { title, content, targetHostel, targetBlock, targetRole } = req.body;
  const announcement = await prisma.announcement.create({
    data: { title, content, targetHostel, targetBlock, targetRole, creatorId: req.user.id },
  });
  res.status(201).json(announcement);
};

exports.getAnnouncements = async (req, res) => {
  const { hostel, block, role } = req.user;
  const where = {
    OR: [
      { targetHostel: null },
      { targetHostel: hostel },
      { targetBlock: null },
      { targetBlock: block },
      { targetRole: null },
      { targetRole: role },
    ],
  };
  const announcements = await prisma.announcement.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { creator: { select: { name: true } } }, // Optional: Include creator name
  });
  res.json(announcements);
};