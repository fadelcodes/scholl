import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { Users, GraduationCap, CheckCircle, AlertCircle } from 'lucide-react';

const StatistikAdmin: React.FC = () => {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    hadirHariIni: 0,
    tidakHadirHariIni: 0
  });

  useEffect(() => {
    const siswaRef = ref(database, 'siswa');
    const guruRef = ref(database, 'guru');
    const absensiRef = ref(database, 'absensi');

    const unsubscribeSiswa = onValue(siswaRef, (snapshot) => {
      const data = snapshot.val();
      setStats((prev) => ({ ...prev, totalSiswa: data ? Object.keys(data).length : 0 }));
    });

    const unsubscribeGuru = onValue(guruRef, (snapshot) => {
      const data = snapshot.val();
      setStats((prev) => ({ ...prev, totalGuru: data ? Object.keys(data).length : 0 }));
    });

    const unsubscribeAbsensi = onValue(absensiRef, (snapshot) => {
      const data = snapshot.val();
      const today = new Date().toISOString().split('T')[0];
      let hadir = 0;
      let tidakHadir = 0;

      if (data) {
        Object.values(data).forEach((absen: any) => {
          if (absen.tanggal === today) {
            if (absen.status === 'hadir') {
              hadir++;
            } else {
              tidakHadir++;
            }
          }
        });
      }

      setStats((prev) => ({ ...prev, hadirHariIni: hadir, tidakHadirHariIni: tidakHadir }));
    });

    return () => {
      unsubscribeSiswa();
      unsubscribeGuru();
      unsubscribeAbsensi();
    };
  }, []);

  const statCards = [
    {
      title: 'Total Siswa',
      value: stats.totalSiswa,
      icon: Users,
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Guru & Staf',
      value: stats.totalGuru,
      icon: GraduationCap,
      bgColor: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Hadir Hari Ini',
      value: stats.hadirHariIni,
      icon: CheckCircle,
      bgColor: 'bg-emerald-500',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Tidak Hadir Hari Ini',
      value: stats.tidakHadirHariIni,
      icon: AlertCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Admin</h2>
        <p className="text-gray-600">Ringkasan statistik dan informasi sekolah</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Cepat</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Tanggal Hari Ini</span>
            <span className="font-medium text-gray-900">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <span className="text-gray-600">Tahun Ajaran</span>
            <span className="font-medium text-gray-900">2024/2025</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-600">Semester</span>
            <span className="font-medium text-gray-900">Genap</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikAdmin;
