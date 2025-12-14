
import {
  Status, Notification, Document, Property, Lease, LeaseClause, Contract, Transaction, MoveRequest, Workflow,
  Vendor, CostCenter, WorkOrder, InventoryItem, SafetyIncident, Asset, PreventiveMaintenanceSchedule, SpaceMetric,
  Employee, ServiceRequest, SustainabilityMetric, SustainabilityInitiative, BudgetLineItem, ProjectRisk, CapitalProject,
  ProjectMilestone, ChangeOrder, AuditLog, User, Reservation, Visitor, ComplianceTask, InsurancePolicy, UtilityBill,
  ParkingPermit, KeyRecord, ConditionAssessment, PpbeFund, FundTransaction, UnfundedRequirement, CapitalPlanItem,
  Invoice, PurchaseOrder, Chargeback, RealPropertyAsset, AssetComponent, UtilizationSummary, InspectionFinding,
  InspectionRecommendation, UtilizationInspection, OutGrant, Appraisal, AcquisitionRecord, DisposalRecord,
  RelocationBenefit, RelocationCase, EnvironmentalSite, BidItem, IfbResponse, Solicitation, LegalClaim,
  CostShareContribution, CostShareAgreement, EncroachmentCase, MobilizationProfile, PermitParty, PermitAddress,
  Permit, RealPropertyLinkage, RecruitingFacility, RecruitingLease, SRMProject, EncroachmentTask, WorkActivity,
  GeospatialFeature, GeospatialLayer
} from '../types';

// ... (Keep all existing mock data exports intact) ...
export const NOTIFICATIONS: Notification[] = [
  { id: '1', message: 'Work Order **WO-101** assigned to you.', type: 'task', timestamp: '10 mins ago', isRead: false },
  { id: '2', message: 'Lease **L-003** expires in 60 days.', type: 'alert', timestamp: '1 hour ago', isRead: false },
  { id: '3', message: 'Energy usage alert: Building B exceeded threshold.', type: 'warning', timestamp: '3 hours ago', isRead: true }
];

