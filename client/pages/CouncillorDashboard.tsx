import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { LogOut, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { bengaluruWards } from '@/data/wards';

export default function CouncillorDashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [wardId, setWardId] = useState('');
  const [wardInfo, setWardInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ward');
    if (!stored) {
      navigate('/councillor-login');
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-emerald-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('dashboard')}</h1>
            <p className="text-emerald-100">{t('councillor')}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors"
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
                <MapPin className="w-6 h-6 text-emerald-600" />
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
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{wardInfo.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('pendingReports')}</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{t('issueVerified')}</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">0</p>
              </div>
              <MapPin className="w-10 h-10 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Reports */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              {t('pendingReports')}
            </h3>
            <div className="text-center py-12 text-gray-500">
              <p>No pending reports at the moment.</p>
            </div>
          </div>

          {/* Verified Reports */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              {t('issueVerified')}
            </h3>
            <div className="text-center py-12 text-gray-500">
              <p>No verified reports yet.</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-emerald-50 rounded-xl p-8 border border-emerald-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Responsibilities:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Review all incoming problem reports from citizens in your ward</li>
            <li>✓ Verify the authenticity of uploaded photos and descriptions</li>
            <li>✓ Approve verified reports and mark them as resolved when action is taken</li>
            <li>✓ Maintain communication with citizens regarding their reports</li>
            <li>✓ Reject false or misleading reports to maintain platform integrity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
