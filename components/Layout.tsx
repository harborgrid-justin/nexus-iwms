import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Building2, Wrench, Leaf, Users, 
  BarChart3, Settings, Bell, Search, UserCircle, 
  ChevronRight, Menu, Bot, DollarSign, Briefcase, ClipboardList,
  ChevronDown, FileText, HardHat, LandPlot, Handshake, Shield, Map,
  Package, CalendarClock, BookUser, ClipboardCheck, FileQuestion,
  BookCheck, Coins, FolderArchive, MapPinned, KeyRound,
  Presentation, Sigma, Wind, Trash2, Video, Banknote, GanttChartSquare,
  FileClock, Workflow, Receipt, ShoppingCart, LocateFixed, ArrowRightLeft,
  BookCopy, Landmark, Siren, PieChart, Scroll, X, ShieldCheck, Info,
  Scale, FileSearch, Layers, GanttChart, Share2, FileBadge, Shuffle, Move,
  AlertTriangle, Database
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
      className={`w-full flex items-center gap-2.5 pr-2 py-1.5 transition-all duration-150 group relative
        ${collapsed ? 'justify-center px-1' : 'pl-3'}
        ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
      `}
    >
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-500 rounded-r-sm shadow-[0_0_8px_#3b82f6]" />}
      <Icon size={16} className={`flex-shrink-0 transition-colors ${active ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'}`} />
      {!collapsed && <span className={`font-medium text-[12px] tracking-tight flex-1 text-left ${active ? 'text-white' : ''}`}>{label}</span>}
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
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center gap-2.5 py-1 transition-all duration-150 text-[10px] font-bold uppercase tracking-[0.05em]
          ${collapsed ? 'justify-center px-2' : 'pl-3 pr-2'} 
          ${isActive ? 'text-slate-300' : 'text-slate-600'} hover:text-slate-200`}
      >
        {!collapsed && <span className="flex-1 text-left opacity-60 tracking-wider font-bold">{label}</span>}
        {!collapsed && <ChevronDown size={12} className={`transition-transform duration-200 opacity-40 ${isOpen ? 'rotate-180' : ''}`} />}
      </button>
      {(!collapsed || isOpen) && (
        <div className="mt-1 space-y-0.5">
          {children}
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ onAiToggle, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile state
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed for terminal feel
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
    <div className="flex h-screen bg-[#FBFBFB] w-full overflow-hidden text-slate-900 font-sans">
      
      {/* Mobile Sidebar Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 md:hidden transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-[#0A0A0B] text-white transition-all duration-300 ease-in-out transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex md:flex-col
        ${collapsed ? 'md:w-[64px]' : 'md:w-[240px]'}
        w-[80vw] max-w-[280px] h-full flex flex-col border-r border-[#1F1F23]
      `}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#1F1F23] bg-[#0A0A0B] shrink-0 pt-safe">
          <div className={`flex items-center gap-2.5 ${collapsed ? 'md:justify-center md:w-full' : ''}`}>
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <span className="text-white font-black text-[10px] tracking-tighter">RE</span>
            </div>
            {(!collapsed || sidebarOpen) && (
              <span className="text-white font-bold text-xs tracking-[0.2em] uppercase truncate opacity-90">Remis System</span>
            )}
          </div>
          
          {/* Desktop Collapse Button */}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block text-slate-700 hover:text-white transition-colors">
             {collapsed ? <ChevronRight size={14}/> : <ChevronRight size={14} className="rotate-180" />}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar py-6">
          <div className="px-3 mb-8">
             <NavItem icon={LayoutDashboard} label="Global Terminal" path="/" active={currentPath === '/'} collapsed={collapsed && !sidebarOpen} />
          </div>

          <nav className="flex-1 px-3">
            <NavGroup label="Strategic Portfolio" icon={LandPlot} collapsed={collapsed && !sidebarOpen} paths={['/real-estate', '/lease-admin', '/contracts', '/insurance', '/gis-map', '/strategic-portfolio']}>
              <NavItem icon={Building2} label="Asset Ledger" path="/real-estate" active={isActive('/real-estate')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileClock} label="Lease Control" path="/lease-admin" active={isActive('/lease-admin')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileText} label="Contracts" path="/contracts" active={isActive('/contracts')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ShieldCheck} label="Insurance" path="/insurance" active={isActive('/insurance')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={MapPinned} label="Geospatial Hub" path="/gis-map" active={isActive('/gis-map')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={LocateFixed} label="Strata Planning" path="/strategic-portfolio" active={isActive('/strategic-portfolio')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>
            
            <NavGroup label="Command Finance" icon={Banknote} collapsed={collapsed && !sidebarOpen} paths={['/financials', '/budgeting', '/ppbe-funds', '/capital-planning', '/invoicing', '/chargebacks', '/procurement']}>
              <NavItem icon={DollarSign} label="Financial View" path="/financials" active={isActive('/financials')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Coins} label="Budget Control" path="/budgeting" active={isActive('/budgeting')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={GanttChartSquare} label="PPBE Ledger" path="/ppbe-funds" active={isActive('/ppbe-funds')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Presentation} label="Capital Allocation" path="/capital-planning" active={isActive('/capital-planning')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Receipt} label="Expenditure" path="/invoicing" active={isActive('/invoicing')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ArrowRightLeft} label="Chargebacks" path="/chargebacks" active={isActive('/chargebacks')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ShoppingCart} label="Procurement" path="/procurement" active={isActive('/procurement')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Strategy & BI" icon={Sigma} collapsed={collapsed && !sidebarOpen} paths={['/projects', '/analytics', '/reporting', '/condition-assessment']}>
              <NavItem icon={Briefcase} label="Capital Projects" path="/projects" active={isActive('/projects')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BarChart3} label="Asset Intelligence" path="/analytics" active={isActive('/analytics')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={ClipboardCheck} label="Condition Metrics" path="/condition-assessment" active={isActive('/condition-assessment')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileClock} label="Operational Reports" path="/reporting" active={isActive('/reporting')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Mission Operations" icon={Wrench} collapsed={collapsed && !sidebarOpen} paths={['/operations', '/assets', '/vendors', '/inventory', '/preventive-maintenance', '/key-management']}>
              <NavItem icon={ClipboardList} label="Ops Controller" path="/operations" active={isActive('/operations')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BookCopy} label="Resource Registry" path="/assets" active={isActive('/assets')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Package} label="Inventory Hub" path="/inventory" active={isActive('/inventory')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Workflow} label="Preventive Protocol" path="/preventive-maintenance" active={isActive('/preventive-maintenance')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={KeyRound} label="Key Control" path="/key-management" active={isActive('/key-management')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="Workplace & Mobility" icon={Users} collapsed={collapsed && !sidebarOpen} paths={['/space', '/people', '/reservations', '/visitor-management', '/parking', '/mobile']}>
              <NavItem icon={Map} label="Space Logistics" path="/space" active={isActive('/space')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={BookUser} label="Reservations" path="/reservations" active={isActive('/reservations')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Users} label="Personnel Matrix" path="/people" active={isActive('/people')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Siren} label="Visitor Control" path="/visitor-management" active={isActive('/visitor-management')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={LocateFixed} label="Parking Logistics" path="/parking" active={isActive('/parking')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={LocateFixed} label="Mobile Workforce" path="/mobile" active={isActive('/mobile')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>
            
            <NavGroup label="ESG & Lifecycle" icon={Leaf} collapsed={collapsed && !sidebarOpen} paths={['/sustainability', '/energy', '/waste', '/utility-bills']}>
              <NavItem icon={Wind} label="ESG Metrics" path="/sustainability" active={isActive('/sustainability')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Zap} label="Energy Grid" path="/energy" active={isActive('/energy')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Trash2} label="Waste Lifecycle" path="/waste" active={isActive('/waste')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Receipt} label="Utility Audit" path="/utility-bills" active={isActive('/utility-bills')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <NavGroup label="System Control" icon={Settings} collapsed={collapsed && !sidebarOpen} paths={['/admin', '/ehs', '/compliance', '/documents', '/support', '/cad-viewer']}>
              <NavItem icon={Shield} label="Governance" path="/admin" active={isActive('/admin')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={HardHat} label="EHS Protocol" path="/ehs" active={isActive('/ehs')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Scroll} label="Compliance" path="/compliance" active={isActive('/compliance')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FolderArchive} label="Data Archive" path="/documents" active={isActive('/documents')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={Presentation} label="CAD Visualizer" path="/cad-viewer" active={isActive('/cad-viewer')} collapsed={collapsed && !sidebarOpen} />
              <NavItem icon={FileQuestion} label="Command Support" path="/support" active={isActive('/support')} collapsed={collapsed && !sidebarOpen} />
            </NavGroup>

            <div className="mt-8 mb-4 border-t border-[#1F1F23] pt-6 px-1">
              <div className="px-3 mb-2 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">REMIS Command System</span>
                <Landmark size={10} className="text-blue-500" />
              </div>
              
              <NavGroup label="Strategic Inventory" icon={Database} collapsed={collapsed && !sidebarOpen} paths={['/usace/dashboard', '/usace/inventory', '/usace/gis']}>
                <NavItem icon={LayoutDashboard} label="Command Terminal" path="/usace/dashboard" active={isActive('/usace/dashboard')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Package} label="Asset Registry" path="/usace/inventory" active={isActive('/usace/inventory')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={MapPinned} label="Geospatial Hub" path="/usace/gis" active={isActive('/usace/gis')} collapsed={collapsed && !sidebarOpen} />
              </NavGroup>

              <NavGroup label="Transaction Pipeline" icon={ArrowRightLeft} collapsed={collapsed && !sidebarOpen} paths={['/usace/acquisitions', '/usace/disposals', '/usace/outgrants', '/usace/appraisals', '/usace/legal', '/usace/solicitations']}>
                <NavItem icon={LandPlot} label="Acquisitions" path="/usace/acquisitions" active={isActive('/usace/acquisitions')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Trash2} label="Divestiture / Disposal" path="/usace/disposals" active={isActive('/usace/disposals')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Scroll} label="Out-Grant Terminal" path="/usace/outgrants" active={isActive('/usace/outgrants')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Coins} label="Valuation Registry" path="/usace/appraisals" active={isActive('/usace/appraisals')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Scale} label="Legal & Title" path="/usace/legal" active={isActive('/usace/legal')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={FileSearch} label="Solicitations" path="/usace/solicitations" active={isActive('/usace/solicitations')} collapsed={collapsed && !sidebarOpen} />
              </NavGroup>

              <NavGroup label="Mission Finance" icon={Banknote} collapsed={collapsed && !sidebarOpen} paths={['/usace/finance', '/usace/budgeting', '/usace/ppbe-funds', '/usace/capital-planning', '/usace/invoicing', '/usace/procurement', '/usace/cost-share']}>
                <NavItem icon={FileClock} label="Fiscal Overview" path="/usace/finance" active={isActive('/usace/finance')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={PieChart} label="Budget Tracking" path="/usace/budgeting" active={isActive('/usace/budgeting')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Layers} label="PPBE Ledger" path="/usace/ppbe-funds" active={isActive('/usace/ppbe-funds')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={GanttChart} label="Capital Allocation" path="/usace/capital-planning" active={isActive('/usace/capital-planning')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Receipt} label="Expenditures" path="/usace/invoicing" active={isActive('/usace/invoicing')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={ShoppingCart} label="Procurement Hub" path="/usace/procurement" active={isActive('/usace/procurement')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Share2} label="Cost Sharing" path="/usace/cost-share" active={isActive('/usace/cost-share')} collapsed={collapsed && !sidebarOpen} />
              </NavGroup>

              <NavGroup label="Compliance & Logic" icon={ShieldCheck} collapsed={collapsed && !sidebarOpen} paths={['/usace/environmental', '/usace/encroachments', '/usace/permits', '/usace/mobilization', '/usace/relocation']}>
                <NavItem icon={Leaf} label="Environmental Readiness" path="/usace/environmental" active={isActive('/usace/environmental')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={AlertTriangle} label="Encroachment Vector" path="/usace/encroachments" active={isActive('/usace/encroachments')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={FileBadge} label="Permits & Grants" path="/usace/permits" active={isActive('/usace/permits')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Shuffle} label="Mobilization Protocol" path="/usace/mobilization" active={isActive('/usace/mobilization')} collapsed={collapsed && !sidebarOpen} />
                <NavItem icon={Move} label="Relocation Logistics" path="/usace/relocation" active={isActive('/usace/relocation')} collapsed={collapsed && !sidebarOpen} />
              </NavGroup>
            </div>
          </nav>
        </div>

        <div className="p-3 border-t border-[#1F1F23] bg-[#0A0A0B] shrink-0 pb-safe">
          <button 
            onClick={() => {
              onAiToggle();
              setSidebarOpen(false);
            }}
            className="w-full bg-[#1A1A1E] hover:bg-[#252529] border border-[#2F2F33] text-white rounded p-1.5 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Bot size={14} className="text-blue-500" />
            {(!collapsed || sidebarOpen) && <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Nexus AI</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Header */}
        <header className="h-14 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 md:px-6 z-40 shrink-0 pt-safe sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-500 hover:text-slate-900 p-2 -ml-2 rounded-full">
              <Menu size={20} />
            </button>
            <div className="md:w-80 hidden md:block group">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder="Global Command Search..." 
                  className="w-full pl-9 pr-4 py-1.5 border border-slate-200/60 rounded bg-slate-50 text-[12px] font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400/10 transition-all placeholder:text-slate-400" 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">System Live</span>
            </div>
            
            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

            <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-slate-400 hover:text-slate-900 transition-colors p-1">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-2 sm:pl-4">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none">Dr. Vance</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Admin</div>
              </div>
              <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                <UserCircle size={24} className="text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        {showNotifications && (
          <>
            <div className="fixed inset-0 z-50" onClick={() => setShowNotifications(false)}></div>
            <div className="absolute top-16 right-4 sm:right-6 w-[80vw] sm:w-[320px] bg-white rounded-lg shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-slate-200 z-[60] animate-fade-in-down overflow-hidden">
              <div className="p-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Feed</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600"><X size={14}/></button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`p-4 border-b border-slate-100 text-xs flex gap-3 hover:bg-slate-50 transition-colors ${!n.isRead ? 'bg-blue-50/20' : ''}`}>
                    <div className="mt-1">
                       <Info size={14} className={!n.isRead ? 'text-blue-500' : 'text-slate-400'} />
                    </div>
                    <div>
                      <p className="text-slate-900 leading-normal" dangerouslySetInnerHTML={{ __html: n.message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold tabular-nums">$1</strong>') }} />
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-1.5">{n.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2.5 bg-slate-50/50 border-t border-slate-100">
                <button className="w-full text-center py-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:bg-white rounded transition-colors">View All Logs</button>
              </div>
            </div>
          </>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-12 lg:p-16 bg-[#FBFBFB] scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
};
