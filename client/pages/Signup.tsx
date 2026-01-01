import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Mail, Lock, User, MapPin, Globe, Phone } from "lucide-react";
import { bengaluruWards } from "@/data/wards";

export default function Signup() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    ward: "",
    role: "citizen",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!formData.name) {
      setError(t("enterUsername"));
      return;
    }
    if (!formData.username) {
      setError(t("enterUsername"));
      return;
    }
    if (!formData.email) {
      setError(t("enterEmail"));
      return;
    }
    if (!formData.password) {
      setError(t("enterPassword"));
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!formData.phone) {
      setError(t("phoneNumber"));
      return;
    }
    if (!formData.ward) {
      setError(t("selectAWard"));
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://spi-project.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", formData.role);
      localStorage.setItem("ward", formData.ward);

      if (formData.role === "citizen") {
        navigate("/citizen-dashboard");
      } else {
        navigate("/councillor-dashboard");
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      {/* Language Selector - Top Right */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-gray-600" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="kn">ಕನ್ನಡ</option>
        </select>
      </div>

      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-purple-600 p-4 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("signup")}
          </h1>
          <p className="text-gray-600">{t("appSubtitle")}</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("name")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("name")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("username")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={t("username")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("email")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("phoneNumber")}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("phoneNumber")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("password")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t("confirmPassword")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Ward Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("selectWard")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">{t("selectWard")}</option>
                  {bengaluruWards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("selectRole")}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="citizen"
                    checked={formData.role === "citizen"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">{t("citizen")}</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="councillor"
                    checked={formData.role === "councillor"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="ml-2 text-gray-700">{t("councillor")}</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? t("loading") : t("signup")}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-gray-600">
          {t("alreadyHaveAccount")}{" "}
          <Link
            to="/citizen-login"
            className="text-purple-600 font-semibold hover:underline"
          >
            {t("login")}
          </Link>
        </p>

        {/* Back to Home */}
        <p className="text-center mt-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            {t("back")} {t("homeTitle")}
          </Link>
        </p>
      </div>
    </div>
  );
}