// ... (PROPERTIES through CHARGEBACKS remain unchanged) ...
export const PROPERTIES: Property[] = [
  { id: 'P001', name: 'Nexus Headquarters', address: '100 Enterprise Way', type: 'Office', sizeSqFt: 150000, occupancyRate: 85, status: Status.Good, marketValue: 45000000, imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80', noi: 3500000, fci: 85 },
  { id: 'P002', name: 'Innovation Lab', address: '25 Science Park', type: 'Lab', sizeSqFt: 50000, occupancyRate: 92, status: Status.Good, marketValue: 28000000, imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', noi: 2100000, fci: 90 },
  { id: 'P003', name: 'Distribution Center A', address: '8800 Industrial Blvd', type: 'Industrial', sizeSqFt: 200000, occupancyRate: 75, status: Status.Warning, marketValue: 32000000, imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80', noi: 2800000, fci: 72 }
];

export const LEASES: Lease[] = [
  { id: 'L-101', propertyId: 'P001', tenantName: 'Acme Corp', startDate: '2020-01-01', endDate: '2025-12-31', monthlyRent: 45000, status: 'Active', criticalDates: [{ name: 'Renewal Notice', date: '2025-06-30' }], camCharge: 5000 },
  { id: 'L-102', propertyId: 'P002', tenantName: 'BioTech Inc', startDate: '2018-05-01', endDate: '2024-04-30', monthlyRent: 28000, status: 'Expiring Soon', criticalDates: [{ name: 'Lease End', date: '2024-04-30' }], camCharge: 3500 }
];

export const LEASE_CLAUSES: LeaseClause[] = [
  { id: 'LC-01', leaseId: 'L-101', name: 'Renewal Option', details: 'Tenant has option to renew for 5 years at fair market value.' },
  { id: 'LC-02', leaseId: 'L-102', name: 'Termination Option', details: 'Termination allowed with 6 months notice and fee.' }
];

export const WORK_ORDERS: WorkOrder[] = [
  { id: 'WO-2024-889', title: 'HVAC Failure P001', propertyId: 'P001', priority: 'Emergency', status: 'In Progress', category: 'HVAC', assignedTo: 'Tech A', dueDate: '2024-06-15', cost: 1200, costCenterId: 'CC-01' },
  { id: 'WO-2024-890', title: 'Leaking Pipe', propertyId: 'P002', priority: 'High', status: 'Open', category: 'Plumbing', assignedTo: 'Tech B', dueDate: '2024-06-16', cost: 800, costCenterId: 'CC-02' },
  { id: 'WO-2024-891', title: 'Lighting Replacement', propertyId: 'P001', priority: 'Medium', status: 'Completed', category: 'Electrical', assignedTo: 'Tech A', dueDate: '2024-06-10', cost: 450, costCenterId: 'CC-01' }
];

export const CAPITAL_PROJECTS: CapitalProject[] = [
  { id: 'CP-01', name: 'HQ Renovation', propertyId: 'P001', type: 'Renovation', status: Status.OnTrack, startDate: '2023-01-15', endDate: '2024-08-30', totalBudget: 5000000, spent: 2500000, manager: 'PM-01', budgetItems: [ { id: 'BI-01', category: 'Construction', budgeted: 4000000, actual: 2100000, variance: 1900000 }, { id: 'BI-02', category: 'Design', budgeted: 500000, actual: 400000, variance: 100000 } ], milestones: [{ id: 'M-01', name: 'Design Complete', dueDate: '2023-03-30', status: 'Completed' }] },
  { id: 'CP-02', name: 'Roof Replacement', propertyId: 'P003', type: 'Major Repair', status: Status.AtRisk, startDate: '2023-06-01', endDate: '2023-12-31', totalBudget: 1200000, spent: 1350000, manager: 'PM-02', budgetItems: [ { id: 'BI-03', category: 'Construction', budgeted: 1000000, actual: 1200000, variance: -200000 } ] }
];

export const SUSTAINABILITY_DATA: SustainabilityMetric[] = [
  { month: 'Jan', energyKWh: 50000, waterGal: 12000, carbonTons: 15, wasteKg: 500, recyclingKg: 200 },
  { month: 'Feb', energyKWh: 48000, waterGal: 11500, carbonTons: 14.5, wasteKg: 480, recyclingKg: 210 },
  { month: 'Mar', energyKWh: 52000, waterGal: 12500, carbonTons: 15.5, wasteKg: 520, recyclingKg: 220 },
  { month: 'Apr', energyKWh: 49000, waterGal: 11800, carbonTons: 14.8, wasteKg: 490, recyclingKg: 230 },
  { month: 'May', energyKWh: 55000, waterGal: 13000, carbonTons: 16, wasteKg: 550, recyclingKg: 240 },
  { month: 'Jun', energyKWh: 58000, waterGal: 15500, carbonTons: 16.5, wasteKg: 600, recyclingKg: 250 }
];

export const SUSTAINABILITY_INITIATIVES: SustainabilityInitiative[] = [
  { id: 'SI-01', name: 'LED Retrofit Phase 2', type: 'Energy', status: 'In Progress', projectedSavings: '$12,000/yr', completionDate: '2024-09-01' },
  { id: 'SI-02', name: 'Low-Flow Fixtures', type: 'Water', status: 'Completed', projectedSavings: '$5,000/yr', completionDate: '2023-12-15' }
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'TR-01', propertyId: 'P004', type: 'Acquisition', stage: 'Due Diligence', dealValue: 15000000, closeDate: '2024-09-30', broker: 'CBRE' },
  { id: 'TR-02', propertyId: 'P005', type: 'Disposition', stage: 'Negotiation', dealValue: 8000000, closeDate: '2024-08-15', broker: 'JLL' }
];

export const SPACE_DATA: SpaceMetric[] = [
  { floor: 'L1', utilization: 75, department: 'Sales', seatsTotal: 100, seatsAvailable: 25 },
  { floor: 'L2', utilization: 92, department: 'Engineering', seatsTotal: 120, seatsAvailable: 10 }
];

export const MOVE_REQUESTS: MoveRequest[] = [
  { id: 'MR-01', employeeName: 'John Doe', fromLocation: 'L1-101', toLocation: 'L2-205', moveDate: '2024-06-20', status: 'Requested' },
  { id: 'MR-02', employeeName: 'Jane Smith', fromLocation: 'L1-102', toLocation: 'L2-206', moveDate: '2024-06-21', status: 'Approved' }
];

export const EMPLOYEES: Employee[] = [
  { id: 'E-001', name: 'Alice Johnson', title: 'Facilities Manager', department: 'Operations', email: 'alice@example.com', location: 'L1-100', phone: '555-0101', imageUrl: 'https://i.pravatar.cc/150?u=E-001' },
  { id: 'E-002', name: 'Bob Smith', title: 'Technician', department: 'Maintenance', email: 'bob@example.com', location: 'Shop', phone: '555-0102', imageUrl: 'https://i.pravatar.cc/150?u=E-002' }
];

export const PPBE_FUNDS: PpbeFund[] = [
  { id: 'F-2024', name: 'O&M FY24', appropriationType: 'O&M', fiscalYear: 2024, programElement: 'Facility Sustainment', totalAmount: 10000000, committed: 4000000, obligated: 3500000, expended: 2000000 }
];

export const FUND_TRANSACTIONS: FundTransaction[] = [
  { id: 'FT-01', fundId: 'F-2024', type: 'Obligation', amount: 50000, date: '2024-02-15', description: 'Contract Award', projectId: 'CP-01' }
];

export const USERS: User[] = [
  { id: 'U-01', name: 'Dr. Alistair Vance', email: 'alistair@nexus.com', role: 'Admin', lastLogin: '2024-06-12 09:00 AM' },
  { id: 'U-02', name: 'Sarah Connor', email: 'sarah@nexus.com', role: 'Facility Manager', lastLogin: '2024-06-11 02:30 PM' }
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'AL-01', user: 'Dr. Alistair Vance', action: 'Approved Invoice', entity: 'INV-1001', timestamp: '2024-06-12 10:00 AM' }
];

export const WORKFLOWS: Workflow[] = [
  { id: 'WF-01', name: 'High Priority WO Alert', trigger: 'Work Order Created (Priority=High)', actions: ['Email Facility Manager', 'Push Notification'], enabled: true }
];

export const COST_CENTERS: CostCenter[] = [
  { id: 'CC-01', name: 'Facility Operations', owner: 'E-001', budget: 500000, spent: 250000 },
  { id: 'CC-02', name: 'Maintenance', owner: 'E-002', budget: 300000, spent: 180000 }
];

export const SERVICE_REQUESTS: ServiceRequest[] = [
  { id: 'SR-01', submittedBy: 'E-003', type: 'Temperature', location: 'L2-ConfA', status: 'New', createdDate: '2024-06-12', details: 'Too cold' }
];

export const VENDORS: Vendor[] = [
  { id: 'V-01', name: 'Global HVAC', trade: 'HVAC', rating: 4.5, onTimeCompletionRate: 95, avgInvoiceCost: 1200 },
  { id: 'V-02', name: 'City Plumbing', trade: 'Plumbing', rating: 4.0, onTimeCompletionRate: 88, avgInvoiceCost: 800 }
];

export const ASSETS: Asset[] = [
  { id: 'A-001', name: 'Chiller Unit 1', serialNumber: 'CH-1001', purchaseDate: '2019-05-01', warrantyEnd: '2024-05-01', condition: 75, location: 'Roof', propertyId: 'P001', maintenanceCostYTD: 2500 },
  { id: 'A-002', name: 'Main Switchgear', serialNumber: 'SW-2002', purchaseDate: '2015-08-15', warrantyEnd: '2020-08-15', condition: 60, location: 'Basement', propertyId: 'P001', maintenanceCostYTD: 1200 }
];

export const CONDITION_ASSESSMENTS: ConditionAssessment[] = [
  { id: 'CA-01', assetId: 'A-001', assessmentDate: '2024-01-15', assessedBy: 'Inspector Gadget', conditionScore: 75, notes: 'Normal wear', recommendedAction: 'Continue PM' }
];

export const PM_SCHEDULES: PreventiveMaintenanceSchedule[] = [
  { id: 'PM-01', assetId: 'A-001', task: 'Quarterly Service', frequency: 'Quarterly', nextDueDate: '2024-07-01', status: 'Scheduled' }
];

export const CONTRACTS: Contract[] = [
  { id: 'C-001', name: 'HVAC Maintenance Agreement', vendorId: 'V-01', type: 'Service', startDate: '2024-01-01', endDate: '2024-12-31', value: 15000, status: 'Active', renewalDate: '2024-11-01', documentId: 'D-001' }
];

export const SAFETY_INCIDENTS: SafetyIncident[] = [
  { id: 'SI-001', propertyId: 'P001', type: 'Injury', date: '2024-03-10', severity: 'Medium', status: 'Closed', description: 'Slip and fall in lobby' }
];

export const DOCUMENTS: Document[] = [
  { id: 'D-001', name: 'HVAC Contract.pdf', type: 'Contract', url: '#', uploadedDate: '2023-12-15', size: '2.5 MB', relatedTo: 'C-001' },
  { id: 'D-002', name: 'L1 Floor Plan.dwg', type: 'CAD', url: '#', uploadedDate: '2023-01-10', size: '15 MB', relatedTo: 'P001' }
];

export const COMPLIANCE_TASKS: ComplianceTask[] = [
  { id: 'CT-01', name: 'Fire Alarm Test', type: 'Inspection', propertyId: 'P001', dueDate: '2024-06-30', status: 'Pending', assignedTo: 'V-03' }
];

export const INSURANCE_POLICIES: InsurancePolicy[] = [
  { id: 'IP-01', propertyId: 'P001', provider: 'SafeGuard', policyNumber: 'POL-12345', type: 'Property', coverageAmount: 50000000, premium: 120000, expiryDate: '2024-12-31' }
];

export const INVENTORY: InventoryItem[] = [
  { id: 'INV-01', name: 'Air Filter 20x20', sku: 'FIL-2020', stock: 50, reorderLevel: 20, location: 'Storage A', costPerUnit: 15 }
];

export const KEY_RECORDS: KeyRecord[] = [
  { id: 'K-01', keyNumber: 'K101', type: 'Physical Key', assignedTo: 'E-001', accesses: 'Master', issueDate: '2023-01-01' }
];

export const PARKING_PERMITS: ParkingPermit[] = [
  { id: 'PP-01', permitNumber: 'P-100', assignedTo: 'E-001', lot: 'Lot A', vehicle: 'Toyota Camry', expiryDate: '2024-12-31' }
];

export const RESERVATIONS: Reservation[] = [
  { id: 'RES-01', spaceId: 'S-101', spaceName: 'Conf Room A', reservedBy: 'E-004', date: '2024-06-15', startTime: '10:00', endTime: '11:00', status: 'Confirmed' }
];

export const UTILITY_BILLS: UtilityBill[] = [
  { id: 'UB-01', propertyId: 'P001', utility: 'Electric', serviceDate: '2024-05-01', cost: 4500, consumption: 30000, unit: 'kWh', documentId: 'D-005' }
];

export const VISITORS: Visitor[] = [
  { id: 'VIS-01', name: 'Guest User', company: 'Partner Corp', host: 'E-001', arrival: '2024-06-12T09:00:00', status: 'Checked In' }
];

export const UNFUNDED_REQUIREMENTS: UnfundedRequirement[] = [
  { id: 'UFR-01', title: 'Parking Lot Resurfacing', propertyId: 'P001', priority: 'Medium', estimatedCost: 75000, justification: 'Cracks appearing', submittedBy: 'E-001', status: 'Submitted' }
];

export const CAPITAL_PLAN: CapitalPlanItem[] = [
  { id: 'CPI-01', projectName: 'HQ Expansion', fiscalYear: 2026, projectedCost: 15000000, fundingStatus: 'Unfunded', priorityScore: 80 }
];

export const INVOICES: Invoice[] = [
  { id: 'INV-1001', vendorId: 'V-01', invoiceNumber: 'INV-999', invoiceDate: '2024-06-01', dueDate: '2024-07-01', amount: 1200, status: 'Submitted', workOrderId: 'WO-2024-889', documentId: 'D-006' }
];

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-5001', vendorId: 'V-02', orderDate: '2024-06-05', totalAmount: 500, status: 'Issued', items: [] }
];

