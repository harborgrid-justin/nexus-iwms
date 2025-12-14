import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AiDrawer } from './components/AiDrawer';
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
import { AssetRegistry } from './pages/AssetRegistry';
import { VendorManagement } from './pages/VendorManagement';
import { ContractManagement } from './pages/ContractManagement';
import { EHS } from './pages/EHS';
import { Budgeting } from './pages/Budgeting';
import { CadViewer } from './pages/CadViewer';
import { Compliance } from './pages/Compliance';
import { ConditionAssessment } from './pages/ConditionAssessment';
import { DocumentCentral } from './pages/DocumentCentral';
import { EnergyDashboard } from './pages/EnergyDashboard';
import { GisMap } from './pages/GisMap';
import { Insurance } from './pages/Insurance';
import { Inventory } from './pages/Inventory';
import { KeyManagement } from './pages/KeyManagement';
import { MobileWorkforce } from './pages/MobileWorkforce';
import { Parking } from './pages/Parking';
import { PreventiveMaintenance } from './pages/PreventiveMaintenance';
import { Reporting } from './pages/Reporting';
import { Reservations } from './pages/Reservations';
import { SupportCenter } from './pages/SupportCenter';
import { UtilityBills } from './pages/UtilityBills';
import { VisitorManagement } from './pages/VisitorManagement';
import { WasteDashboard } from './pages/WasteDashboard';
import { PpbeFunds } from './pages/PpbeFunds';
import { CapitalPlanning } from './pages/CapitalPlanning';
import { Invoicing } from './pages/Invoicing';
import { Procurement } from './pages/Procurement';
import { Chargebacks } from './pages/Chargebacks';
import { StrategicPortfolio } from './pages/StrategicPortfolio';
import { LeaseAdmin } from './pages/LeaseAdmin';

// USACE REMIS
import { RemisDashboard } from './pages/usace/RemisDashboard';
import { RemisInventory } from './pages/usace/RemisInventory';
import { RemisAssetDetail } from './pages/usace/RemisAssetDetail';
import { RemisAcquisitions } from './pages/usace/RemisAcquisitions';
import { RemisAcquisitionDetail } from './pages/usace/RemisAcquisitionDetail';
import { RemisDisposals } from './pages/usace/RemisDisposals';
import { RemisDisposalDetail } from './pages/usace/RemisDisposalDetail';
import { RemisLinkages } from './pages/usace/RemisLinkages';
import { RemisLinkageDetail } from './pages/usace/RemisLinkageDetail';
import { RemisOutgrants } from './pages/usace/RemisOutgrants';
import { RemisOutgrantDetail } from './pages/usace/RemisOutgrantDetail';
import { RemisAppraisals } from './pages/usace/RemisAppraisals';
import { RemisAppraisalDetail } from './pages/usace/RemisAppraisalDetail';
import { RemisGisHub } from './pages/usace/RemisGisHub';
import { RemisEnvironmental } from './pages/usace/RemisEnvironmental';
import { RemisEnvironmentalDetail } from './pages/usace/RemisEnvironmentalDetail';
import { RemisLegal } from './pages/usace/RemisLegal';
import { RemisLegalDetail } from './pages/usace/RemisLegalDetail';
import { RemisCostShare } from './pages/usace/RemisCostShare';
import { RemisCostShareDetail } from './pages/usace/RemisCostShareDetail';
import { RemisPermits } from './pages/usace/RemisPermits';
import { RemisPermitDetail } from './pages/usace/RemisPermitDetail';
import { RemisMobilization } from './pages/usace/RemisMobilization';
import { RemisMobilizationDetail } from './pages/usace/RemisMobilizationDetail';
import { RemisRelocation } from './pages/usace/RemisRelocation';
import { RemisRelocationDetail } from './pages/usace/RemisRelocationDetail';
import { RemisSolicitations } from './pages/usace/RemisSolicitations';
import { RemisSolicitationDetail } from './pages/usace/RemisSolicitationDetail';
import { RemisEncroachments } from './pages/usace/RemisEncroachments';
import { RemisEncroachmentDetail } from './pages/usace/RemisEncroachmentDetail';

// USACE RFMIS
import { RfmisDashboard } from './pages/usace/rfmis/RfmisDashboard';
import { RfmisInventory } from './pages/usace/rfmis/RfmisInventory';
import { RfmisFacilityDetail } from './pages/usace/rfmis/RfmisFacilityDetail';

import * as contextData from './services/mockData';

