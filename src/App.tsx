import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import DashboardAdmin from './components/admin/DashboardAdmin';
import DashboardGuru from './components/guru/DashboardGuru';
import DashboardSiswa from './components/siswa/DashboardSiswa';
import DashboardOrangTua from './components/orangtua/DashboardOrangTua';
import DashboardTU from './components/tu/DashboardTU';

const AppContent: React.FC = () => {
  const { currentUser, userData } = useAuth();

  if (!currentUser || !userData) {
    return <Login />;
  }

  switch (userData.role) {
    case 'admin':
      return <DashboardAdmin />;
    case 'guru':
      return <DashboardGuru />;
    case 'siswa':
      return <DashboardSiswa />;
    case 'orangtua':
      return <DashboardOrangTua />;
    case 'tu':
      return <DashboardTU />;
    default:
      return <Login />;
  }
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
