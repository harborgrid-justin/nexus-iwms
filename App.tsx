import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AiDrawer } from './components/AiDrawer';
import { Loading } from './components/Loading';
import { ErrorPage } from './pages/ErrorPage';

// Mock Data for AI Context
import { 
  PROPERTIES, WORK_ORDERS, CAPITAL_PROJECTS, LEASES, 
  VENDORS, ASSETS, USACE_ASSETS, USACE_ACQUISITIONS 
} from './services/mockData';

// --- Lazy Load All Page Components for Code Splitting ---
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const RealEstate = React.lazy(() => import('./pages/RealEstate').then(module => ({ default: module.RealEstate })));
const Operations = React.lazy(() => import('./pages/Operations').then(module => ({ default: module.Operations })));
const CapitalProjects = React.lazy(() => import('./pages/CapitalProjects').then(module => ({ default: module.CapitalProjects })));
const Sustainability = React.lazy(() => import('./pages/Sustainability').then(module => ({ default: module.Sustainability })));
const Admin = React.lazy(() => import('./pages/Admin').then(module => ({ default: module.Admin })));
const AssetRegistry = React.lazy(() => import('./pages/AssetRegistry').then(module => ({ default: module.AssetRegistry })));
const VendorManagement = React.lazy(() => import('./pages/VendorManagement').then(module => ({ default: module.VendorManagement })));
const ContractManagement = React.lazy(() => import('./pages/ContractManagement').then(module => ({ default: module.ContractManagement })));
const EHS = React.lazy(() => import('./pages/EHS').then(module => ({ default: module.EHS })));
const Space = React.lazy(() => import('./pages/Space').then(module => ({ default: module.Space })));
const Financials = React.lazy(() => import('./pages/Financials').then(module => ({ default: module.Financials })));
const Budgeting = React.lazy(() => import('./pages/Budgeting').then(module => ({ default: module.Budgeting })));
const PpbeFunds = React.lazy(() => import('./pages/PpbeFunds').then(module => ({ default: module.PpbeFunds })));
const CapitalPlanning = React.lazy(() => import('./pages/CapitalPlanning').then(module => ({ default: module.CapitalPlanning })));
const Invoicing = React.lazy(() => import('./pages/Invoicing').then(module => ({ default: module.Invoicing })));
const Chargebacks = React.lazy(() => import('./pages/Chargebacks').then(module => ({ default: module.Chargebacks })));
const Procurement = React.lazy(() => import('./pages/Procurement').then(module => ({ default: module.Procurement })));
const StrategicPortfolio = React.lazy(() => import('./pages/StrategicPortfolio').then(module => ({ default: module.StrategicPortfolio })));
const Analytics = React.lazy(() => import('./pages/Analytics').then(module => ({ default: module.Analytics })));
const Reporting = React.lazy(() => import('./pages/Reporting').then(module => ({ default: module.Reporting })));
const ConditionAssessment = React.lazy(() => import('./pages/ConditionAssessment').then(module => ({ default: module.ConditionAssessment })));
const PreventiveMaintenance = React.lazy(() => import('./pages/PreventiveMaintenance').then(module => ({ default: module.PreventiveMaintenance })));
const Inventory = React.lazy(() => import('./pages/Inventory').then(module => ({ default: module.Inventory })));
const KeyManagement = React.lazy(() => import('./pages/KeyManagement').then(module => ({ default: module.KeyManagement })));
const LeaseAdmin = React.lazy(() => import('./pages/LeaseAdmin').then(module => ({ default: module.LeaseAdmin })));
const Insurance = React.lazy(() => import('./pages/Insurance').then(module => ({ default: module.Insurance })));
const GisMap = React.lazy(() => import('./pages/GisMap').then(module => ({ default: module.GisMap })));
const People = React.lazy(() => import('./pages/People').then(module => ({ default: module.People })));
const Reservations = React.lazy(() => import('./pages/Reservations').then(module => ({ default: module.Reservations })));
const VisitorManagement = React.lazy(() => import('./pages/VisitorManagement').then(module => ({ default: module.VisitorManagement })));
const Parking = React.lazy(() => import('./pages/Parking').then(module => ({ default: module.Parking })));
const EnergyDashboard = React.lazy(() => import('./pages/EnergyDashboard').then(module => ({ default: module.EnergyDashboard })));
const WasteDashboard = React.lazy(() => import('./pages/WasteDashboard').then(module => ({ default: module.WasteDashboard })));
const UtilityBills = React.lazy(() => import('./pages/UtilityBills').then(module => ({ default: module.UtilityBills })));
const DocumentCentral = React.lazy(() => import('./pages/DocumentCentral').then(module => ({ default: module.DocumentCentral })));
const CadViewer = React.lazy(() => import('./pages/CadViewer').then(module => ({ default: module.CadViewer })));
const MobileWorkforce = React.lazy(() => import('./pages/MobileWorkforce').then(module => ({ default: module.MobileWorkforce })));
const SupportCenter = React.lazy(() => import('./pages/SupportCenter').then(module => ({ default: module.SupportCenter })));
const Compliance = React.lazy(() => import('./pages/Compliance').then(module => ({ default: module.Compliance })));

