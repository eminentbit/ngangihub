import BodReport from "../models/bod.reports.js";

export const createReport = async (req, res) => {
  const { title, type, status, content, metrics, summary } = req.body;

  const report = await BodReport.create({
    title,
    type,
    status,
    reportContent: content,
    revenue: metrics.revenue,
    expenses: metrics.expenses,
    profit: metrics.profit,
    summary,
  });

  console.log(report);
};

export const listReports = async (req, res) => {
  const reports = await BodReport.find().sort({ createdAt: -1 });

  res.status(200).json(reports);
};
