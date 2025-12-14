import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { RealEstate } from './pages/RealEstate';
import { Operations } from './pages/Operations';
import { Space } from './pages/Space';
import { Sustainability } from './pages/Sustainability';
import { CapitalProjects } from './pages/CapitalProjects';
import { Admin } from './pages/Admin';
import { Financials } from './pages/Financials';
import { People } from './pages/People';
import { Analytics } from './pages/Analytics';
import { AiDrawer } from './components/AiDrawer';
import { AssetRegistry } from './pages/AssetRegistry';
import { VendorManagement } from './pages/VendorManagement';
import { ContractManagement } from './pages/ContractManagement';
import { EHS } from './pages/EHS';

// Import new pages
import { DocumentCentral } from './pages/DocumentCentral';
import { Inventory } from './pages/Inventory';
import { PreventiveMaintenance } from './pages/PreventiveMaintenance';
import { Reservations } from './pages/Reservations';
import { VisitorManagement } from './pages/VisitorManagement';
import { Budgeting } from './pages/Budgeting';
import { ConditionAssessment } from './pages/ConditionAssessment';
import { Compliance } from './pages/Compliance';
import { Reporting } from './pages/Reporting';
import { MobileWorkforce } from './pages/MobileWorkforce';
import { GisMap } from './pages/GisMap';
import { Insurance } from './pages/Insurance';
import { UtilityBills } from './pages/UtilityBills';
import { Parking } from './pages/Parking';
import { KeyManagement } from './pages/KeyManagement';
import { EnergyDashboard } from './pages/EnergyDashboard';
import { WasteDashboard } from './pages/WasteDashboard';
import { CadViewer } from './pages/CadViewer';
import { SupportCenter } from './pages/SupportCenter';

import { 
  PROPERTIES, LEASES, WORK_ORDERS, ASSETS, SUSTAINABILITY_DATA, 
  CAPITAL_PROJECTS, VENDORS, EMPLOYEES, COST_CENTERS, INVENTORY,
  SAFETY_INCIDENTS, SERVICE_REQUESTS, CONTRACTS, TRANSACTIONS, MOVE_REQUESTS,
  // Import new mock data
  RESERVATIONS, VISITORS, COMPLIANCE_TASKS, INSURANCE_POLICIES, UTILITY_BILLS,
  PARKING_PERMITS, KEY_RECORDS, CONDITION_ASSESSMENTS, PM_SCHEDULES, DOCUMENTS
} from './services/mockData';

const App: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Aggregated context for AI to "see" the whole app state
  const appContextData = {
    properties: PROPERTIES,
    leases: LEASES,
    workOrders: WORK_ORDERS,
    assets: ASSETS,
    sustainability: SUSTAINABILITY_DATA,
    capitalProjects: CAPITAL_PROJECTS,
    vendors: VENDORS,
    employees: EMPLOYEES,
    costCenters: COST_CENTERS,
    inventory: INVENTORY,
    safetyIncidents: SAFETY_INCIDENTS,
    serviceRequests: SERVICE_REQUESTS,
    contracts: CONTRACTS,
    transactions: TRANSACTIONS,
    moveRequests: MOVE_REQUESTS,
    // Add new data to context
    reservations: RESERVATIONS,
    visitors: VISITORS,
    complianceTasks: COMPLIANCE_TASKS,
    insurancePolicies: INSURANCE_POLICIES,
    utilityBills: UTILITY_BILLS,
    parkingPermits: PARKING_PERMITS,
    keyRecords: KEY_RECORDS,
    conditionAssessments: CONDITION_ASSESSMENTS,
    preventiveMaintenanceSchedules: PM_SCHEDULES,
    documents: DOCUMENTS
  };

  return (
    <Router>
      <Layout onAiToggle={() => setIsAiOpen(true)}>
        <Routes>
          {/* Existing Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/contracts" element={<ContractManagement />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/assets" element={<AssetRegistry />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/space" element={<Space />} />
          <Route path="/people" element={<People />} />
          <Route path="/projects" element={<CapitalProjects />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ehs" element={<EHS />} />
          
          {/* New Routes */}
          <Route path="/documents" element={<DocumentCentral />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/preventive-maintenance" element={<PreventiveMaintenance />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/visitor-management" element={<VisitorManagement />} />
          <Route path="/budgeting" element={<Budgeting />} />
          <Route path="/condition-assessment" element={<ConditionAssessment />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/mobile" element={<MobileWorkforce />} />
          <Route path="/gis-map" element={<GisMap />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/utility-bills" element={<UtilityBills />} />
          <Route path="/parking" element={<Parking />} />
          <Route path="/key-management" element={<KeyManagement />} />
          <Route path="/energy" element={<EnergyDashboard />} />
          <Route path="/waste" element={<WasteDashboard />} />
          <Route path="/cad-viewer" element={<CadViewer />} />
          <Route path="/support" element={<SupportCenter />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Global AI Drawer */}
        <AiDrawer 
          isOpen={isAiOpen} 
          onClose={() => setIsAiOpen(false)} 
          contextData={appContextData} 
        />
      </Layout>
    </Router>
  );
};

export default App;
