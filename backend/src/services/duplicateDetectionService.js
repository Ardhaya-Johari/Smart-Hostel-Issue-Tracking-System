const { prisma } = require('../app');

exports.findDuplicates = async (newIssue) => {
  return await prisma.issue.findMany({
    where: {
      hostel: newIssue.hostel,
      block: newIssue.block,
      category: newIssue.category,
      status: { not: 'CLOSED' },
    },
  });
};