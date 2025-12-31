import { RequestHandler } from "express";

// Mock reports database
const reports: any[] = [];

export const handleCreateReport: RequestHandler = (req, res) => {
  try {
    const {
      userId,
      wardId,
      title,
      category,
      description,
      photoUrl,
      userName,
      userPhone,
    } = req.body;

    if (
      !userId ||
      !wardId ||
      !title ||
      !category ||
      !description ||
      !photoUrl
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const report = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      wardId,
      title,
      category,
      description,
      photoUrl,
      userName,
      userPhone,
      status: "pending", // pending, verified, resolved, rejected
      isVerified: false,
      verificationNotes: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    reports.push(report);

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to create report" });
  }
};

export const handleGetReports: RequestHandler = (req, res) => {
  try {
    const { wardId, userId, role } = req.query;

    let filteredReports = reports;

    if (wardId) {
      filteredReports = filteredReports.filter((r) => r.wardId === wardId);
    }

    if (userId && role === "citizen") {
      filteredReports = filteredReports.filter((r) => r.userId === userId);
    }

    res.json(filteredReports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};

export const handleGetReportById: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const report = reports.find((r) => r.id === id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch report" });
  }
};

export const handleVerifyReport: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified, verificationNotes, status } = req.body;

    const report = reports.find((r) => r.id === id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.isVerified = isVerified;
    report.verificationNotes = verificationNotes;
    report.status = status || (isVerified ? "verified" : "rejected");
    report.updatedAt = new Date();

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to verify report" });
  }
};

export const handleResolveReport: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const report = reports.find((r) => r.id === id);

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.status = "resolved";
    report.updatedAt = new Date();

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to resolve report" });
  }
};

export const handleDeleteReport: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const index = reports.findIndex((r) => r.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Report not found" });
    }

    const deletedReport = reports.splice(index, 1);
    res.json(deletedReport[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete report" });
  }
};
