import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Upload, CheckCircle, Globe } from "lucide-react";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {t("appName")}
              </h1>
              <p className="text-xs text-gray-600">{t("appSubtitle")}</p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 px-4 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            {t("appName")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("homeSubtitle")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t("homeDescription")}
          </p>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/citizen-login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              {t("citizenLogin")}
            </Link>
            <Link
              to="/councillor-login"
              className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block"
            >
              {t("councillorLogin")}
            </Link>
          </div>

          {/* Sub-links */}
          <p className="text-gray-600">
            {t("dontHaveAccount")}{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              {t("signup")}
            </Link>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t("homeFeature1")}
            </h3>
            <p className="text-gray-600">
              Upload photos of problems in your ward like broken roads, water
              issues, and footpaths.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t("homeFeature2")}
            </h3>
            <p className="text-gray-600">
              Our verification system checks and validates reports to prevent
              misuse and ensure authenticity.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t("homeFeature3")}
            </h3>
            <p className="text-gray-600">
              Track the status of your reports in real-time and see when your
              ward councillor resolves issues.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-blue-600 rounded-2xl p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-8">Why Fix My Ward?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10</div>
              <p className="text-blue-100">Bengaluru Wards</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Issue Reporting</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="text-blue-100">Languages Supported</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>
            &copy; 2024 Fix My Ward - Community Problem Tracker. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