export const CHARGEBACKS: Chargeback[] = [
  { id: 'CB-01', fromCostCenterId: 'CC-01', toCostCenterId: 'CC-02', amount: 1000, date: '2024-05-31', description: 'Shared Services', type: 'Service' }
];

// Requirement 19: RPUID Enhancements in Mock Data
export const USACE_ASSETS: RealPropertyAsset[] = [
  { 
    id: 'UA-01', 
    rpuid: '12345', 
    rpuidStatus: 'Active', 
    rpuidMetadata: { authority: 'DoDI 4165.14', generationMethod: 'Migrated', generationDate: '2000-01-01' },
    cefmsId: 'CEFMS-5501',
    cefmsSyncStatus: 'Synced',
    name: 'Building 101', 
    assetCategoryCode: '100', 
    type: 'Building', 
    status: 'Active', 
    location: 'Fort Belvoir', 
    acquisitionDate: '2000-01-01', 
    cost: 10000000, 
    area: 50000, 
    unit: 'SqFt', 
    program: 'Military', 
    mobilizationUse: true, 
    history: [], 
    components: [] 
  },
  { 
    id: 'UA-02', 
    rpuid: '67890', 
    rpuidStatus: 'Active',
    rpuidMetadata: { authority: 'DoDI 4165.14', generationMethod: 'System Generated', generationDate: '1995-06-15' },
    cefmsId: 'CEFMS-9982',
    cefmsSyncStatus: 'Synced',
    name: 'Levee Section A', 
    assetCategoryCode: '200', 
    type: 'Linear Structure', 
    status: 'Active', 
    location: 'New Orleans', 
    acquisitionDate: '1995-06-15', 
    cost: 5000000, 
    area: 10, 
    unit: 'Acres', 
    program: 'Civil Works', 
    mobilizationUse: false, 
    history: [], 
    components: [] 
  },
  { 
    id: 'UA-03', 
    rpuid: '11223', 
    rpuidStatus: 'Active',
    rpuidMetadata: { authority: 'DoDI 4165.14', generationMethod: 'Migrated', generationDate: '1980-01-01' },
    cefmsId: 'CEFMS-1122',
    cefmsSyncStatus: 'Synced',
    name: 'Training Land', 
    assetCategoryCode: '300', 
    type: 'Land', 
    status: 'Active', 
    location: 'Fort Hood', 
    acquisitionDate: '1980-01-01', 
    cost: 2000000, 
    area: 500, 
    unit: 'Acres', 
    program: 'Military', 
    mobilizationUse: true, 
    history: [], 
    components: [] 
  },
  { 
    id: 'UA-04', 
    rpuid: '44556', 
    rpuidStatus: 'Active',
    rpuidMetadata: { authority: 'DoDI 4165.14', generationMethod: 'Migrated', generationDate: '1970-01-01' },
    cefmsId: 'CEFMS-4455',
    cefmsSyncStatus: 'Pending',
    name: 'Dam Structure', 
    assetCategoryCode: '400', 
    type: 'Structure', 
    status: 'Active', 
    location: 'Portland', 
    acquisitionDate: '1970-01-01', 
    cost: 50000000, 
    area: 20, 
    unit: 'Acres', 
    program: 'Civil Works', 
    mobilizationUse: false, 
    history: [], 
    components: [] 
  }
];

