import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { Plus } from 'lucide-react';

const KelasJadwal: React.FC = () => {
  const [kelasList, setKelasList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    tingkat: '',
    tahunAjaran: '2024/2025'
  });

  useEffect(() => {
    const kelasRef = ref(database, 'kelas');
    const unsubscribe = onValue(kelasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setKelasList(Object.entries(data).map(([id, val]) => ({ id, ...val as any })));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await push(ref(database, 'kelas'), {
      ...formData,
      siswaIds: [],
      createdAt: new Date().toISOString()
    });
    setShowForm(false);
    setFormData({ nama: '', tingkat: '', tahunAjaran: '2024/2025' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kelas & Jadwal</h2>
          <p className="text-gray-600">Kelola kelas dan jadwal pelajaran</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Kelas
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kelas</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: X IPA 1"
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tingkat</label>
                <select
                  value={formData.tingkat}
                  onChange={(e) => setFormData({ ...formData, tingkat: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Pilih Tingkat</option>
                  <option value="X">X</option>
                  <option value="XI">XI</option>
                  <option value="XII">XII</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tahun Ajaran</label>
                <input
                  type="text"
                  value={formData.tahunAjaran}
                  onChange={(e) => setFormData({ ...formData, tahunAjaran: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kelasList.map((kelas) => (
          <div key={kelas.id} className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{kelas.nama}</h3>
            <p className="text-gray-600">Tingkat: {kelas.tingkat}</p>
            <p className="text-gray-600">Tahun: {kelas.tahunAjaran}</p>
            <p className="text-gray-600 mt-2">Siswa: {kelas.siswaIds?.length || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelasJadwal;
