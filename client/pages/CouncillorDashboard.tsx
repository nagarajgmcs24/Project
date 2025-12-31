import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  LogOut,
  CheckCircle,
  AlertCircle,
  MapPin,
  X,
  Send,
  Calendar,
} from "lucide-react";
import { bengaluruWards } from "@/data/wards";

interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  photoUrl: string;
  status: "pending" | "verified" | "resolved" | "rejected";
  createdAt: string;
  verificationNotes?: string;
}

export default function CouncillorDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [wardId, setWardId] = useState("");
  const [wardInfo, setWardInfo] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [verificationNotes, setVerificationNotes] = useState("");
  const [activeTab, setActiveTab] = useState<"pending" | "verified" | "all">(
    "pending",
  );

  useEffect(() => {
    const stored = localStorage.getItem("ward");
    if (!stored) {
      navigate("/councillor-login");
      return;
    }
    setWardId(stored);
    const ward = bengaluruWards.find((w) => w.id === stored);
    setWardInfo(ward);

    // Load reports from localStorage
    const savedReports = localStorage.getItem("citizenReports");
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleVerifyReport = (report: Report, isVerified: boolean) => {
    const updated = reports.map((r) =>
      r.id === report.id
        ? {
            ...r,
            status: isVerified ? "verified" : "rejected",
            verificationNotes,
          }
        : r,
    );
    setReports(updated);
    localStorage.setItem("citizenReports", JSON.stringify(updated));
    setSelectedReport(null);
    setVerificationNotes("");
  };

  const handleResolveReport = (reportId: string) => {
    const updated = reports.map((r) =>
      r.id === reportId ? { ...r, status: "resolved" } : r,
    );
    setReports(updated);
    localStorage.setItem("citizenReports", JSON.stringify(updated));
  };

  const filteredReports = reports.filter((r) => {
    if (activeTab === "pending") return r.status === "pending";
    if (activeTab === "verified")
      return r.status === "verified" || r.status === "resolved";
    return true;
  });

  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const verifiedCount = reports.filter(
    (r) => r.status === "verified" || r.status === "resolved",
  ).length;

  if (!wardInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-emerald-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
            <p className="text-emerald-100">{wardInfo.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t("logout")}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Ward Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-emerald-600">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  {wardInfo.name}
                </h2>
              </div>
              <p className="text-gray-600">{wardInfo.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t("wardCouncillor")}</p>
              <p className="font-semibold text-gray-900">
                {wardInfo.councillor}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("wardParty")}</p>
              <p className="font-semibold text-gray-900">{wardInfo.party}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("wardPhone")}</p>
              <p className="font-semibold text-gray-900">{wardInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-900">{wardInfo.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("pendingReports")}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {pendingCount}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t("issueVerified")}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {verifiedCount}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">
                  {reports.length}
                </p>
              </div>
              <MapPin className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {(["pending", "verified", "all"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-emerald-600 text-emerald-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab === "pending" && `${t("pendingReports")} (${pendingCount})`}
              {tab === "verified" && `${t("issueVerified")} (${verifiedCount})`}
              {tab === "all" && `All Reports (${reports.length})`}
            </button>
          ))}
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {activeTab === "pending"
                ? "No pending reports at the moment."
                : "No reports in this category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {report.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </div>
                    <p className="text-gray-700 mb-3">{report.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {report.category}
                      </span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          report.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : report.status === "verified"
                              ? "bg-green-200 text-green-800"
                              : report.status === "resolved"
                                ? "bg-blue-200 text-blue-800"
                                : "bg-red-200 text-red-800"
                        }`}
                      >
                        {report.status.charAt(0).toUpperCase() +
                          report.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {report.photoUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={report.photoUrl}
                        alt={report.title}
                        className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => window.open(report.photoUrl)}
                      />
                    </div>
                  )}
                </div>

                {report.verificationNotes && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <p className="text-sm text-gray-700">
                      <strong>Verification Notes:</strong>{" "}
                      {report.verificationNotes}
                    </p>
                  </div>
                )}

                {report.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="flex-1 bg-emerald-600 text-white font-semibold py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {t("verifyReport")}
                    </button>
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {t("rejectReport")}
                    </button>
                  </div>
                )}

                {report.status === "verified" && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleResolveReport(report.id)}
                      className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t("resolveReport")}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verification Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-emerald-600 text-white p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">{t("verifyPhotos")}</h3>
              <button
                onClick={() => {
                  setSelectedReport(null);
                  setVerificationNotes("");
                }}
                className="hover:bg-emerald-700 p-2 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Report Details */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {selectedReport.title}
                </h4>
                <p className="text-gray-700 mb-4">
                  {selectedReport.description}
                </p>
                {selectedReport.photoUrl && (
                  <img
                    src={selectedReport.photoUrl}
                    alt={selectedReport.title}
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* Verification Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Verification Notes
                </label>
                <textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add your verification notes here..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleVerifyReport(selectedReport, true)}
                  className="flex-1 bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  {t("issueVerified")}
                </button>
                <button
                  onClick={() => handleVerifyReport(selectedReport, false)}
                  className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t("issueFake")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
