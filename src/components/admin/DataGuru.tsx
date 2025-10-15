import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { Guru } from '../../types';
import { Search } from 'lucide-react';

const DataGuru: React.FC = () => {
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const guruRef = ref(database, 'guru');
    const unsubscribe = onValue(guruRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGuruList(Object.values(data) as Guru[]);
      } else {
        setGuruList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredGuru = guruList.filter(
    (guru) =>
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Guru & Staf</h2>
        <p className="text-gray-600">Kelola informasi guru dan staf sekolah</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari guru..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">NIP</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Mata Pelajaran</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Telepon</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuru.map((guru) => (
                <tr key={guru.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{guru.nip}</td>
                  <td className="py-3 px-4 font-medium">{guru.nama}</td>
                  <td className="py-3 px-4">{guru.mataPelajaran}</td>
                  <td className="py-3 px-4 text-gray-600">{guru.email}</td>
                  <td className="py-3 px-4 text-gray-600">{guru.telepon}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredGuru.length === 0 && (
            <div className="text-center py-8 text-gray-500">Tidak ada data guru</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataGuru;
