# Sistem Manajemen Sekolah

Sistem manajemen sekolah lengkap dengan 5 dashboard berbeda untuk Admin, Guru, Siswa, Orang Tua, dan Tata Usaha.

## 🚀 Fitur Utama

### 1. Dashboard Admin
- **Manajemen Pengguna**: Tambah, edit, hapus akun (Admin, Guru, Siswa, Orang Tua, TU)
- **Data Siswa**: Kelola data siswa dengan edit langsung
- **Data Guru**: Kelola data guru dan staf
- **Kelas & Jadwal**: Pengaturan kelas dan jadwal pelajaran
- **Absensi Sekolah**: Rekap kehadiran
- **Nilai & Rapor**: Kelola nilai siswa
- **Keuangan Sekolah**: Kelola pembayaran dan keuangan
- **Kode Etik**: Kelola jenis pelanggaran dan poin
- **Pengumuman**: Buat pengumuman untuk semua role

### 2. Dashboard Guru
- **Dashboard**: Statistik dan ringkasan
- **Kelas Saya**: Daftar siswa yang diajar
- **Absensi Siswa**: Input kehadiran per siswa
- **Pelanggaran Siswa**: Input data pelanggaran dengan poin
- **Penilaian**: Input nilai siswa
- **Materi & Tugas**: Kelola materi pembelajaran

### 3. Dashboard Siswa
- **Dashboard**: Ringkasan kehadiran, nilai, dan poin pelanggaran
- **Jadwal Pelajaran**: Lihat jadwal mingguan
- **Absensi Saya**: Riwayat kehadiran
- **Nilai & Rapor**: Lihat nilai per mata pelajaran
- **Tugas & Materi**: Akses materi dan tugas
- **Kode Etik**: Lihat riwayat pelanggaran dan total poin
- **Pengumuman**: Info dari sekolah

### 4. Dashboard Orang Tua
- **Dashboard**: Pantau perkembangan anak
- **Kehadiran Anak**: Statistik kehadiran
- **Nilai & Rapor**: Nilai anak
- **Pembayaran SPP**: Status pembayaran
- **Pelanggaran Anak**: Riwayat pelanggaran
- **Pengumuman**: Info dari sekolah

### 5. Dashboard Tata Usaha
- **Dashboard**: Ringkasan transaksi dan administrasi
- **Data Pembayaran**: Kelola SPP dan pembayaran lainnya
- **Surat-Menyurat**: Kelola surat masuk/keluar
- **Inventaris**: Data aset sekolah
- **Laporan Keuangan**: Laporan kas
- **Pengumuman**: Info administrasi

## 📱 Responsive Design
- Support Android, iOS, Tablet, dan Desktop
- UI/UX yang modern dan user-friendly
- Navigasi sidebar yang mudah digunakan

## 🔥 Firebase Real-time Database
- Semua data tersinkronisasi real-time
- Auto-save otomatis
- Data terhubung antar dashboard

## 🔐 Cara Login Pertama Kali

Karena data awal kosong, Anda perlu membuat akun admin pertama secara manual di Firebase:

1. Buka Firebase Console: https://console.firebase.google.com
2. Pilih project "dashboard-d2b60"
3. Pergi ke Authentication > Users
4. Klik "Add User"
5. Tambahkan:
   - Email: admin@sekolah.com
   - Password: admin123
6. Copy User UID yang dibuat
7. Pergi ke Realtime Database
8. Tambahkan data di path `users/{UID}`:
   ```json
   {
     "uid": "UID_DARI_USER",
     "email": "admin@sekolah.com",
     "nama": "Administrator",
     "role": "admin",
     "createdAt": "2025-01-15T00:00:00.000Z"
   }
   ```

Setelah itu, Anda bisa login dengan:
- Email: admin@sekolah.com
- Password: admin123

## 👥 Cara Menambah Pengguna Baru

Setelah login sebagai admin:

1. Pergi ke menu **Manajemen Pengguna**
2. Klik tombol **"Tambah Pengguna"**
3. Isi form dengan data lengkap
4. Pilih role yang sesuai (Admin, Guru, Siswa, Orang Tua, atau TU)
5. Klik **"Simpan"**

Sistem akan otomatis:
- Membuat akun di Firebase Authentication
- Menyimpan data pengguna di database
- Menambahkan ke Data Siswa atau Data Guru (jika role = siswa/guru)

## 📊 Struktur Database Firebase

```
database/
├── users/              # Data akun pengguna
├── siswa/             # Data lengkap siswa
├── guru/              # Data lengkap guru
├── kelas/             # Data kelas dan jadwal
├── absensi/           # Data kehadiran
├── nilai/             # Data nilai siswa
├── pelanggaran/       # Data pelanggaran siswa
├── jenisPelanggaran/  # Daftar jenis pelanggaran
├── pembayaran/        # Data pembayaran SPP
├── pengumuman/        # Pengumuman sekolah
├── materi/            # Materi pembelajaran
└── tugas/             # Tugas siswa
```

## 🎨 Teknologi yang Digunakan

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Firebase** - Realtime Database & Authentication
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## 🌟 Fitur Unggulan

✅ Real-time sync antar dashboard
✅ Auto-save otomatis
✅ Role-based access control
✅ Responsive design (mobile, tablet, desktop)
✅ UI/UX modern dan intuitif
✅ Data terhubung antar role
✅ Sistem pelanggaran dengan poin
✅ Manajemen kelas dan jadwal
✅ Sistem pengumuman multi-target

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Catatan Penting

- Pastikan Firebase sudah dikonfigurasi dengan benar
- Data awal kosong, input manual melalui sistem
- Semua perubahan tersimpan otomatis (real-time)
- Gunakan akun admin untuk mengelola semua data
- Jangan lupa backup database secara berkala

---

Dibuat dengan ❤️ untuk Sistem Manajemen Sekolah yang Modern dan Efisien
