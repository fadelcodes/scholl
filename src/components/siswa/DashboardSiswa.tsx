import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Calendar,
  CheckSquare,
  FileText,
  BookOpen,
  AlertTriangle,
  Megaphone
} from 'lucide-react';

const DashboardSiswa: React.FC = () => {
  const { userData } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [absensiList, setAbsensiList] = useState<any[]>([]);
  const [pelanggaranList, setPelanggaranList] = useState<any[]>([]);
  const [pengumumanList, setPengumumanList] = useState<any[]>([]);

  useEffect(() => {
    if (!userData?.uid) return;

    const absensiRef = ref(database, 'absensi');
    const unsubscribeAbsensi = onValue(absensiRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const myAbsensi = Object.values(data).filter(
          (item: any) => item.siswaId === userData.uid
        );
        setAbsensiList(myAbsensi);
      }
    });

    const pelanggaranRef = ref(database, 'pelanggaran');
    const unsubscribePelanggaran = onValue(pelanggaranRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const myPelanggaran = Object.values(data).filter(
          (item: any) => item.siswaId === userData.uid
        );
        setPelanggaranList(myPelanggaran);
      }
    });

    const pengumumanRef = ref(database, 'pengumuman');
    const unsubscribePengumuman = onValue(pengumumanRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filtered = Object.values(data).filter((item: any) =>
          item.targetRole?.includes('siswa')
        );
        setPengumumanList(filtered);
      }
    });

    return () => {
      unsubscribeAbsensi();
      unsubscribePelanggaran();
      unsubscribePengumuman();
    };
  }, [userData]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jadwal', label: 'Jadwal Pelajaran', icon: Calendar },
    { id: 'absensi', label: 'Absensi Saya', icon: CheckSquare },
    { id: 'nilai', label: 'Nilai & Rapor', icon: FileText },
    { id: 'tugas', label: 'Tugas & Materi', icon: BookOpen },
    { id: 'pelanggaran', label: 'Kode Etik', icon: AlertTriangle },
    { id: 'pengumuman', label: 'Pengumuman', icon: Megaphone }
  ];

  const totalPoin = pelanggaranList.reduce((sum, p) => sum + (p.poin || 0), 0);
  const totalHadir = absensiList.filter((a) => a.status === 'hadir').length;
  const totalAlpha = absensiList.filter((a) => a.status === 'alpha').length;

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Siswa</h2>
              <p className="text-gray-600">Selamat datang, {userData?.nama}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Kehadiran</p>
                    <p className="text-3xl font-bold text-green-600">{totalHadir}</p>
                  </div>
                  <CheckSquare className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Tidak Hadir</p>
                    <p className="text-3xl font-bold text-red-600">{totalAlpha}</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-red-600 opacity-20" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Poin Pelanggaran</p>
                    <p className="text-3xl font-bold text-orange-600">{totalPoin}</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-orange-600 opacity-20" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Jadwal Hari Ini</h3>
              <p className="text-gray-500">Belum ada jadwal tersedia</p>
            </div>
          </div>
        );

      case 'absensi':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Absensi Saya</h2>
              <p className="text-gray-600">Riwayat kehadiran</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {absensiList.map((absensi, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          {new Date(absensi.tanggal).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              absensi.status === 'hadir'
                                ? 'bg-green-100 text-green-700'
                                : absensi.status === 'sakit'
                                ? 'bg-blue-100 text-blue-700'
                                : absensi.status === 'izin'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {absensi.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{absensi.keterangan || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {absensiList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">Belum ada data absensi</div>
                )}
              </div>
            </div>
          </div>
        );

      case 'pelanggaran':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Kode Etik & Pelanggaran</h2>
              <p className="text-gray-600">Riwayat pelanggaran pribadi</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Total Poin Pelanggaran:</strong> {totalPoin}
                </p>
              </div>

              <div className="space-y-4">
                {pelanggaranList.map((pelanggaran, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {pelanggaran.jenisPelanggaran}
                      </h4>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        {pelanggaran.poin} Poin
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{pelanggaran.deskripsi}</p>
                    <p className="text-gray-500 text-xs">
                      Tanggal: {new Date(pelanggaran.tanggal).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                ))}
                {pelanggaranList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Tidak ada catatan pelanggaran
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'pengumuman':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pengumuman Sekolah</h2>
              <p className="text-gray-600">Info resmi dari sekolah</p>
            </div>

            <div className="space-y-4">
              {pengumumanList.map((pengumuman: any, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{pengumuman.judul}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(pengumuman.tanggal).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <p className="text-gray-600">{pengumuman.isi}</p>
                </div>
              ))}
              {pengumumanList.length === 0 && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <p className="text-center text-gray-500">Tidak ada pengumuman</p>
                </div>
              )}
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
    <Layout title="Dashboard Siswa">
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

export default DashboardSiswa;