// ... (Rest of file unchanged) ...
export const USACE_ACQUISITIONS: AcquisitionRecord[] = [
  { id: 'ACQ-01', assetId: 'UA-05', stage: 'Negotiation', cost: 1500000, fundingSource: 'MILCON', acquisitionMethod: 'Purchase', closeDate: '2024-12-01', authority: '10 USC 2663', purpose: 'Expansion', statutoryBasis: 'General Authority', interestType: 'Fee', estateAcquired: 'Fee Simple', responsibleOrg: 'USACE', appraisalIds: [], negotiationIds: [], approvalIds: [] },
  { id: 'ACQ-02', assetId: 'UA-06', stage: 'Appraisal', cost: 500000, fundingSource: 'O&M', acquisitionMethod: 'Purchase', closeDate: '2025-03-01', authority: '33 USC 591', purpose: 'Access Road', statutoryBasis: 'Civil Works', interestType: 'Easement', estateAcquired: 'Road Easement', responsibleOrg: 'USACE', appraisalIds: [], negotiationIds: [], approvalIds: [] }
];

export const USACE_OUTGRANTS: OutGrant[] = [
  { id: 'OG-01', assetId: 'UA-01', grantee: 'Telecom Corp', type: 'Lease', authority: '10 USC 2667', permittedUse: 'Antenna', startDate: '2020-01-01', endDate: '2025-01-01', revenue: 12000, lifecycleState: 'Active', status: 'Active', documentIds: [], history: [] },
  { id: 'OG-02', assetId: 'UA-02', grantee: 'Farmer John', type: 'License', authority: '10 USC 2667', permittedUse: 'Grazing', startDate: '2021-01-01', endDate: '2024-01-01', revenue: 500, lifecycleState: 'Expired', status: 'Expired', documentIds: [], history: [] }
];

