import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { Plus } from 'lucide-react';

const KodeEtik: React.FC = () => {
  const [jenisPelanggaran, setJenisPelanggaran] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    poin: 0,
    kategori: 'ringan',
    sanksi: ''
  });

  useEffect(() => {
    const pelanggaranRef = ref(database, 'jenisPelanggaran');
    const unsubscribe = onValue(pelanggaranRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setJenisPelanggaran(Object.entries(data).map(([id, val]) => ({ id, ...val as any })));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await push(ref(database, 'jenisPelanggaran'), {
      ...formData,
      createdAt: new Date().toISOString()
    });
    setShowForm(false);
    setFormData({ nama: '', poin: 0, kategori: 'ringan', sanksi: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kode Etik & Pelanggaran</h2>
          <p className="text-gray-600">Kelola aturan dan pelanggaran siswa</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Jenis Pelanggaran
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pelanggaran
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poin</label>
                <input
                  type="number"
                  value={formData.poin}
                  onChange={(e) => setFormData({ ...formData, poin: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="ringan">Ringan</option>
                  <option value="sedang">Sedang</option>
                  <option value="berat">Berat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sanksi</label>
                <input
                  type="text"
                  value={formData.sanksi}
                  onChange={(e) => setFormData({ ...formData, sanksi: e.target.value })}
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

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Pelanggaran</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Poin</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">Kategori</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sanksi</th>
              </tr>
            </thead>
            <tbody>
              {jenisPelanggaran.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{item.nama}</td>
                  <td className="py-3 px-4 text-center font-semibold">{item.poin}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.kategori === 'ringan'
                          ? 'bg-yellow-100 text-yellow-700'
                          : item.kategori === 'sedang'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.kategori}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.sanksi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KodeEtik;
