
import React, { useState, useContext } from 'react';
import { AuctionProvider, AuctionContext } from './context/AuctionContext';
import Login from './components/Login';
import SetupAuction from './components/SetupAuction';
import PlayersPanel from './components/PlayersPanel';
import SpinWheeler from './components/SpinWheeler';
import Reports from './components/Reports';
import { SetupIcon, PlayersIcon, SpinIcon, ReportsIcon, LogoutIcon } from './components/icons';

type Section = 'setup' | 'players' | 'spinner' | 'reports';

const App: React.FC = () => {
  return (
    <AuctionProvider>
      <Main />
    </AuctionProvider>
  );
};

const Main: React.FC = () => {
  const { isLoggedIn, logout } = useContext(AuctionContext);
  const [activeSection, setActiveSection] = useState<Section>('setup');

  if (!isLoggedIn) {
    return <Login />;
  }
  
  const NavItem = ({ section, label, icon }: { section: Section, label: string, icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-all duration-200 ${
        activeSection === section 
          ? 'bg-indigo-600 text-white shadow-lg' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'setup':
        return <SetupAuction />;
      case 'players':
        return <PlayersPanel />;
      case 'spinner':
        return <SpinWheeler />;
      case 'reports':
        return <Reports />;
      default:
        return <SetupAuction />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <nav className="w-64 bg-gray-800 p-4 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold font-orbitron text-indigo-400">AUCTION</h1>
            <p className="text-sm text-gray-400">GENERATOR</p>
          </div>
          <div className="space-y-3">
            <NavItem section="setup" label="Setup Auction" icon={<SetupIcon />} />
            <NavItem section="players" label="Players Panel" icon={<PlayersIcon />} />
            <NavItem section="spinner" label="Spin Wheeler" icon={<SpinIcon />} />
            <NavItem section="reports" label="Reports" icon={<ReportsIcon />} />
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-3 w-full p-3 rounded-lg text-left text-gray-300 hover:bg-red-600 hover:text-white transition-colors duration-200"
        >
          <LogoutIcon />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
      <main className="flex-1 p-6 lg:p-10 overflow-auto bg-gray-900">
        {renderSection()}
      </main>
    </div>
  );
};

export default App;