export const USACE_DISPOSALS: DisposalRecord[] = [
  { id: 'DIS-01', assetId: 'UA-03', lifecycleState: 'Excess Determined', stage: 'Screening', initiatingOrg: 'DPW', disposalRationale: 'No longer needed', proposedMethod: 'Transfer', appraisalIds: [], environmentalSiteIds: [], legalClaimIds: [], documentIds: [], history: [], authorizationStatus: 'Not Started' }
];

export const USACE_INSPECTIONS: UtilizationInspection[] = [
  { id: 'INSP-01', assetId: 'UA-01', inspectionDate: '2023-11-15', scope: 'Annual', criteria: 'Standard', teamComposition: 'Eng, FM', responsibleOrg: 'DPW', type: 'Routine', inspector: 'John Smith', lifecycleState: 'Completed', status: 'Pass', findings: [], recommendations: [], history: [] },
  { id: 'INSP-02', outGrantId: 'OG-01', assetId: 'UA-01', inspectionDate: '2024-02-01', scope: 'Compliance', criteria: 'Lease Terms', teamComposition: 'Realty Spc', responsibleOrg: 'RE Div', type: 'Compliance', inspector: 'Jane Doe', lifecycleState: 'Scheduled', status: 'Pending', findings: [], recommendations: [], history: [] }
];

