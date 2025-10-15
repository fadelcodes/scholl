import React, { useState } from 'react';
import Layout from '../Layout';
import { Home, CheckSquare, FileText, DollarSign, AlertTriangle, Megaphone } from 'lucide-react';

const DashboardOrangTua: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'kehadiran', label: 'Kehadiran Anak', icon: CheckSquare },
    { id: 'nilai', label: 'Nilai & Rapor', icon: FileText },
    { id: 'pembayaran', label: 'Pembayaran SPP', icon: DollarSign },
    { id: 'pelanggaran', label: 'Pelanggaran Anak', icon: AlertTriangle },
    { id: 'pengumuman', label: 'Pengumuman', icon: Megaphone }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Orang Tua</h2>
              <p className="text-gray-600">Pantau perkembangan anak Anda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Kehadiran Bulan Ini</p>
                    <p className="text-3xl font-bold text-green-600">95%</p>
                  </div>
                  <CheckSquare className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Rata-rata Nilai</p>
                    <p className="text-3xl font-bold text-blue-600">85</p>
                  </div>
                  <FileText className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Status SPP</p>
                    <p className="text-xl font-bold text-green-600">Lunas</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Anak</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Nama</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Kelas</span>
                  <span className="font-medium">-</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Wali Kelas</span>
                  <span className="font-medium">-</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500">Fitur dalam pengembangan</p>
          </div>
        );
    }
  };

  return (
    <Layout title="Dashboard Orang Tua">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 bg-white rounded-xl shadow-md p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeMenu === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>
        <div className="flex-1">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default DashboardOrangTua;
