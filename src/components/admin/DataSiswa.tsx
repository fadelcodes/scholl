import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../../config/firebase';
import { Siswa } from '../../types';
import { Edit2, Search } from 'lucide-react';

const DataSiswa: React.FC = () => {
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Siswa>>({});

  useEffect(() => {
    const siswaRef = ref(database, 'siswa');
    const unsubscribe = onValue(siswaRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data) as Siswa[];
        setSiswaList(list);
      } else {
        setSiswaList([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (siswa: Siswa) => {
    setEditingId(siswa.id);
    setEditData(siswa);
  };

  const handleSave = async () => {
    if (!editingId) return;

    try {
      await update(ref(database, `siswa/${editingId}`), editData);
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error('Error updating siswa:', error);
    }
  };

  const filteredSiswa = siswaList.filter(
    (siswa) =>
      siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.nis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Data Siswa</h2>
        <p className="text-gray-600">Kelola informasi siswa</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari siswa (nama, NIS, kelas)..."
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
                <th className="text-left py-3 px-4 font-semibold text-gray-700">NIS</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Kelas</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">JK</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredSiswa.map((siswa) => (
                <tr key={siswa.id} className="border-b border-gray-100 hover:bg-gray-50">
                  {editingId === siswa.id ? (
                    <>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editData.nis || ''}
                          onChange={(e) => setEditData({ ...editData, nis: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editData.nama || ''}
                          onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          value={editData.kelas || ''}
                          onChange={(e) => setEditData({ ...editData, kelas: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={editData.jenisKelamin || ''}
                          onChange={(e) => setEditData({ ...editData, jenisKelamin: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        >
                          <option value="L">L</option>
                          <option value="P">P</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="email"
                          value={editData.email || ''}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full px-2 py-1 border rounded"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={handleSave}
                          className="px-3 py-1 bg-green-600 text-white rounded mr-2"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 rounded"
                        >
                          Batal
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4">{siswa.nis}</td>
                      <td className="py-3 px-4 font-medium">{siswa.nama}</td>
                      <td className="py-3 px-4">{siswa.kelas}</td>
                      <td className="py-3 px-4">{siswa.jenisKelamin}</td>
                      <td className="py-3 px-4 text-gray-600">{siswa.email}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleEdit(siswa)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredSiswa.length === 0 && (
            <div className="text-center py-8 text-gray-500">Tidak ada data siswa</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSiswa;