export const USACE_APPRAISALS: Appraisal[] = [
  { id: 'AP-01', assetId: 'UA-01', relatedActionId: 'ACQ-01', appraisalDate: '2024-01-10', appraisedValue: 12000000, appraiser: 'Valuations Inc', appraiserQualifications: 'Certified General', type: 'Market Value', purpose: 'Acquisition', scope: 'Full', assumptions: 'None', status: 'Approved', documentId: 'D-AP-01', history: [] }
];

export const USACE_ENVIRONMENTAL: EnvironmentalSite[] = [
  { id: 'ENV-01', assetId: 'UA-02', siteName: 'Site A Remediation', lifecycleState: 'Under Remediation', status: 'Active', initiatingOrg: 'Env Div', initiationDate: '2022-01-01', authority: 'CERCLA', programApplicability: ['CERCLA'], contaminants: ['Lead'], riskClassification: 'Medium', remediationActions: [], documentIds: [] }
];

export const USACE_CLAIMS: LegalClaim[] = [
  { id: 'CLM-01', assetId: 'UA-01', claimant: 'John Doe', claimantInfo: { name: 'John Doe' }, claimType: 'Tort', lifecycleState: 'Under Investigation', status: 'Open', incidentDate: '2024-04-01', filedDate: '2024-04-10', statutoryBasis: 'FTCA', jurisdiction: 'Federal', assignedOffice: 'Office of Counsel', responsibleOfficial: 'JAG', description: 'Slip and fall', claimAmount: 5000, documentIds: [], history: [] }
];

export const USACE_RELOCATION: RelocationCase[] = [
  { id: 'REL-01', acquisitionId: 'ACQ-01', assetId: 'UA-05', claimantName: 'Smith Family', claimantType: 'Residential Owner', displacementType: 'Physical', lifecycleState: 'Assistance Approved', status: 'Active', initiationDate: '2024-01-01', totalAssistance: 25000, totalBenefitsPaid: 10000, benefits: [], history: [], documentIds: [], payments: [] }
];

