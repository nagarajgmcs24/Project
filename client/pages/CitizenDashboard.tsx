import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { LogOut, Plus, FileText, MapPin, Calendar, CheckCircle, AlertCircle, X, Upload } from 'lucide-react';
import { bengaluruWards } from '@/data/wards';

interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  photoUrl: string;
  status: 'pending' | 'verified' | 'resolved' | 'rejected';
  createdAt: string;
  verificationNotes?: string;
}

export default function CitizenDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [wardId, setWardId] = useState('');
  const [wardInfo, setWardInfo] = useState<any>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    photoUrl: '',
  });
  const [photoPreview, setPhotoPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'road-damage', label: t('roadDamage') },
    { value: 'water-problem', label: t('waterProblem') },
    { value: 'footpath', label: t('footpathIssue') },
    { value: 'drainage', label: t('drainage') },
    { value: 'street-light', label: t('streetLight') },
    { value: 'garbage', label: t('garbage') },
    { value: 'other', label: t('other') },
  ];

  useEffect(() => {
    const stored = localStorage.getItem('ward');
    if (!stored) {
      navigate('/citizen-login');
      return;
    }
    setWardId(stored);
    const ward = bengaluruWards.find(w => w.id === stored);
    setWardInfo(ward);

    // Load reports from localStorage for demo
    const savedReports = localStorage.getItem('citizenReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handlePhotoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData(prev => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitReport = async (e: any) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.description || !formData.photoUrl) {
      alert('Please fill all fields and upload a photo');
      return;
    }

    setLoading(true);
    try {
      const newReport: Report = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        category: formData.category,
        description: formData.description,
        photoUrl: formData.photoUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      localStorage.setItem('citizenReports', JSON.stringify(updatedReports));

      // Reset form
      setFormData({
        title: '',
        category: '',
        description: '',
        photoUrl: '',
      });
      setPhotoPreview('');
      setShowReportForm(false);
    } catch (err) {
      console.error('Failed to submit report:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'verified':
        return 'bg-green-50 border-green-200';
      case 'resolved':
        return 'bg-blue-50 border-blue-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  if (!wardInfo) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading')}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <p className="text-blue-100">{wardInfo.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t('logout')}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Ward Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{wardInfo.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{wardInfo.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">{t('wardCouncillor')}</p>
              <p className="font-semibold text-gray-900">{wardInfo.councillor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('wardParty')}</p>
              <p className="font-semibold text-gray-900">{wardInfo.party}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t('wardPhone')}</p>
              <p className="font-semibold text-gray-900">{wardInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-semibold text-gray-900">{wardInfo.area}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm mb-2">Total Reports</p>
            <p className="text-3xl font-bold text-blue-600">{reports.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{reports.filter(r => r.status === 'pending').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm mb-2">Verified</p>
            <p className="text-3xl font-bold text-green-600">{reports.filter(r => r.status === 'verified').length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm mb-2">Resolved</p>
            <p className="text-3xl font-bold text-blue-600">{reports.filter(r => r.status === 'resolved').length}</p>
          </div>
        </div>

        {/* Report Form Modal */}
        {showReportForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold">{t('reportIssue')}</h3>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="hover:bg-blue-700 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmitReport} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('reportTitle')} *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={t('reportTitle')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('problemCategory')} *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t('problemCategory')}</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('problemDescription')} *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder={t('problemDescription')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('uploadPhoto')} *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('photo-input')?.click()}
                  >
                    {photoPreview ? (
                      <div className="space-y-4">
                        <img src={photoPreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                        <p className="text-sm text-gray-600">Click to change photo</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <p className="text-gray-600">{t('uploadPhoto')}</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? t('loading') : t('submitReport')}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Quick Action Button */}
        <button
          onClick={() => setShowReportForm(true)}
          className="flex items-center gap-2 fixed bottom-8 right-8 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-30"
        >
          <Plus className="w-6 h-6" />
          {t('reportIssue')}
        </button>

        {/* Reports List */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            {t('myReports')}
          </h3>

          {reports.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">No reports yet. Start by submitting your first issue!</p>
              <button
                onClick={() => setShowReportForm(true)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                {t('reportIssue')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map(report => (
                <div
                  key={report.id}
                  className={`bg-white rounded-xl shadow-md border-l-4 p-6 ${getStatusColor(report.status)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(report.status)}
                        <h4 className="text-xl font-bold text-gray-900">{report.title}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(report.createdAt).toLocaleDateString()}
                      </div>
                      <p className="text-gray-700 mb-3">{report.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          {categories.find(c => c.value === report.category)?.label}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          report.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                          report.status === 'verified' ? 'bg-green-200 text-green-800' :
                          report.status === 'resolved' ? 'bg-blue-200 text-blue-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    {report.photoUrl && (
                      <div className="ml-6 flex-shrink-0">
                        <img
                          src={report.photoUrl}
                          alt={report.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  {report.verificationNotes && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Councillor's Note:</strong> {report.verificationNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
