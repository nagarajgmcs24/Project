import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { LogOut, Plus, FileText, MapPin } from 'lucide-react';
import { bengaluruWards } from '@/data/wards';

export default function CitizenDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [wardId, setWardId] = useState('');
  const [wardInfo, setWardInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ward');
    if (!stored) {
      navigate('/citizen-login');
      return;
    }
    setWardId(stored);
    const ward = bengaluruWards.find(w => w.id === stored);
    setWardInfo(ward);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (!wardInfo) {
    return <div className="flex items-center justify-center min-h-screen">{t('loading')}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <p className="text-blue-100">{t('citizen')}</p>
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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">{wardInfo.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{wardInfo.location}</p>
              <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Report Issue Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t('reportIssue')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Report a new issue in your ward by uploading a photo and providing details.
            </p>
            <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('reportIssue')}
            </button>
          </div>

          {/* My Reports Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t('myReports')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              View all your submitted reports and track their verification status.
            </p>
            <button className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-colors">
              {t('myReports')}
            </button>
          </div>

          {/* Ward Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t('ward')}</h3>
            </div>
            <p className="text-gray-600 mb-6">
              View detailed information about your ward, councillor, and contact details.
            </p>
            <button className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors">
              {t('wardName')}
            </button>
          </div>
        </div>

        {/* Featured Issues */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reports</h3>
          <div className="text-center py-12 text-gray-500">
            <p>No reports yet. Start by submitting your first issue!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
