export type UserRole = 'admin' | 'guru' | 'siswa' | 'orangtua' | 'tu';

export interface User {
  uid: string;
  email: string;
  role: UserRole;
  nama: string;
  createdAt: string;
}

export interface Siswa {
  id: string;
  nama: string;
  nis: string;
  email: string;
  kelas: string;
  jenisKelamin: string;
  tanggalLahir: string;
  alamat: string;
  orangTuaId?: string;
  createdAt: string;
}

export interface Guru {
  id: string;
  nama: string;
  nip: string;
  email: string;
  mataPelajaran: string;
  jenisKelamin: string;
  telepon: string;
  alamat: string;
  createdAt: string;
}

export interface Kelas {
  id: string;
  nama: string;
  waliKelasId: string;
  tingkat: string;
  tahunAjaran: string;
  siswaIds: string[];
  createdAt: string;
}

export interface Absensi {
  id: string;
  siswaId: string;
  kelasId: string;
  tanggal: string;
  status: 'hadir' | 'sakit' | 'izin' | 'alpha';
  keterangan?: string;
  createdBy: string;
  createdAt: string;
}

export interface Nilai {
  id: string;
  siswaId: string;
  mataPelajaran: string;
  jenisNilai: 'tugas' | 'uts' | 'uas' | 'harian';
  nilai: number;
  semester: string;
  tahunAjaran: string;
  guruId: string;
  createdAt: string;
}

export interface Pelanggaran {
  id: string;
  siswaId: string;
  jenisPelanggaran: string;
  poin: number;
  tanggal: string;
  deskripsi: string;
  guruId: string;
  status: 'proses' | 'selesai' | 'pembinaan';
  createdAt: string;
}

export interface JenisPelanggaran {
  id: string;
  nama: string;
  poin: number;
  kategori: 'ringan' | 'sedang' | 'berat';
  sanksi: string;
  createdAt: string;
}

export interface Pembayaran {
  id: string;
  siswaId: string;
  jenisPembayaran: 'spp' | 'daftar_ulang' | 'seragam' | 'lainnya';
  jumlah: number;
  tanggal: string;
  bulan?: string;
  tahun: string;
  status: 'lunas' | 'belum_lunas';
  metodePembayaran: string;
  createdBy: string;
  createdAt: string;
}

export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  tanggal: string;
  targetRole: UserRole[];
  kelasId?: string;
  createdBy: string;
  createdAt: string;
}

export interface Materi {
  id: string;
  judul: string;
  deskripsi: string;
  kelasId: string;
  mataPelajaran: string;
  fileUrl?: string;
  guruId: string;
  createdAt: string;
}

export interface Tugas {
  id: string;
  judul: string;
  deskripsi: string;
  kelasId: string;
  mataPelajaran: string;
  deadline: string;
  guruId: string;
  createdAt: string;
}
