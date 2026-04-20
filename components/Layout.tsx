import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Building2, Wrench, Leaf, Users, 
  BarChart3, Settings, Bell, Search, UserCircle, 
  ChevronRight, Menu, Bot, DollarSign, Briefcase, ClipboardList,
  ChevronDown, FileText, HardHat, LandPlot, Handshake, Shield, Map,
  Package, CalendarClock, BookUser, ClipboardCheck, FileQuestion,
  BookCheck, Coins, FolderArchive, MapPinned, Car, KeyRound,
  Presentation, Sigma, Wind, Trash2, Video, Banknote, GanttChartSquare,
  FileClock, Workflow, Receipt, ShoppingCart, LocateFixed, ArrowRightLeft,
  BookCopy, Landmark, Siren, PieChart, Scroll, X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NOTIFICATIONS } from '../services/mockData';

interface LayoutProps {
  onAiToggle: () => void;
  children: React.ReactNode;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, path, active, collapsed, onClick }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
      className={`w-full flex items-center gap-3 pr-2 py-3.5 md:py-2.5 transition-colors duration-200 group
        ${collapsed ? 'justify-center px-2' : 'pl-4'}
        ${active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
      `}
    >
      <Icon size={22} className={`flex-shrink-0 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
      {!collapsed && <span className="font-medium text-base md:text-sm flex-1 text-left">{label}</span>}
    </button>
  );
};

interface NavGroupProps {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  collapsed: boolean;
  paths: string[];
  onGroupClick?: () => void;
}

const NavGroup: React.FC<NavGroupProps> = ({ icon: Icon, label, children, collapsed, paths }) => {
  const location = useLocation();
  const isActive = paths.some((path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)));
  const [isOpen, setIsOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setIsOpen(true);
    }
  }, [isActive]);

  return (
    <div className="border-b border-slate-800/50 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-3 py-4 md:py-3 transition-colors duration-200 
          ${collapsed ? 'justify-center px-2' : 'pl-4 pr-2'} 
          ${isActive ? 'text-white bg-slate-800/30' : 'text-slate-400'} hover:bg-slate-800 hover:text-white`}
      >
        <Icon size={22} className="flex-shrink-0" />
        {!collapsed && <span className="font-semibold text-base md:text-sm flex-1 text-left">{label}</span>}
        {!collapsed && <ChevronDown size={18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      {!collapsed && isOpen && (
        <div className="py-1 bg-black/20">
          {children}
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ onAiToggle, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
  const [collapsed, setCollapsed] = useState(false); // Desktop state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const isActive = (path: string) => currentPath === path || (path !== '/' && currentPath.startsWith(path));

  // Handle resizing to reset states if needed
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 w-full overflow-hidden">
      
      {/* Mobile Sidebar Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-slate-900 text-white transition-transform duration-300 ease-in-out transform shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex md:flex-col
        ${collapsed ? 'md:w-20' : 'md:w-72'}
        w-[85vw] max-w-xs h-full flex flex-col
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-900 shrink-0 pt-safe">
          <div className={`flex items-center gap-3 ${collapsed ? 'md:justify-center md:w-full' : ''}`}>
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            {(!collapsed || sidebarOpen) && (
              <span className="text-white font-bold text-xl tracking-tight truncate">NEXUS</span>
            )}
          </div>
          
          {/* Mobile Close Button */}
          <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-slate-400 hover:text-white active:bg-slate-800 rounded-full">
            <X size={24} />
          </button>

          {/* Desktop Collapse Button */}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800">
             {collapsed ? <Menu size={20}/> : <ChevronRight size={20} className="rotate-180" />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="py-2">
             <NavItem icon={LayoutDashboard} label="Dashboard" path="/" active={currentPath === '/'} collapsed={collapsed && !sidebarOpen} />
          </div>

          <nav className="flex-1 pb-20">
            <NavGroup label="USACE REMIS" icon={Landmark} collapsed={collapsed && !sidebarOpen} paths={['/usace/']}>
              <NavItem icon={LayoutDashboard} label="REMIS Dashboard" path="/usace/dashboard" active={isActive('/usace/dashboard')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Building2} label="Real Property Inventory" path="/usace/inventory" active={isActive('/usace/inventory')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ArrowRightLeft} label="Acquisitions" path="/usace/acquisitions" active={isActive('/usace/acquisitions')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Trash2} label="Disposals" path="/usace/disposals" active={isActive('/usace/disposals')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileClock} label="Out-Grants & Leases" path="/usace/outgrants" active={isActive('/usace/outgrants')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={DollarSign} label="Appraisals" path="/usace/appraisals" active={isActive('/usace/appraisals')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={MapPinned} label="Geospatial Hub" path="/usace/gis" active={isActive('/usace/gis')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Leaf} label="Environmental" path="/usace/environmental" active={isActive('/usace/environmental')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Shield} label="Legal & Claims" path="/usace/legal" active={isActive('/usace/legal')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={PieChart} label="Cost-Share Programs" path="/usace/cost-share" active={isActive('/usace/cost-share')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Scroll} label="Permits" path="/usace/permits" active={isActive('/usace/permits')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Siren} label="Mobilization" path="/usace/mobilization" active={isActive('/usace/mobilization')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Users} label="Relocation" path="/usace/relocation" active={isActive('/usace/relocation')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileText} label="Solicitations" path="/usace/solicitations" active={isActive('/usace/solicitations')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Wrench} label="Encroachments" path="/usace/encroachments" active={isActive('/usace/encroachments')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Portfolio" icon={LandPlot} collapsed={collapsed && !sidebarOpen} paths={['/real-estate', '/lease-admin', '/contracts', '/insurance', '/gis-map']}>
              <NavItem icon={Building2} label="Properties" path="/real-estate" active={isActive('/real-estate')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileClock} label="Lease Administration" path="/lease-admin" active={isActive('/lease-admin')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileText} label="Contracts" path="/contracts" active={isActive('/contracts')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Shield} label="Insurance" path="/insurance" active={isActive('/insurance')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={MapPinned} label="GIS Map View" path="/gis-map" active={isActive('/gis-map')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>
            
            <NavGroup label="Finance" icon={Banknote} collapsed={collapsed && !sidebarOpen} paths={['/financials', '/budgeting', '/ppbe-funds', '/capital-planning', '/invoicing', '/chargebacks', '/procurement']}>
              <NavItem icon={DollarSign} label="Financial Overview" path="/financials" active={isActive('/financials')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Coins} label="Budgeting" path="/budgeting" active={isActive('/budgeting')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={GanttChartSquare} label="PPBE Funds" path="/ppbe-funds" active={isActive('/ppbe-funds')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Presentation} label="Capital Planning" path="/capital-planning" active={isActive('/capital-planning')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Receipt} label="Invoicing & Payables" path="/invoicing" active={isActive('/invoicing')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ShoppingCart} label="Procurement (POs)" path="/procurement" active={isActive('/procurement')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ArrowRightLeft} label="Chargebacks" path="/chargebacks" active={isActive('/chargebacks')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Strategy" icon={Sigma} collapsed={collapsed && !sidebarOpen} paths={['/projects', '/strategic-portfolio', '/analytics', '/reporting', '/condition-assessment']}>
              <NavItem icon={HardHat} label="Capital Projects" path="/projects" active={isActive('/projects')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={LocateFixed} label="Strategic Planning" path="/strategic-portfolio" active={isActive('/strategic-portfolio')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BarChart3} label="Analytics & BI" path="/analytics" active={isActive('/analytics')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileText} label="Reporting" path="/reporting" active={isActive('/reporting')} collapsed={collapsed && !sidebarOpen} />
               <NavItem icon={BookCheck} label="Condition Assessment" path="/condition-assessment" active={isActive('/condition-assessment')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Operations" icon={Wrench} collapsed={collapsed && !sidebarOpen} paths={['/operations', '/assets', '/vendors', '/inventory', '/preventive-maintenance', '/key-management']}>
              <NavItem icon={ClipboardList} label="Work Hub" path="/operations" active={isActive('/operations')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BookCopy} label="Asset Registry" path="/assets" active={isActive('/assets')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={CalendarClock} label="Preventive Maint." path="/preventive-maintenance" active={isActive('/preventive-maintenance')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Package} label="Inventory" path="/inventory" active={isActive('/inventory')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Handshake} label="Vendor Management" path="/vendors" active={isActive('/vendors')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={KeyRound} label="Key Management" path="/key-management" active={isActive('/key-management')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Workplace" icon={Users} collapsed={collapsed && !sidebarOpen} paths={['/space', '/people', '/reservations', '/visitor-management', '/parking']}>
              <NavItem icon={Map} label="Space & Moves" path="/space" active={isActive('/space')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BookUser} label="Reservations" path="/reservations" active={isActive('/reservations')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ClipboardCheck} label="Visitor Management" path="/visitor-management" active={isActive('/visitor-management')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Car} label="Parking" path="/parking" active={isActive('/parking')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Briefcase} label="People & Services" path="/people" active={isActive('/people')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>
            
            <NavGroup label="Sustainability" icon={Leaf} collapsed={collapsed && !sidebarOpen} paths={['/sustainability', '/energy', '/waste', '/utility-bills']}>
              <NavItem icon={LayoutDashboard} label="ESG Overview" path="/sustainability" active={isActive('/sustainability')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Wind} label="Energy" path="/energy" active={isActive('/energy')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Trash2} label="Waste" path="/waste" active={isActive('/waste')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileText} label="Utility Bills" path="/utility-bills" active={isActive('/utility-bills')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Administration" icon={Settings} collapsed={collapsed && !sidebarOpen} paths={['/admin', '/ehs', '/compliance', '/documents', '/support', '/mobile', '/cad-viewer']}>
              <NavItem icon={Workflow} label="Users & Workflows" path="/admin" active={isActive('/admin')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Shield} label="EHS & Safety" path="/ehs" active={isActive('/ehs')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BookCheck} label="Compliance" path="/compliance" active={isActive('/compliance')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FolderArchive} label="Document Central" path="/documents" active={isActive('/documents')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Video} label="CAD/BIM Viewer" path="/cad-viewer" active={isActive('/cad-viewer')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Wrench} label="Mobile Workforce" path="/mobile" active={isActive('/mobile')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileQuestion} label="Support Center" path="/support" active={isActive('/support')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>
          </nav>
        </div>


        <div className="p-4 border-t border-slate-800 bg-slate-900 shrink-0 pb-safe">
          <button 
            onClick={() => {
              onAiToggle();
              setSidebarOpen(false);
            }}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl p-3 flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95`}
          >
            <Bot size={20} />
            {(!collapsed || sidebarOpen) && <span className="font-semibold text-sm">Ask Nexus AI</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-30 shrink-0 pt-safe sticky top-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-500 hover:text-slate-900 p-2 -ml-2 rounded-full active:bg-slate-100">
              <Menu size={24} />
            </button>
            <div className="md:w-96 hidden md:block">
              <button onClick={() => setShowSearch(true)} className="relative w-full text-left group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={18} />
                <div className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-500 group-hover:bg-white group-hover:border-blue-300 transition-all">
                  Global search (Assets, Leases...)...
                </div>
              </button>
            </div>
            <button onClick={() => setShowSearch(true)} className="md:hidden text-slate-500 hover:text-slate-900 p-2 rounded-full active:bg-slate-100">
              <Search size={24} />
            </button>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-slate-500 hover:text-slate-700 p-2 rounded-full active:bg-slate-100">
              <Bell size={24} className="md:w-5 md:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-slate-900">Dr. Alistair Vance</div>
                <div className="text-xs text-slate-500">Director of Facilities</div>
              </div>
              <button className="rounded-full bg-slate-100 p-1">
                <UserCircle size={32} className="text-slate-400" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Notifications Panel */}
        {showNotifications && (
          <>
            <div className="fixed inset-0 z-20" onClick={() => setShowNotifications(false)}></div>
            <div className="absolute top-16 right-2 md:right-6 w-[95vw] md:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-30 animate-fade-in-down max-h-[70vh] flex flex-col">
              <div className="p-4 font-semibold border-b flex justify-between items-center bg-slate-50 rounded-t-xl">
                <span>Notifications</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 p-1"><X size={18}/></button>
              </div>
              <div className="overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`p-4 border-b text-sm flex gap-3 hover:bg-slate-50 active:bg-slate-100 transition-colors ${!n.isRead ? 'bg-blue-50/50' : ''}`}>
                    <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${!n.isRead ? 'bg-blue-500 shadow-sm' : 'bg-slate-300'}`}></div>
                    <div>
                      <p dangerouslySetInnerHTML={{ __html: n.message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>') }} />
                      <p className="text-xs text-slate-400 mt-1.5 font-medium">{n.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center bg-slate-50 border-t rounded-b-xl"><button className="text-sm font-medium text-blue-600 w-full py-2 hover:bg-blue-50 rounded-lg">View All</button></div>
            </div>
          </>
        )}
        
        {/* Global Search Modal */}
        {showSearch && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-2 md:pt-20 px-2" onClick={() => setShowSearch(false)}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up mt-safe" onClick={e => e.stopPropagation()}>
               <div className="relative border-b border-slate-100 flex items-center">
                 <Search className="absolute left-4 text-slate-400" size={24} />
                 <input autoFocus type="text" placeholder="Type to search..." className="w-full text-lg p-4 pl-14 focus:outline-none" />
                 <button onClick={() => setShowSearch(false)} className="absolute right-4 p-2 text-slate-400 hover:text-slate-600 active:bg-slate-100 rounded-full"><X size={24}/></button>
               </div>
               <div className="p-6 max-h-[60vh] overflow-y-auto">
                 <p className="text-sm text-slate-500 text-center py-8">Start typing to see results for Properties, Projects, Assets, Vendors, and more.</p>
               </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-slate-50 scroll-smooth pb-24 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
};