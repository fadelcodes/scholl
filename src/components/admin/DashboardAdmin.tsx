import React, { useState } from 'react';
import Layout from '../Layout';
import {
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  AlertTriangle,
  Megaphone,
  FileText,
  Settings,
  Home
} from 'lucide-react';
import StatistikAdmin from './StatistikAdmin';
import ManajemenPengguna from './ManajemenPengguna';
import DataSiswa from './DataSiswa';
import DataGuru from './DataGuru';
import KelasJadwal from './KelasJadwal';
import AbsensiSekolah from './AbsensiSekolah';
import NilaiRapor from './NilaiRapor';
import KeuanganSekolah from './KeuanganSekolah';
import KodeEtik from './KodeEtik';
import PengumumanAgenda from './PengumumanAgenda';

type MenuType =
  | 'dashboard'
  | 'manajemen-pengguna'
  | 'data-siswa'
  | 'data-guru'
  | 'kelas-jadwal'
  | 'absensi'
  | 'nilai-rapor'
  | 'keuangan'
  | 'kode-etik'
  | 'pengumuman';

const DashboardAdmin: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'manajemen-pengguna', label: 'Manajemen Pengguna', icon: Settings },
    { id: 'data-siswa', label: 'Data Siswa', icon: Users },
    { id: 'data-guru', label: 'Data Guru & Staf', icon: GraduationCap },
    { id: 'kelas-jadwal', label: 'Kelas & Jadwal', icon: Calendar },
    { id: 'absensi', label: 'Absensi Sekolah', icon: FileText },
    { id: 'nilai-rapor', label: 'Nilai & Rapor', icon: FileText },
    { id: 'keuangan', label: 'Keuangan Sekolah', icon: DollarSign },
    { id: 'kode-etik', label: 'Kode Etik & Pelanggaran', icon: AlertTriangle },
    { id: 'pengumuman', label: 'Pengumuman & Agenda', icon: Megaphone }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <StatistikAdmin />;
      case 'manajemen-pengguna':
        return <ManajemenPengguna />;
      case 'data-siswa':
        return <DataSiswa />;
      case 'data-guru':
        return <DataGuru />;
      case 'kelas-jadwal':
        return <KelasJadwal />;
      case 'absensi':
        return <AbsensiSekolah />;
      case 'nilai-rapor':
        return <NilaiRapor />;
      case 'keuangan':
        return <KeuanganSekolah />;
      case 'kode-etik':
        return <KodeEtik />;
      case 'pengumuman':
        return <PengumumanAgenda />;
      default:
        return <StatistikAdmin />;
    }
  };

  return (
    <Layout title="Dashboard Admin">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 bg-white rounded-xl shadow-md p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as MenuType)}
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

export default DashboardAdmin;
