const { prisma } = require('../app');

exports.getAnalytics = async (req, res) => {
  const issues = await prisma.issue.findMany({ where: { visibility: 'PUBLIC' } });

  // Compute metrics (e.g., category counts, avg times)
  const categoryCounts = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {});

  res.json({ categoryCounts /* Add more metrics */ });
};