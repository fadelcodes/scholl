import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { database } from '../../config/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Calendar } from 'lucide-react';

const PengumumanAgenda: React.FC = () => {
  const { userData } = useAuth();
  const [pengumumanList, setPengumumanList] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    judul: '',
    isi: '',
    targetRole: [] as string[]
  });

  useEffect(() => {
    const pengumumanRef = ref(database, 'pengumuman');
    const unsubscribe = onValue(pengumumanRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, val]) => ({ id, ...val as any }));
        setPengumumanList(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await push(ref(database, 'pengumuman'), {
      ...formData,
      tanggal: new Date().toISOString().split('T')[0],
      createdBy: userData?.uid,
      createdAt: new Date().toISOString()
    });
    setShowForm(false);
    setFormData({ judul: '', isi: '', targetRole: [] });
  };

  const toggleRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      targetRole: prev.targetRole.includes(role)
        ? prev.targetRole.filter((r) => r !== role)
        : [...prev.targetRole, role]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pengumuman & Agenda</h2>
          <p className="text-gray-600">Kelola informasi dan kegiatan sekolah</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Buat Pengumuman
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul</label>
              <input
                type="text"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Isi Pengumuman</label>
              <textarea
                value={formData.isi}
                onChange={(e) => setFormData({ ...formData, isi: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={5}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
              <div className="flex flex-wrap gap-2">
                {['admin', 'guru', 'siswa', 'orangtua', 'tu'].map((role) => (
                  <label key={role} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.targetRole.includes(role)}
                      onChange={() => toggleRole(role)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 capitalize">{role}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Publikasikan
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

      <div className="space-y-4">
        {pengumumanList.map((pengumuman) => (
          <div key={pengumuman.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{pengumuman.judul}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(pengumuman.tanggal).toLocaleDateString('id-ID')}
              </div>
            </div>
            <p className="text-gray-600 mb-3">{pengumuman.isi}</p>
            <div className="flex gap-2">
              {pengumuman.targetRole?.map((role: string) => (
                <span
                  key={role}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PengumumanAgenda;
