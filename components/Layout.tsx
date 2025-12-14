import React, { useState, Fragment } from 'react';
import { 
  LayoutDashboard, Building2, Wrench, Leaf, Users, 
  BarChart3, Settings, Bell, Search, UserCircle, 
  ChevronRight, Menu, Bot, DollarSign, Briefcase, ClipboardList,
  ChevronDown, FileText, HardHat, LandPlot, Handshake, Shield, Map,
  Package, CalendarClock, BookUser, ClipboardCheck, FileQuestion,
  BookCheck, Coins, FolderArchive, MapPinned, Car, KeyRound,
  Presentation, Sigma, Wind, Trash2, Video
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NOTIFICATIONS } from '../services/mockData';

interface LayoutProps {
  children: React.ReactNode;
  onAiToggle: () => void;
}

const NavItem = ({ icon: Icon, label, path, active, collapsed, isSubItem = false }: any) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className={`w-full flex items-center gap-3 pr-2 py-2 transition-colors duration-200
        ${isSubItem ? 'pl-4' : 'pl-4'}
        ${active ? 'bg-slate-800/50 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
      `}
    >
      <Icon size={18} className="flex-shrink-0" />
      {!collapsed && <span className="font-medium text-sm flex-1 text-left">{label}</span>}
    </button>
  );
};