// USACE Pages
const RemisDashboard = React.lazy(() => import('./pages/usace/RemisDashboard').then(module => ({ default: module.RemisDashboard })));
const RemisInventory = React.lazy(() => import('./pages/usace/RemisInventory').then(module => ({ default: module.RemisInventory })));
const RemisAssetDetail = React.lazy(() => import('./pages/usace/RemisAssetDetail').then(module => ({ default: module.RemisAssetDetail })));
const RemisAcquisitions = React.lazy(() => import('./pages/usace/RemisAcquisitions').then(module => ({ default: module.RemisAcquisitions })));
const RemisAcquisitionDetail = React.lazy(() => import('./pages/usace/RemisAcquisitionDetail').then(module => ({ default: module.RemisAcquisitionDetail })));
const RemisDisposals = React.lazy(() => import('./pages/usace/RemisDisposals').then(module => ({ default: module.RemisDisposals })));
const RemisDisposalDetail = React.lazy(() => import('./pages/usace/RemisDisposalDetail').then(module => ({ default: module.RemisDisposalDetail })));
const RemisOutgrants = React.lazy(() => import('./pages/usace/RemisOutgrants').then(module => ({ default: module.RemisOutgrants })));
const RemisOutgrantDetail = React.lazy(() => import('./pages/usace/RemisOutgrantDetail').then(module => ({ default: module.RemisOutgrantDetail })));
const RemisAppraisals = React.lazy(() => import('./pages/usace/RemisAppraisals').then(module => ({ default: module.RemisAppraisals })));
const RemisAppraisalDetail = React.lazy(() => import('./pages/usace/RemisAppraisalDetail').then(module => ({ default: module.RemisAppraisalDetail })));
const RemisGisHub = React.lazy(() => import('./pages/usace/RemisGisHub').then(module => ({ default: module.RemisGisHub })));
const RemisLeaseAdmin = React.lazy(() => import('./pages/usace/RemisLeaseAdmin').then(module => ({ default: module.RemisLeaseAdmin })));
const RemisContracts = React.lazy(() => import('./pages/usace/RemisContracts').then(module => ({ default: module.RemisContracts })));
const RemisInsurance = React.lazy(() => import('./pages/usace/RemisInsurance').then(module => ({ default: module.RemisInsurance })));
const RemisFinanceOverview = React.lazy(() => import('./pages/usace/RemisFinanceOverview').then(module => ({ default: module.RemisFinanceOverview })));
const RemisBudgeting = React.lazy(() => import('./pages/usace/RemisBudgeting').then(module => ({ default: module.RemisBudgeting })));
const RemisPpbeFunds = React.lazy(() => import('./pages/usace/RemisPpbeFunds').then(module => ({ default: module.RemisPpbeFunds })));
const RemisCapitalPlanning = React.lazy(() => import('./pages/usace/RemisCapitalPlanning').then(module => ({ default: module.RemisCapitalPlanning })));
const RemisInvoicing = React.lazy(() => import('./pages/usace/RemisInvoicing').then(module => ({ default: module.RemisInvoicing })));
const RemisProcurement = React.lazy(() => import('./pages/usace/RemisProcurement').then(module => ({ default: module.RemisProcurement })));
const RemisEnvironmental = React.lazy(() => import('./pages/usace/RemisEnvironmental').then(module => ({ default: module.RemisEnvironmental })));
const RemisEnvironmentalDetail = React.lazy(() => import('./pages/usace/RemisEnvironmentalDetail').then(module => ({ default: module.RemisEnvironmentalDetail })));
const RemisLegal = React.lazy(() => import('./pages/usace/RemisLegal').then(module => ({ default: module.RemisLegal })));
const RemisLegalDetail = React.lazy(() => import('./pages/usace/RemisLegalDetail').then(module => ({ default: module.RemisLegalDetail })));
const RemisCostShare = React.lazy(() => import('./pages/usace/RemisCostShare').then(module => ({ default: module.RemisCostShare })));
const RemisCostShareDetail = React.lazy(() => import('./pages/usace/RemisCostShareDetail').then(module => ({ default: module.RemisCostShareDetail })));
const RemisPermits = React.lazy(() => import('./pages/usace/RemisPermits').then(module => ({ default: module.RemisPermits })));
const RemisPermitDetail = React.lazy(() => import('./pages/usace/RemisPermitDetail').then(module => ({ default: module.RemisPermitDetail })));
const RemisMobilization = React.lazy(() => import('./pages/usace/RemisMobilization').then(module => ({ default: module.RemisMobilization })));
const RemisMobilizationDetail = React.lazy(() => import('./pages/usace/RemisMobilizationDetail').then(module => ({ default: module.RemisMobilizationDetail })));
const RemisRelocation = React.lazy(() => import('./pages/usace/RemisRelocation').then(module => ({ default: module.RemisRelocation })));
const RemisRelocationDetail = React.lazy(() => import('./pages/usace/RemisRelocationDetail').then(module => ({ default: module.RemisRelocationDetail })));
const RemisSolicitations = React.lazy(() => import('./pages/usace/RemisSolicitations').then(module => ({ default: module.RemisSolicitations })));
const RemisSolicitationDetail = React.lazy(() => import('./pages/usace/RemisSolicitationDetail').then(module => ({ default: module.RemisSolicitationDetail })));
const RemisEncroachments = React.lazy(() => import('./pages/usace/RemisEncroachments').then(module => ({ default: module.RemisEncroachments })));
const RemisEncroachmentDetail = React.lazy(() => import('./pages/usace/RemisEncroachmentDetail').then(module => ({ default: module.RemisEncroachmentDetail })));