export const USACE_SOLICITATIONS: Solicitation[] = [
  { id: 'SOL-01', assetId: 'UA-01', title: 'Building Renovation', type: 'Invitation for Bid (IFB)', procurementMethod: 'Sealed Bidding', lifecycleState: 'Issued', status: 'Open', documentIds: [], history: [], openDate: '2024-07-01' }
];

export const USACE_COMPONENTS: AssetComponent[] = [
  { id: 'CMP-01', parentAssetId: 'UA-01', name: 'Roof System', type: 'Improvement', lifecycleState: 'Active', installDate: '2010-01-01', cost: 500000 }
];

export const USACE_PERMITS: Permit[] = [
  { id: 'PER-01', assetId: 'UA-02', uniqueIdentifier: 'P-2024-001', type: 'Section 404', authority: 'CWA', lifecycleState: 'Issued', status: 'Active', description: 'Wetland Impact', parties: [], addresses: [], documentIds: [], history: [] }
];

export const USACE_MOBILIZATION_DATA: MobilizationProfile[] = [
  { id: 'MOB-01', assetId: 'UA-03', lifecycleState: 'Ready', missionCriticality: 'Mission Critical', readinessDesignation: 'P1 - Immediate', facilityType: 'Barracks', functionalCapability: '500 Beds', condition: 90, initiatingOrg: 'G3', initiationDate: '2023-01-01', lastUpdatedDate: '2024-01-01', responsibleOfficial: 'Installation CDR', history: [] }
];

export const USACE_COSTSHARE: CostShareAgreement[] = [
  { id: 'CSA-01', assetId: 'UA-04', projectId: 'P-100', partner: 'City of Portland', sponsor: 'City of Portland', authority: 'WRDA', statutoryBasis: '33 USC 2211', costShareRatio: '65/35', federalSharePercentage: 65, totalProjectCost: 10000000, partnerContribution: 3500000, lifecycleState: 'Active', status: 'Active', agreementDate: '2023-01-01', responsibleOrg: 'Portland District', contributions: [], documentIds: [], history: [] }
];

export const USACE_LINKAGES: RealPropertyLinkage[] = [
  { id: 'LNK-01', assetId: 'UA-01', instrumentType: 'Deed', instrumentNumber: 'D-123', description: 'Acquisition Deed', executingAuthority: 'USACE', effectiveDate: '2000-01-01', lifecycleState: 'Active', status: 'Active', initiatingOrg: 'RE Div', history: [] }
];

export const USACE_RFMIS_FACILITIES: RecruitingFacility[] = [
  { id: 'RF-01', rsid: 'RS-101', name: 'Austin North Station', address: '123 Main St', city: 'Austin', state: 'TX', zip: '78701', recruitingBrigade: '5th Bde', recruitingBattalion: 'Austin Bn', serviceComponent: 'Army', type: 'Storefront', status: 'Active', sizeSqFt: 2000, usableSqFt: 1800, lifecycleStage: 'Occupancy', usaceDistrict: 'Fort Worth', fci: 85, suitabilityScore: 90, coordinates: { lat: 30.2672, lng: -97.7431 }, catchmentAreaRadiusMiles: 10, history: [] }
];

export const USACE_RFMIS_LEASES: RecruitingLease[] = [
  { id: 'RL-01', facilityId: 'RF-01', leaseNumber: 'L-2001', landlordName: 'Strip Mall LLC', landlordContact: { name: 'Bob', phone: '555-1234', email: 'bob@mall.com' }, startDate: '2020-01-01', expirationDate: '2025-01-01', annualRent: 60000, renewalOptions: '1x5', terminationRights: '30 days', servicesIncluded: ['Janitorial'], status: 'Active', history: [] }
];

export const USACE_RFMIS_PROJECTS: SRMProject[] = [
  { id: 'SRM-01', facilityId: 'RF-01', name: 'Security Upgrade', type: 'Modernization', status: 'In Progress', estimatedCost: 25000, actualCost: 0, fiscalYear: 2024, fundingSource: 'O&M', description: 'Install cameras' }
];