const NavGroup = ({ icon: Icon, label, children, collapsed, paths }: any) => {
  const location = useLocation();
  const isActive = paths.some((path: string) => location.pathname.startsWith(path));
  const [isOpen, setIsOpen] = useState(isActive);

  return (
    <div className="border-b border-slate-800/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 pl-4 pr-2 py-3 transition-colors duration-200 ${isActive ? 'text-white' : 'text-slate-400'} hover:bg-slate-800 hover:text-white`}
      >
        <Icon size={20} className="flex-shrink-0" />
        {!collapsed && <span className="font-semibold text-sm flex-1 text-left">{label}</span>}
        {!collapsed && <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      {!collapsed && isOpen && (
        <div className="py-1 bg-black/20">
          {React.Children.map(children, child => React.cloneElement(child, { isSubItem: true }))}
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, onAiToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath.startsWith(path);

  return (
    <div className="flex h-screen bg-slate-50 w-full overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-slate-900 flex-shrink-0 transition-all duration-300 flex flex-col ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">NEXUS</span>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-slate-400 hover:text-white">
             {collapsed ? <Menu size={20}/> : <ChevronRight size={20} className="rotate-180" />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="py-2 pl-4 pr-2">
             <NavItem icon={LayoutDashboard} label="Dashboard" path="/" active={currentPath === '/'} collapsed={collapsed} />
          </div>

          <nav className="flex-1">
            <NavGroup label="Portfolio" icon={LandPlot} collapsed={collapsed} paths={['/real-estate', '/contracts', '/transactions', '/insurance', '/gis-map']}>
              <NavItem icon={Building2} label="Properties" path="/real-estate" active={isActive('/real-estate')} collapsed={collapsed} />
              <NavItem icon={FileText} label="Leases & Contracts" path="/contracts" active={isActive('/contracts')} collapsed={collapsed} />
              <NavItem icon={Coins} label="Transactions" path="/real-estate" active={isActive('/transactions')} collapsed={collapsed} />
              <NavItem icon={Shield} label="Insurance" path="/insurance" active={isActive('/insurance')} collapsed={collapsed} />
              <NavItem icon={MapPinned} label="GIS Map View" path="/gis-map" active={isActive('/gis-map')} collapsed={collapsed} />
            </NavGroup>

            <NavGroup label="Operations" icon={Wrench} collapsed={collapsed} paths={['/operations', '/assets', '/vendors', '/inventory', '/preventive-maintenance', '/key-management']}>
              <NavItem icon={ClipboardList} label="Work Hub" path="/operations" active={isActive('/operations')} collapsed={collapsed} />
              <NavItem icon={HardHat} label="Asset Registry" path="/assets" active={isActive('/assets')} collapsed={collapsed} />
              <NavItem icon={CalendarClock} label="Preventive Maint." path="/preventive-maintenance" active={isActive('/preventive-maintenance')} collapsed={collapsed} />
              <NavItem icon={Package} label="Inventory" path="/inventory" active={isActive('/inventory')} collapsed={collapsed} />
              <NavItem icon={Handshake} label="Vendor Management" path="/vendors" active={isActive('/vendors')} collapsed={collapsed} />
              <NavItem icon={KeyRound} label="Key Management" path="/key-management" active={isActive('/key-management')} collapsed={collapsed} />
            </NavGroup>

            <NavGroup label="Workplace" icon={Users} collapsed={collapsed} paths={['/space', '/people', '/reservations', '/visitor-management', '/parking']}>
              <NavItem icon={Map} label="Space & Moves" path="/space" active={isActive('/space')} collapsed={collapsed} />
              <NavItem icon={BookUser} label="Reservations" path="/reservations" active={isActive('/reservations')} collapsed={collapsed} />
              <NavItem icon={ClipboardCheck} label="Visitor Management" path="/visitor-management" active={isActive('/visitor-management')} collapsed={collapsed} />
              <NavItem icon={Car} label="Parking" path="/parking" active={isActive('/parking')} collapsed={collapsed} />
              <NavItem icon={Briefcase} label="People & Services" path="/people" active={isActive('/people')} collapsed={collapsed} />
            </NavGroup>

            <NavGroup label="Strategy" icon={Sigma} collapsed={collapsed} paths={['/projects', '/financials', '/budgeting', '/analytics', '/reporting', '/condition-assessment']}>
              <NavItem icon={Presentation} label="Capital Projects" path="/projects" active={isActive('/projects')} collapsed={collapsed} />
              <NavItem icon={DollarSign} label="Financials" path="/financials" active={isActive('/financials')} collapsed={collapsed} />
              <NavItem icon={Coins} label="Budgeting" path="/budgeting" active={isActive('/budgeting')} collapsed={collapsed} />
              <NavItem icon={BarChart3} label="Analytics & BI" path="/analytics" active={isActive('/analytics')} collapsed={collapsed} />
              <NavItem icon={FileText} label="Reporting" path="/reporting" active={isActive('/reporting')} collapsed={collapsed} />
               <NavItem icon={BookCheck} label="Condition Assessment" path="/condition-assessment" active={isActive('/condition-assessment')} collapsed={collapsed} />
            </NavGroup>
            
            <NavGroup label="Sustainability" icon={Leaf} collapsed={collapsed} paths={['/sustainability', '/energy', '/waste', '/utility-bills']}>
              <NavItem icon={LayoutDashboard} label="ESG Overview" path="/sustainability" active={isActive('/sustainability')} collapsed={collapsed} />
              <NavItem icon={Wind} label="Energy" path="/energy" active={isActive('/energy')} collapsed={collapsed} />
              <NavItem icon={Trash2} label="Waste" path="/waste" active={isActive('/waste')} collapsed={collapsed} />
              <NavItem icon={FileText} label="Utility Bills" path="/utility-bills" active={isActive('/utility-bills')} collapsed={collapsed} />
            </NavGroup>

            <NavGroup label="Administration" icon={Settings} collapsed={collapsed} paths={['/admin', '/ehs', '/compliance', '/documents', '/support', '/mobile', '/cad-viewer']}>
              <NavItem icon={Users} label="Users & Workflows" path="/admin" active={isActive('/admin')} collapsed={collapsed} />
              <NavItem icon={Shield} label="EHS & Safety" path="/ehs" active={isActive('/ehs')} collapsed={collapsed} />
              <NavItem icon={BookCheck} label="Compliance" path="/compliance" active={isActive('/compliance')} collapsed={collapsed} />
              <NavItem icon={FolderArchive} label="Document Central" path="/documents" active={isActive('/documents')} collapsed={collapsed} />
              <NavItem icon={Video} label="CAD/BIM Viewer" path="/cad-viewer" active={isActive('/cad-viewer')} collapsed={collapsed} />
              <NavItem icon={Wrench} label="Mobile Workforce" path="/mobile" active={isActive('/mobile')} collapsed={collapsed} />
              <NavItem icon={FileQuestion} label="Support Center" path="/support" active={isActive('/support')} collapsed={collapsed} />
            </NavGroup>
          </nav>
        </div>


        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onAiToggle}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-md p-2 flex items-center justify-center gap-2 shadow-lg transition-all`}
          >
            <Bot size={20} />
            {!collapsed && <span className="font-semibold text-sm">Ask Nexus AI</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-20">
          <div className="flex items-center gap-4 w-96">
            <button onClick={() => setShowSearch(true)} className="relative w-full text-left">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <div className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md bg-slate-50 text-sm text-slate-500">
                Global search (Assets, Leases, Projects)...
              </div>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-slate-500 hover:text-slate-700">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-slate-900">Dr. Alistair Vance</div>
                <div className="text-xs text-slate-500">Director of Facilities</div>
              </div>
              <UserCircle size={32} className="text-slate-400" />
            </div>
          </div>
        </header>
        
        {/* Notifications Panel */}
        {showNotifications && (
          <div className="absolute top-16 right-6 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 z-30 animate-fade-in-down">
            <div className="p-3 font-semibold border-b">Notifications</div>
            <div className="max-h-96 overflow-y-auto">
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className={`p-3 border-b text-sm flex gap-3 hover:bg-slate-50 ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!n.isRead ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                  <div>
                    <p dangerouslySetInnerHTML={{ __html: n.message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} />
                    <p className="text-xs text-slate-400 mt-1">{n.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 text-center bg-slate-50"><button className="text-sm font-medium text-blue-600">View All</button></div>
          </div>
        )}
        
        {/* Global Search Modal */}
        {showSearch && (
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setShowSearch(false)}>
            <div className="bg-white rounded-lg shadow-2xl mt-20 max-w-2xl mx-auto" onClick={e => e.stopPropagation()}>
               <div className="relative">
                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                 <input autoFocus type="text" placeholder="Type to search across the entire platform..." className="w-full text-lg p-4 pl-12 border-b focus:outline-none" />
               </div>
               <div className="p-6 max-h-[60vh] overflow-y-auto">
                 <p className="text-sm text-slate-500 text-center">Start typing to see results for Properties, Projects, Assets, Vendors, and more.</p>
               </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};
