import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  Users,
  CheckSquare,
  AlertTriangle,
  FileText,
  BookOpen,
  Plus
} from 'lucide-react';

const DashboardGuru: React.FC = () => {
  const { userData } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  const [siswaList, setSiswaList] = useState<any[]>([]);
  const [showAbsensiForm, setShowAbsensiForm] = useState(false);
  const [showPelanggaranForm, setShowPelanggaranForm] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState('');
  const [absensiData, setAbsensiData] = useState({
    status: 'hadir',
    keterangan: ''
  });
  const [pelanggaranData, setPelanggaranData] = useState({
    jenisPelanggaran: '',
    poin: 0,
    deskripsi: ''
  });

  useEffect(() => {
    const siswaRef = ref(database, 'siswa');
    const unsubscribe = onValue(siswaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSiswaList(Object.values(data));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitAbsensi = async (e: React.FormEvent) => {
    e.preventDefault();
    await push(ref(database, 'absensi'), {
      siswaId: selectedSiswa,
      tanggal: new Date().toISOString().split('T')[0],
      ...absensiData,
      createdBy: userData?.uid,
      createdAt: new Date().toISOString()
    });
    setShowAbsensiForm(false);
    setAbsensiData({ status: 'hadir', keterangan: '' });
    setSelectedSiswa('');
  };

  const handleSubmitPelanggaran = async (e: React.FormEvent) => {
    e.preventDefault();
    await push(ref(database, 'pelanggaran'), {
      siswaId: selectedSiswa,
      ...pelanggaranData,
      tanggal: new Date().toISOString().split('T')[0],
      guruId: userData?.uid,
      status: 'proses',
      createdAt: new Date().toISOString()
    });
    setShowPelanggaranForm(false);
    setPelanggaranData({ jenisPelanggaran: '', poin: 0, deskripsi: '' });
    setSelectedSiswa('');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'kelas', label: 'Kelas Saya', icon: Users },
    { id: 'absensi', label: 'Absensi Siswa', icon: CheckSquare },
    { id: 'pelanggaran', label: 'Pelanggaran Siswa', icon: AlertTriangle },
    { id: 'penilaian', label: 'Penilaian', icon: FileText },
    { id: 'materi', label: 'Materi & Tugas', icon: BookOpen }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Guru</h2>
              <p className="text-gray-600">
                Selamat datang, {userData?.nama}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Total Siswa</p>
                    <p className="text-3xl font-bold text-blue-600">{siswaList.length}</p>
                  </div>
                  <Users className="w-12 h-12 text-blue-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Jadwal Hari Ini</p>
                    <p className="text-3xl font-bold text-green-600">5</p>
                  </div>
                  <BookOpen className="w-12 h-12 text-green-600 opacity-20" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Tugas Belum Dinilai</p>
                    <p className="text-3xl font-bold text-orange-600">12</p>
                  </div>
                  <FileText className="w-12 h-12 text-orange-600 opacity-20" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'absensi':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Absensi Siswa</h2>
                <p className="text-gray-600">Input kehadiran siswa</p>
              </div>
              <button
                onClick={() => setShowAbsensiForm(!showAbsensiForm)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                <Plus className="w-5 h-5" />
                Input Absensi
              </button>
            </div>

            {showAbsensiForm && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmitAbsensi} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Siswa
                    </label>
                    <select
                      value={selectedSiswa}
                      onChange={(e) => setSelectedSiswa(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    >
                      <option value="">Pilih Siswa</option>
                      {siswaList.map((siswa) => (
                        <option key={siswa.id} value={siswa.id}>
                          {siswa.nama} - {siswa.kelas}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={absensiData.status}
                      onChange={(e) => setAbsensiData({ ...absensiData, status: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="hadir">Hadir</option>
                      <option value="sakit">Sakit</option>
                      <option value="izin">Izin</option>
                      <option value="alpha">Alpha</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keterangan
                    </label>
                    <textarea
                      value={absensiData.keterangan}
                      onChange={(e) =>
                        setAbsensiData({ ...absensiData, keterangan: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAbsensiForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        );

      case 'pelanggaran':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pelanggaran Siswa</h2>
                <p className="text-gray-600">Input data pelanggaran</p>
              </div>
              <button
                onClick={() => setShowPelanggaranForm(!showPelanggaranForm)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <Plus className="w-5 h-5" />
                Input Pelanggaran
              </button>
            </div>

            {showPelanggaranForm && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <form onSubmit={handleSubmitPelanggaran} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Siswa
                    </label>
                    <select
                      value={selectedSiswa}
                      onChange={(e) => setSelectedSiswa(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    >
                      <option value="">Pilih Siswa</option>
                      {siswaList.map((siswa) => (
                        <option key={siswa.id} value={siswa.id}>
                          {siswa.nama} - {siswa.kelas}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Pelanggaran
                    </label>
                    <input
                      type="text"
                      value={pelanggaranData.jenisPelanggaran}
                      onChange={(e) =>
                        setPelanggaranData({ ...pelanggaranData, jenisPelanggaran: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Contoh: Terlambat, Tidak pakai seragam"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Poin</label>
                    <input
                      type="number"
                      value={pelanggaranData.poin}
                      onChange={(e) =>
                        setPelanggaranData({ ...pelanggaranData, poin: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                    <textarea
                      value={pelanggaranData.deskripsi}
                      onChange={(e) =>
                        setPelanggaranData({ ...pelanggaranData, deskripsi: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg">
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPelanggaranForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            )}
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
    <Layout title="Dashboard Guru">
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

export default DashboardGuru;
