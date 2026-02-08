const { prisma } = require('../app');

exports.createLostAndFound = async (req, res) => {
  const { itemName, description, location, date, mediaUrls } = req.body;
  const lostAndFound = await prisma.lostAndFound.create({
    data: {
      itemName,
      description,
      location,
      date: new Date(date),
      mediaUrls: mediaUrls || [],
      reporterId: req.user.id,
    },
  });
  res.status(201).json(lostAndFound);
};

exports.getLostAndFounds = async (req, res) => {
  const where = req.user.role === 'ADMIN' ? {} : { OR: [{ reporterId: req.user.id }, { claimantId: req.user.id }] };
  const lostAndFounds = await prisma.lostAndFound.findMany({
    where,
    include: { reporter: { select: { name: true } }, claimant: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(lostAndFounds);
};

exports.claimItem = async (req, res) => {
  const { id } = req.params;
  const item = await prisma.lostAndFound.findUnique({ where: { id } });
  if (!item || item.status !== 'OPEN') return res.status(400).json({ error: 'Item not available for claim' });

  await prisma.lostAndFound.update({
    where: { id },
    data: { status: 'CLAIMED', claimantId: req.user.id },
  });
  res.json({ message: 'Claim submitted, awaiting admin approval' });
};

exports.approveClaim = async (req, res) => {
  const { id } = req.params;
  const item = await prisma.lostAndFound.findUnique({ where: { id } });
  if (!item || item.status !== 'CLAIMED') return res.status(400).json({ error: 'Invalid claim' });

  await prisma.lostAndFound.update({
    where: { id },
    data: { status: 'CLOSED' }, // Or a new status like 'APPROVED'
  });
  res.json({ message: 'Claim approved' });
};