export const USACE_ENCROACHMENTS: EncroachmentCase[] = [
  { 
    id: 'ENC-01', 
    assetId: 'UA-03', 
    type: 'Structure', 
    discoveryDate: '2023-08-20',
    dateReported: '2023-08-20', 
    lifecycleState: 'Under Corrective Action',
    status: 'Under Corrective Action', 
    locationDescription: 'Northwest boundary, adjacent to Tract 105.',
    initialAssessment: 'Unauthorized shed construction partially on federal land.',
    responsibleOfficial: 'Ranger Smith',
    documentIds: [],
    history: [{ timestamp: '2023-08-20 09:00 AM', user: 'Ranger Smith', action: 'Case Created' }],
    tasks: [
      {
        id: 'TASK-01',
        caseId: 'ENC-01',
        title: 'Initial Site Survey',
        type: 'Survey',
        assignedTo: 'Survey Team A',
        dueDate: '2023-09-01',
        lifecycleState: 'Completed',
        workActivities: [
          { id: 'ACT-01', taskId: 'TASK-01', description: 'Field measurement', plannedDate: '2023-08-25', actualDate: '2023-08-26', responsibleParty: 'Surveyor John', outcome: 'Confirmed 5ft encroachment.' }
        ]
      },
      {
        id: 'TASK-02',
        caseId: 'ENC-01',
        title: 'Issue Notice to Cure',
        type: 'Notice',
        assignedTo: 'Real Estate Division',
        dueDate: '2023-09-15',
        lifecycleState: 'In Progress',
        workActivities: [
          { id: 'ACT-02', taskId: 'TASK-02', description: 'Draft Letter', plannedDate: '2023-09-10', responsibleParty: 'RE Specialist' }
        ]
      }
    ]
  },
  // Record 17: New Encroachment Case
  {
    id: 'ENC-02',
    assetId: 'UA-01',
    type: 'Vegetation',
    discoveryDate: '2024-05-10',
    dateReported: '2024-05-10',
    lifecycleState: 'Reported',
    status: 'Reported',
    locationDescription: 'Levee toe near Mile Marker 12.',
    initialAssessment: 'Private landowner planting trees on levee easement.',
    responsibleOfficial: 'Levee Inspector',
    documentIds: [],
    history: [{ timestamp: '2024-05-10 14:00 PM', user: 'System', action: 'Case Reported via Mobile App' }],
    tasks: []
  }
];

export const USACE_GIS_LAYERS: GeospatialLayer[] = [
  { id: 'LYR-01', name: 'Real Property Polygons', type: 'Feature', description: 'Authoritative boundary data for owned assets.', ownerOrg: 'USACE GIS Center', lifecycleState: 'Published', classification: 'CUI' },
  { id: 'LYR-02', name: 'Encroachment Points', type: 'Feature', description: 'Locations of reported and verified encroachments.', ownerOrg: 'Real Estate Division', lifecycleState: 'Published', classification: 'CUI' },
  { id: 'LYR-03', name: 'Flood Inundation Zones', type: 'Map Service', description: 'Reference layer for flood risk analysis.', ownerOrg: 'Hydrology', lifecycleState: 'Published', classification: 'Unclassified' }
];

export const USACE_GIS_FEATURES: GeospatialFeature[] = [
  { 
    id: 'FEAT-01', 
    entityId: 'UA-01', 
    entityType: 'Asset', 
    geometryType: 'Polygon', 
    coordinates: [{ lat: 38.718, lng: -77.154 }, { lat: 38.719, lng: -77.154 }, { lat: 38.719, lng: -77.153 }, { lat: 38.718, lng: -77.153 }], 
    layerId: 'LYR-01', 
    metadata: { dataSource: 'Survey 2023', collectionMethod: 'GPS', accuracy: 'Sub-meter', captureDate: '2023-06-15', coordinateSystem: 'WGS84' }, 
    lifecycleState: 'Published', 
    responsibleOfficial: 'GIS Manager', 
    history: [] 
  },
  { 
    id: 'FEAT-02', 
    entityId: 'ENC-01', 
    entityType: 'Encroachment', 
    geometryType: 'Point', 
    coordinates: { lat: 45.601, lng: -121.182 }, 
    layerId: 'LYR-02', 
    metadata: { dataSource: 'Mobile Report', collectionMethod: 'Tablet GPS', accuracy: '5 meters', captureDate: '2023-08-20', coordinateSystem: 'WGS84' }, 
    lifecycleState: 'Published', 
    responsibleOfficial: 'Ranger Smith', 
    history: [] 
  }
];
