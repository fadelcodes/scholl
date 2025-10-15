import React, { useState } from 'react';
import Layout from '../Layout';
import { Home, DollarSign, FileText, Package, FileCheck, Bell } from 'lucide-react';

const DashboardTU: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pembayaran', label: 'Data Pembayaran', icon: DollarSign },
    { id: 'surat', label: 'Surat-Menyurat', icon: FileText },
    { id: 'inventaris', label: 'Inventaris', icon: Package },
    { id: 'laporan', label: 'Laporan Keuangan', icon: FileCheck },
    { id: 'pengumuman', label: 'Pengumuman', icon: Bell }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Tata Usaha</h2>
              <p className="text-gray-600">Kelola administrasi sekolah</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Pembayaran Hari Ini</p>
                    <p className="text-3xl font-bold text-green-600">0</p>
                  </div>
                  <DollarSign className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Surat Masuk</p>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                  </div>
                  <FileText className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Inventaris</p>
                    <p className="text-3xl font-bold text-orange-600">0</p>
                  </div>
                  <Package className="w-12 h-12 text-orange-600 opacity-20" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Keuangan</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Total Pemasukan Bulan Ini</span>
                  <span className="font-medium text-green-600">Rp 0</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Total Pengeluaran Bulan Ini</span>
                  <span className="font-medium text-red-600">Rp 0</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Saldo</span>
                  <span className="font-medium text-blue-600">Rp 0</span>
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
    <Layout title="Dashboard Tata Usaha">
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

export default DashboardTU;