const NotFound = React.lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));

// --- Root Layout Component ---
// This component manages the shared state (like the AI drawer) and renders the main layout.
// The <Outlet/> from react-router-dom will render the matched child route.
const RootLayout = () => {
  const [aiDrawerOpen, setAiDrawerOpen] = React.useState(false);

  const aiContext = {
    properties: PROPERTIES,
    workOrders: WORK_ORDERS,
    projects: CAPITAL_PROJECTS,
    leases: LEASES,
    vendors: VENDORS,
    assets: ASSETS,
    usace_inventory: USACE_ASSETS,
    usace_acquisitions: USACE_ACQUISITIONS
  };

  return (
    <>
      <Layout onAiToggle={() => setAiDrawerOpen(true)}>
        <React.Suspense fallback={<Loading />}>
          <Outlet />
        </React.Suspense>
      </Layout>
      <AiDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} contextData={aiContext} />
    </>
  );
};

// --- Centralized Router Configuration ---
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'real-estate', element: <RealEstate /> },
      { path: 'lease-admin', element: <LeaseAdmin /> },
      { path: 'operations', element: <Operations /> },
      { path: 'projects', element: <CapitalProjects /> },
      { path: 'sustainability', element: <Sustainability /> },
      { path: 'admin', element: <Admin /> },
      { path: 'assets', element: <AssetRegistry /> },
      { path: 'vendors', element: <VendorManagement /> },
      { path: 'contracts', element: <ContractManagement /> },
      { path: 'ehs', element: <EHS /> },
      { path: 'space', element: <Space /> },
      { path: 'financials', element: <Financials /> },
      { path: 'budgeting', element: <Budgeting /> },
      { path: 'ppbe-funds', element: <PpbeFunds /> },
      { path: 'capital-planning', element: <CapitalPlanning /> },
      { path: 'invoicing', element: <Invoicing /> },
      { path: 'chargebacks', element: <Chargebacks /> },
      { path: 'procurement', element: <Procurement /> },
      { path: 'strategic-portfolio', element: <StrategicPortfolio /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'reporting', element: <Reporting /> },
      { path: 'condition-assessment', element: <ConditionAssessment /> },
      { path: 'preventive-maintenance', element: <PreventiveMaintenance /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'key-management', element: <KeyManagement /> },
      { path: 'insurance', element: <Insurance /> },
      { path: 'gis-map', element: <GisMap /> },
      { path: 'people', element: <People /> },
      { path: 'reservations', element: <Reservations /> },
      { path: 'visitor-management', element: <VisitorManagement /> },
      { path: 'parking', element: <Parking /> },
      { path: 'energy', element: <EnergyDashboard /> },
      { path: 'waste', element: <WasteDashboard /> },
      { path: 'utility-bills', element: <UtilityBills /> },
      { path: 'documents', element: <DocumentCentral /> },
      { path: 'cad-viewer', element: <CadViewer /> },
      { path: 'mobile', element: <MobileWorkforce /> },
      { path: 'support', element: <SupportCenter /> },
      { path: 'compliance', element: <Compliance /> },

      // USACE Routes
      { path: 'usace/dashboard', element: <RemisDashboard /> },
      { path: 'usace/inventory', element: <RemisInventory /> },
      { path: 'usace/inventory/:assetId', element: <RemisAssetDetail /> },
      { path: 'usace/acquisitions', element: <RemisAcquisitions /> },
      { path: 'usace/acquisitions/:acquisitionId', element: <RemisAcquisitionDetail /> },
      { path: 'usace/disposals', element: <RemisDisposals /> },
      { path: 'usace/disposals/:disposalId', element: <RemisDisposalDetail /> },
      { path: 'usace/outgrants', element: <RemisOutgrants /> },
      { path: 'usace/outgrants/:outgrantId', element: <RemisOutgrantDetail /> },
      { path: 'usace/appraisals', element: <RemisAppraisals /> },
      { path: 'usace/appraisals/:appraisalId', element: <RemisAppraisalDetail /> },
      { path: 'usace/gis', element: <RemisGisHub /> },
      { path: 'usace/leases', element: <RemisLeaseAdmin /> },
      { path: 'usace/contracts', element: <RemisContracts /> },
      { path: 'usace/insurance', element: <RemisInsurance /> },
      { path: 'usace/finance', element: <RemisFinanceOverview /> },
      { path: 'usace/budgeting', element: <RemisBudgeting /> },
      { path: 'usace/ppbe', element: <RemisPpbeFunds /> },
      { path: 'usace/capital-planning', element: <RemisCapitalPlanning /> },
      { path: 'usace/invoicing', element: <RemisInvoicing /> },
      { path: 'usace/procurement', element: <RemisProcurement /> },
      { path: 'usace/environmental', element: <RemisEnvironmental /> },
      { path: 'usace/environmental/:siteId', element: <RemisEnvironmentalDetail /> },
      { path: 'usace/legal', element: <RemisLegal /> },
      { path: 'usace/legal/:claimId', element: <RemisLegalDetail /> },
      { path: 'usace/cost-share', element: <RemisCostShare /> },
      { path: 'usace/cost-share/:agreementId', element: <RemisCostShareDetail /> },
      { path: 'usace/permits', element: <RemisPermits /> },
      { path: 'usace/permits/:permitId', element: <RemisPermitDetail /> },
      { path: 'usace/mobilization', element: <RemisMobilization /> },
      { path: 'usace/mobilization/:profileId', element: <RemisMobilizationDetail /> },
      { path: 'usace/relocation', element: <RemisRelocation /> },
      { path: 'usace/relocation/:relocationId', element: <RemisRelocationDetail /> },
      { path: 'usace/solicitations', element: <RemisSolicitations /> },
      { path: 'usace/solicitations/:solicitationId', element: <RemisSolicitationDetail /> },
      { path: 'usace/encroachments', element: <RemisEncroachments /> },
      { path: 'usace/encroachments/:caseId', element: <RemisEncroachmentDetail /> },
      { path: '*', element: <NotFound /> },
    ]
  }
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