export const App = () => {
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <Router>
      <Layout onAiToggle={() => setAiOpen(!aiOpen)}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/lease-admin" element={<LeaseAdmin />} />
          <Route path="/contracts" element={<ContractManagement />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/gis-map" element={<GisMap />} />
          
          <Route path="/financials" element={<Financials />} />
          <Route path="/budgeting" element={<Budgeting />} />
          <Route path="/ppbe-funds" element={<PpbeFunds />} />
          <Route path="/capital-planning" element={<CapitalPlanning />} />
          <Route path="/invoicing" element={<Invoicing />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/chargebacks" element={<Chargebacks />} />

          <Route path="/projects" element={<CapitalProjects />} />
          <Route path="/strategic-portfolio" element={<StrategicPortfolio />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/condition-assessment" element={<ConditionAssessment />} />

          <Route path="/operations" element={<Operations />} />
          <Route path="/assets" element={<AssetRegistry />} />
          <Route path="/preventive-maintenance" element={<PreventiveMaintenance />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/key-management" element={<KeyManagement />} />

          <Route path="/space" element={<Space />} />
          <Route path="/people" element={<People />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/visitor-management" element={<VisitorManagement />} />
          <Route path="/parking" element={<Parking />} />

          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/energy" element={<EnergyDashboard />} />
          <Route path="/waste" element={<WasteDashboard />} />
          <Route path="/utility-bills" element={<UtilityBills />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/ehs" element={<EHS />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/documents" element={<DocumentCentral />} />
          <Route path="/cad-viewer" element={<CadViewer />} />
          <Route path="/mobile" element={<MobileWorkforce />} />
          <Route path="/support" element={<SupportCenter />} />

          {/* USACE REMIS Routes */}
          <Route path="/usace/dashboard" element={<RemisDashboard />} />
          <Route path="/usace/inventory" element={<RemisInventory />} />
          <Route path="/usace/inventory/:assetId" element={<RemisAssetDetail />} />
          <Route path="/usace/acquisitions" element={<RemisAcquisitions />} />
          <Route path="/usace/acquisitions/:acquisitionId" element={<RemisAcquisitionDetail />} />
          <Route path="/usace/disposals" element={<RemisDisposals />} />
          <Route path="/usace/disposals/:disposalId" element={<RemisDisposalDetail />} />
          <Route path="/usace/linkages" element={<RemisLinkages />} />
          <Route path="/usace/linkages/:linkageId" element={<RemisLinkageDetail />} />
          <Route path="/usace/outgrants" element={<RemisOutgrants />} />
          <Route path="/usace/outgrants/:outgrantId" element={<RemisOutgrantDetail />} />
          <Route path="/usace/appraisals" element={<RemisAppraisals />} />
          <Route path="/usace/appraisals/:appraisalId" element={<RemisAppraisalDetail />} />
          <Route path="/usace/gis" element={<RemisGisHub />} />
          <Route path="/usace/environmental" element={<RemisEnvironmental />} />
          <Route path="/usace/environmental/:siteId" element={<RemisEnvironmentalDetail />} />
          <Route path="/usace/legal" element={<RemisLegal />} />
          <Route path="/usace/legal/:claimId" element={<RemisLegalDetail />} />
          <Route path="/usace/cost-share" element={<RemisCostShare />} />
          <Route path="/usace/cost-share/:agreementId" element={<RemisCostShareDetail />} />
          <Route path="/usace/permits" element={<RemisPermits />} />
          <Route path="/usace/permits/:permitId" element={<RemisPermitDetail />} />
          <Route path="/usace/mobilization" element={<RemisMobilization />} />
          <Route path="/usace/mobilization/:profileId" element={<RemisMobilizationDetail />} />
          <Route path="/usace/relocation" element={<RemisRelocation />} />
          <Route path="/usace/relocation/:relocationId" element={<RemisRelocationDetail />} />
          <Route path="/usace/solicitations" element={<RemisSolicitations />} />
          <Route path="/usace/solicitations/:solicitationId" element={<RemisSolicitationDetail />} />
          <Route path="/usace/encroachments" element={<RemisEncroachments />} />
          <Route path="/usace/encroachments/:caseId" element={<RemisEncroachmentDetail />} />

          {/* USACE RFMIS Routes */}
          <Route path="/rfmis/dashboard" element={<RfmisDashboard />} />
          <Route path="/rfmis/inventory" element={<RfmisInventory />} />
          <Route path="/rfmis/inventory/:facilityId" element={<RfmisFacilityDetail />} />
          
          <Route path="/rfmis/leases" element={<div className="p-6">RFMIS Leases Placeholder</div>} />
          <Route path="/rfmis/projects" element={<div className="p-6">RFMIS Projects Placeholder</div>} />
          <Route path="/rfmis/map" element={<div className="p-6">RFMIS Map Placeholder</div>} />

        </Routes>
        <AiDrawer isOpen={aiOpen} onClose={() => setAiOpen(false)} contextData={contextData} />
      </Layout>
    </Router>
  );
};