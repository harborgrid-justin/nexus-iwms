
import { 
  EncroachmentCase, EncroachmentTask, WorkActivity, 
  RealPropertyAsset, AcquisitionRecord, DisposalRecord, 
  OutGrant, OutGrantInspection, Appraisal, EnvironmentalSite, 
  LegalClaim, RelocationCase, Solicitation, MobilizationProfile,
  CostShareAgreement, Permit, AuditEvent, Status
} from '../types';

export const NOTIFICATIONS = [
    { id: '1', message: 'Work Order **WO-102** assigned to you', timestamp: '10 mins ago', isRead: false },
    { id: '2', message: 'Lease **L-405** expiring in 30 days', timestamp: '2 hours ago', isRead: false },
    { id: '3', message: 'Approval required for PO-998', timestamp: '1 day ago', isRead: true }
];

export const SUSTAINABILITY_DATA = [
    { month: 'Jan', energyKWh: 4500, waterGal: 1200, carbonTons: 1.2, wasteKg: 500, recyclingKg: 200 },
    { month: 'Feb', energyKWh: 4800, waterGal: 1150, carbonTons: 1.3, wasteKg: 520, recyclingKg: 210 },
    { month: 'Mar', energyKWh: 4200, waterGal: 1300, carbonTons: 1.1, wasteKg: 480, recyclingKg: 220 },
    { month: 'Apr', energyKWh: 4600, waterGal: 1250, carbonTons: 1.25, wasteKg: 510, recyclingKg: 230 },
    { month: 'May', energyKWh: 5000, waterGal: 1400, carbonTons: 1.4, wasteKg: 550, recyclingKg: 240 },
    { month: 'Jun', energyKWh: 5200, waterGal: 1500, carbonTons: 1.5, wasteKg: 580, recyclingKg: 250 },
];

export const WORK_ORDERS = [
    { id: 'WO-2024-889', title: 'HVAC Repair', status: 'In Progress', priority: 'High', propertyId: 'P001', category: 'HVAC', dueDate: '2024-06-20', assignedTo: 'Technician A', cost: 1200 },
    { id: 'WO-2024-890', title: 'Leaking Faucet', status: 'Open', priority: 'Low', propertyId: 'P002', category: 'Plumbing', dueDate: '2024-06-25', assignedTo: 'Technician B', cost: 150 },
    { id: 'WO-2024-888', title: 'Light Replacement', status: 'Completed', priority: 'Medium', propertyId: 'P001', category: 'Electrical', dueDate: '2024-06-15', assignedTo: 'Technician A', cost: 50 },
    { id: 'WO-2024-891', title: 'Roof Inspection', status: 'Open', priority: 'Medium', propertyId: 'P003', category: 'Structural', dueDate: '2024-06-30', assignedTo: 'Vendor X', cost: 500 }
];

export const PROPERTIES = [
    { id: 'P001', name: 'Nexus Headquarters', address: '123 Tech Blvd', type: 'Office', sizeSqFt: 150000, occupancyRate: 95, marketValue: 45000000, status: 'Good' as Status, noi: 2500000, fci: 85, imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { id: 'P002', name: 'Westside Logistics Center', address: '456 Supply Chain Rd', type: 'Industrial', sizeSqFt: 300000, occupancyRate: 100, marketValue: 60000000, status: 'Good' as Status, noi: 3200000, fci: 90, imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80' },
    { id: 'P003', name: 'Downtown Retail Block', address: '789 Market St', type: 'Retail', sizeSqFt: 50000, occupancyRate: 88, marketValue: 12000000, status: 'Warning' as Status, noi: 800000, fci: 72, imageUrl: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=800&q=80' },
    { id: 'P004', name: 'Innovation Lab', address: '101 Future Way', type: 'R&D', sizeSqFt: 75000, occupancyRate: 60, marketValue: 25000000, status: 'Good' as Status, noi: 1500000, fci: 95, imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
    { id: 'P005', name: 'Old Warehouse', address: '55 Rust Ave', type: 'Industrial', sizeSqFt: 20000, occupancyRate: 0, marketValue: 2000000, status: 'Critical' as Status, noi: -50000, fci: 40, imageUrl: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=800&q=80' }
];

export const CAPITAL_PROJECTS = [
    { 
        id: 'CP-01', name: 'HQ Renovation', propertyId: 'P001', status: 'OnTrack' as Status, type: 'Renovation',
        totalBudget: 5000000, spent: 1200000, startDate: '2024-01-15', endDate: '2025-06-30', manager: 'E-002',
        budgetItems: [
            { category: 'Construction', budgeted: 3500000, actual: 900000 },
            { category: 'Design', budgeted: 500000, actual: 250000 },
            { category: 'Permits', budgeted: 100000, actual: 50000 },
            { category: 'Contingency', budgeted: 900000, actual: 0 }
        ],
        milestones: [
            { id: 'M1', name: 'Design Approval', dueDate: '2024-03-01', status: 'Completed' },
            { id: 'M2', name: 'Phase 1 Construction', dueDate: '2024-09-01', status: 'In Progress' }
        ],
        changeOrders: [
            { id: 'CO-01', title: 'Additional Electrical Work', status: 'Approved', costImpact: 50000, scheduleImpactDays: 5 }
        ]
    },
    { 
        id: 'CP-02', name: 'Westside Expansion', propertyId: 'P002', status: 'AtRisk' as Status, type: 'Expansion',
        totalBudget: 8000000, spent: 8150000, startDate: '2023-06-01', endDate: '2024-12-01', manager: 'E-003',
        budgetItems: [], milestones: [], changeOrders: []
    }
];

export const LEASES = [
    { id: 'L-101', propertyId: 'P003', tenantName: 'Coffee Co.', status: 'Active', monthlyRent: 5000, endDate: '2025-12-31', criticalDates: [{name: 'Rent Review', date: '2024-12-01'}] },
    { id: 'L-102', propertyId: 'P003', tenantName: 'Book Barn', status: 'Expiring Soon', monthlyRent: 4200, endDate: '2024-08-15', criticalDates: [{name: 'Expiry', date: '2024-08-15'}] },
    { id: 'L-201', propertyId: 'P001', tenantName: 'Tech Startups Inc.', status: 'Active', monthlyRent: 15000, endDate: '2026-05-30', criticalDates: [{name: 'Renewal Option', date: '2025-11-30'}] }
];

export const TRANSACTIONS = [
    { id: 'TR-01', type: 'Acquisition', propertyId: 'Prop-X', dealValue: 5500000, stage: 'Due Diligence', closeDate: '2024-09-15' },
    { id: 'TR-02', type: 'Disposition', propertyId: 'P005', dealValue: 2200000, stage: 'Negotiation', closeDate: '2024-07-30' },
    { id: 'TR-03', type: 'Acquisition', propertyId: 'Land-Y', dealValue: 1200000, stage: 'Prospecting', closeDate: 'TBD' }
];

export const SPACE_DATA = [
    { floor: 'L1', department: 'Sales', seatsTotal: 100, seatsAvailable: 10, utilization: 90 },
    { floor: 'L2', department: 'Engineering', seatsTotal: 150, seatsAvailable: 50, utilization: 66 },
    { floor: 'L3', department: 'HR & Finance', seatsTotal: 80, seatsAvailable: 20, utilization: 75 }
];

export const MOVE_REQUESTS = [
    { id: 'MR-01', employeeName: 'John Doe', fromLocation: 'L1-102', toLocation: 'L2-205', moveDate: '2024-07-01', status: 'Approved' },
    { id: 'MR-02', employeeName: 'Jane Smith', fromLocation: 'Remote', toLocation: 'L1-110', moveDate: '2024-07-05', status: 'Requested' }
];

export const SUSTAINABILITY_INITIATIVES = [
    { id: 'SI-01', type: 'Energy', name: 'LED Retrofit P002', status: 'In Progress', projectedSavings: '$12k/yr' },
    { id: 'SI-02', type: 'Water', name: 'Low-flow Fixtures HQ', status: 'Completed', projectedSavings: '$5k/yr' }
];

export const EMPLOYEES = [
    { id: 'E-001', name: 'Dr. Alistair Vance', title: 'Director of Facilities', department: 'Executive', email: 'alistair@nexus.corp', phone: '555-0101', location: 'HQ', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 'E-002', name: 'Sarah Connor', title: 'Project Manager', department: 'Strategy', email: 'sarah@nexus.corp', phone: '555-0102', location: 'HQ', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: 'E-003', name: 'Mike Ross', title: 'Lease Admin', department: 'Real Estate', email: 'mike@nexus.corp', phone: '555-0103', location: 'HQ', imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: 'E-004', name: 'Amanda Legal', title: 'General Counsel', department: 'Legal', email: 'amanda@nexus.corp', phone: '555-0104', location: 'HQ', imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: 'E-005', name: 'Linda Grey', title: 'Relocation Specialist', department: 'HR', email: 'linda@nexus.corp', phone: '555-0105', location: 'HQ', imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg' }
];

export const PPBE_FUNDS = [
    { id: 'F-24-01', name: 'O&M Fund FY24', appropriationType: 'O&M', programElement: 'Base Ops', fiscalYear: 24, totalAmount: 10000000, obligated: 6500000, expended: 4000000 },
    { id: 'F-24-02', name: 'MILCON FY24', appropriationType: 'MILCON', programElement: 'Major Construction', fiscalYear: 24, totalAmount: 25000000, obligated: 2000000, expended: 500000 }
];

export const FUND_TRANSACTIONS = [
    { id: 'FT-01', fundId: 'F-24-01', date: '2024-01-15', type: 'Commitment', amount: 50000, projectId: 'CP-01', workOrderId: null, relocationCaseId: null, environmentalSiteId: null, description: 'Initial Design Phase Funding' },
    { id: 'FT-02', fundId: 'F-24-01', date: '2024-02-01', type: 'Obligation', amount: 50000, projectId: 'CP-01', workOrderId: null, relocationCaseId: null, environmentalSiteId: null, description: 'Contract Award Obligation' },
    { id: 'FT-03', fundId: 'F-24-01', date: '2024-02-20', type: 'Expenditure', amount: 50000, projectId: 'CP-01', workOrderId: null, relocationCaseId: null, environmentalSiteId: null, description: 'Vendor Invoice Payment' }
];

export const USERS = [
    { id: 'U-01', name: 'Dr. Alistair Vance', email: 'alistair@nexus.corp', role: 'Admin', lastLogin: 'Just now' },
    { id: 'U-02', name: 'Sarah Connor', email: 'sarah@nexus.corp', role: 'Project Manager', lastLogin: '2 hours ago' },
    { id: 'U-03', name: 'John Tech', email: 'john@nexus.corp', role: 'Technician', lastLogin: 'Yesterday' }
];

export const AUDIT_LOGS = [
    { id: 'AL-01', user: 'Dr. Alistair Vance', action: 'Approved Invoice', entity: 'INV-2024-001', timestamp: '2024-06-18 10:30 AM' },
    { id: 'AL-02', user: 'Sarah Connor', action: 'Updated Project Schedule', entity: 'CP-01', timestamp: '2024-06-18 09:15 AM' }
];

export const WORKFLOWS = [
    { id: 'WF-01', name: 'High Value PO Approval', trigger: 'PO > $10k', actions: ['Email Dept Head', 'Wait for Approval'], enabled: true },
    { id: 'WF-02', name: 'Lease Expiry Alert', trigger: '90 Days Before End', actions: ['Email Lease Admin', 'Create Task'], enabled: true }
];

export const COST_CENTERS = [
    { id: 'CC-01', name: 'HQ Facility Operations', owner: 'Alistair Vance', budget: 1200000, spent: 600000 },
    { id: 'CC-02', name: 'R&D Facilities', owner: 'Lab Manager', budget: 800000, spent: 750000 },
    { id: 'CC-03', name: 'Westside Maintenance', owner: 'Site Lead', budget: 500000, spent: 200000 }
];

export const SERVICE_REQUESTS = [
    { id: 'SR-101', type: 'Temperature', location: 'L2-205', status: 'Open' },
    { id: 'SR-102', type: 'Janitorial', location: 'L1 Lobby', status: 'Resolved' }
];

export const VENDORS = [
    { id: 'V-01', name: 'ABC Electric', trade: 'Electrical', rating: 4.8, onTimeCompletionRate: 98, avgInvoiceCost: 450 },
    { id: 'V-02', name: 'Rapid Plumbing', trade: 'Plumbing', rating: 4.2, onTimeCompletionRate: 85, avgInvoiceCost: 300 }
];

export const ASSETS = [
    { id: 'A-001', name: 'Main Chiller', propertyId: 'P001', serialNumber: 'CH-X99', location: 'Roof', condition: 85, maintenanceCostYTD: 2500 },
    { id: 'A-002', name: 'Backup Generator', propertyId: 'P001', serialNumber: 'GN-500', location: 'Basement', condition: 60, maintenanceCostYTD: 5000 },
    { id: 'A-003', name: 'Elevator Bank A', propertyId: 'P002', serialNumber: 'EL-A1', location: 'Lobby', condition: 92, maintenanceCostYTD: 1200 }
];

export const CONDITION_ASSESSMENTS = [
    { id: 'CA-01', assetId: 'A-001', assessmentDate: '2024-05-10', assessedBy: 'Vendor X', conditionScore: 85, recommendedAction: 'Routine Service' },
    { id: 'CA-02', assetId: 'A-002', assessmentDate: '2024-05-12', assessedBy: 'Vendor X', conditionScore: 60, recommendedAction: 'Major Overhaul' }
];

export const PM_SCHEDULES = [
    { id: 'PM-01', assetId: 'A-001', task: 'Quarterly Service', frequency: 'Quarterly', nextDueDate: '2024-07-01', lastCompletedDate: '2024-04-01', status: 'Scheduled' },
    { id: 'PM-02', assetId: 'A-002', task: 'Annual Load Test', frequency: 'Annual', nextDueDate: '2024-06-15', lastCompletedDate: '2023-06-15', status: 'Overdue' }
];

export const CONTRACTS = [
    { id: 'CTR-01', name: 'HQ Cleaning Services', vendorId: 'V-02', type: 'Service', endDate: '2025-12-31', status: 'Active', value: 120000 },
    { id: 'CTR-02', name: 'Elevator Maintenance', vendorId: 'V-01', type: 'Service', endDate: '2024-07-01', status: 'Active', value: 45000 }
];

export const SAFETY_INCIDENTS = [
    { id: 'INC-01', type: 'Slip/Trip', propertyId: 'P002', date: '2024-06-10', status: 'Under Investigation', severity: 'Medium', description: 'Employee slipped on wet floor in loading dock.' },
    { id: 'INC-02', type: 'Chemical Spill', propertyId: 'P004', date: '2024-05-20', status: 'Closed', severity: 'Low', description: 'Minor solvent spill in lab, contained immediately.' }
];

export const COMPLIANCE_TASKS = [
    { id: 'CT-01', name: 'Annual Fire Inspection', propertyId: 'P001', type: 'Inspection', dueDate: '2024-08-01', assignedTo: 'Safety Officer', status: 'Pending' },
    { id: 'CT-02', name: 'Elevator Certification', propertyId: 'P002', type: 'Permit', dueDate: '2024-06-01', assignedTo: 'Ops Manager', status: 'Overdue' }
];

export const DOCUMENTS = [
    { id: 'D-01', name: 'HQ Floor Plan L1', type: 'CAD', relatedTo: 'P001', uploadedDate: '2023-01-10', size: '5.2 MB' },
    { id: 'D-02', name: 'Lease Agreement L-101', type: 'Lease Agreement', relatedTo: 'L-101', uploadedDate: '2023-05-15', size: '1.1 MB' },
    { id: 'D-03', name: 'Generator Manual', type: 'PDF', relatedTo: 'A-002', uploadedDate: '2022-11-20', size: '3.5 MB' }
];

export const INSURANCE_POLICIES = [
    { id: 'POL-01', policyNumber: 'PROP-998877', propertyId: 'P001', provider: 'SafeGuard', type: 'Property', expiryDate: '2024-12-31', coverageAmount: 50000000, premium: 120000 },
    { id: 'POL-02', policyNumber: 'LIAB-112233', propertyId: 'P002', provider: 'BizProtect', type: 'Liability', expiryDate: '2024-08-01', coverageAmount: 10000000, premium: 45000 }
];

export const INVENTORY = [
    { id: 'INV-01', name: 'Air Filter 20x20', sku: 'FIL-2020', location: 'HQ Supply Room', stock: 45, reorderLevel: 20, costPerUnit: 12.50 },
    { id: 'INV-02', name: 'LED Bulb A19', sku: 'LED-A19', location: 'Westside Shop', stock: 10, reorderLevel: 50, costPerUnit: 4.00 }
];

export const KEY_RECORDS = [
    { id: 'K-01', keyNumber: 'K-105', type: 'Physical Key', assignedTo: 'E-003', accesses: 'Server Room, Mechanical', issueDate: '2023-09-01', returnDate: null },
    { id: 'K-02', keyNumber: 'C-9902', type: 'Access Card', assignedTo: 'E-002', accesses: 'All Perimeter', issueDate: '2023-01-15', returnDate: null }
];

export const PARKING_PERMITS = [
    { id: 'PER-01', permitNumber: 'P-100', assignedTo: 'E-001', lot: 'Lot A', spot: '101', vehicle: 'Tesla Model S', expiryDate: '2024-12-31' },
    { id: 'PER-02', permitNumber: 'P-250', assignedTo: 'E-005', lot: 'Lot B', spot: null, vehicle: 'Toyota Camry', expiryDate: '2024-12-31' }
];

export const VISITORS = [
    { id: 'V-101', name: 'John Consultant', company: 'Deloitte', host: 'E-001', arrival: '2024-06-18T09:00:00', status: 'Checked In' },
    { id: 'V-102', name: 'Jane Auditor', company: 'IRS', host: 'E-004', arrival: '2024-06-18T10:00:00', status: 'Expected' }
];

export const UNFUNDED_REQUIREMENTS = [
    { id: 'UFR-01', title: 'Solar Panel Installation', priority: 'High', estimatedCost: 1500000, status: 'Submitted' },
    { id: 'UFR-02', title: 'Parking Lot Resurfacing', priority: 'Medium', estimatedCost: 250000, status: 'Draft' }
];

export const CAPITAL_PLAN = [
    { id: 'CP-Plan-01', projectName: 'HQ Renovation Phase 2', fiscalYear: 25, projectedCost: 3000000, fundingStatus: 'Funded' },
    { id: 'CP-Plan-02', projectName: 'New Logistics Hub', fiscalYear: 26, projectedCost: 15000000, fundingStatus: 'Unfunded' }
];

export const INVOICES = [
    { id: 'INV-001', invoiceNumber: 'INV-8899', vendorId: 'V-01', dueDate: '2024-07-01', amount: 4500, status: 'Approved', purchaseOrderId: 'PO-101', workOrderId: null },
    { id: 'INV-002', invoiceNumber: 'INV-1122', vendorId: 'V-02', dueDate: '2024-06-15', amount: 300, status: 'Submitted', purchaseOrderId: null, workOrderId: 'WO-2024-890' }
];

export const PURCHASE_ORDERS = [
    { id: 'PO-101', vendorId: 'V-01', orderDate: '2024-05-01', totalAmount: 5000, status: 'Issued', projectId: 'CP-01', workOrderId: null }
];

export const CHARGEBACKS = [
    { id: 'CB-01', date: '2024-06-01', fromCostCenterId: 'CC-01', toCostCenterId: 'CC-02', description: 'Monthly Space Allocation', amount: 15000, type: 'Space' },
    { id: 'CB-02', date: '2024-06-05', fromCostCenterId: 'CC-03', toCostCenterId: 'CC-01', description: 'Emergency Repair Cross-Charge', amount: 1200, type: 'Service' }
];

export const LEASE_CLAUSES = [
    { id: 'LC-01', leaseId: 'L-101', name: 'Holdover Clause', text: 'If tenant holds over...' },
    { id: 'LC-02', leaseId: 'L-201', name: 'Subletting', text: 'Tenant may not sublet without consent...' }
];

// USACE REMIS Mock Data

export const USACE_ASSETS: RealPropertyAsset[] = [
    { id: 'UA-01', rpuid: 'USACE-CW-1001', name: 'Columbia River Levee 4', location: 'Portland District', program: 'Civil Works', type: 'Linear Structure', status: 'Active', cefmsSyncStatus: 'Synced', assetCategoryCode: '872-10', mobilizationUse: 'Flood Control', area: 5000, unit: 'LF', acquisitionDate: '1965-04-15', cost: 15000000, components: [] },
    { id: 'UA-02', rpuid: 'USACE-MIL-2005', name: 'Training Barracks B', location: 'Fort Leonard Wood', program: 'Military', type: 'Building', status: 'Active', cefmsSyncStatus: 'Synced', assetCategoryCode: '721-11', mobilizationUse: 'Troop Housing', area: 45000, unit: 'SF', acquisitionDate: '1998-09-01', cost: 8500000, components: [] },
    { id: 'UA-03', rpuid: 'USACE-CW-3050', name: 'Navigation Lock 7', location: 'Mississippi River', program: 'Civil Works', type: 'Structure', status: 'Active', cefmsSyncStatus: 'Pending', assetCategoryCode: '871-10', mobilizationUse: 'Navigation', area: 1, unit: 'EA', acquisitionDate: '1955-06-30', cost: 45000000, components: [] },
    { id: 'UA-04', rpuid: 'USACE-MIL-4010', name: 'Old Storage Shed', location: 'Fort Hood', program: 'Military', type: 'Building', status: 'Excess', cefmsSyncStatus: 'Synced', assetCategoryCode: '442-20', mobilizationUse: 'Storage', area: 2000, unit: 'SF', acquisitionDate: '1970-01-01', cost: 150000, components: [] }
];

export const USACE_COMPONENTS = []; // Populated implicitly in asset details for now

export const USACE_ACQUISITIONS: AcquisitionRecord[] = [
    { id: 'ACQ-01', assetId: 'UA-NEW-01', stage: 'Negotiation', acquisitionMethod: 'Purchase', interestType: 'Fee', purpose: 'Flood Wall Extension', authority: 'WRDA 2022', statutoryBasis: 'PL 117-263', responsibleOrg: 'NWP', fundingSource: 'Civil Works FY24', cost: 1200000, closeDate: '2024-11-30', appraisalIds: ['APP-01'], history: [] },
    { id: 'ACQ-02', assetId: 'UA-NEW-02', stage: 'Appraisal', acquisitionMethod: 'Easement', interestType: 'Easement', purpose: 'Environmental Mitigation', authority: 'NEPA', statutoryBasis: '42 USC 4321', responsibleOrg: 'NWK', fundingSource: 'O&M FY24', cost: 450000, closeDate: '2025-02-15', appraisalIds: [], history: [] }
];

export const USACE_DISPOSALS: DisposalRecord[] = [
    { id: 'DIS-01', assetId: 'UA-04', lifecycleState: 'Authorized', initiatingOrg: 'DPW', proposedMethod: 'Public Sale', disposalRationale: 'Beyond economic repair, no longer needed for mission.', authorizationStatus: 'Approved', authorizationDate: '2023-12-15', excessDeterminationDate: '2023-10-01', appraisalIds: ['APP-02'], environmentalSiteIds: ['ENV-02'], legalClaimIds: [], documentIds: ['D-01'], history: [] }
];

export const USACE_OUTGRANTS: OutGrant[] = [
    { id: 'OG-01', assetId: 'UA-01', grantee: 'Local Utility Co.', type: 'Easement', authority: '10 U.S.C. §2668', permittedUse: 'Power line crossing', startDate: '2020-01-01', endDate: '2040-01-01', revenue: 2500, insuranceProof: true, publicBenefitAllowance: false, lifecycleState: 'Active', documentIds: [], history: [] },
    { id: 'OG-02', assetId: 'UA-02', grantee: 'Telecom Provider', type: 'License', authority: '10 U.S.C. §2667', permittedUse: 'Cell tower', startDate: '2018-05-01', endDate: '2028-05-01', revenue: 12000, insuranceProof: true, publicBenefitAllowance: false, lifecycleState: 'Active', documentIds: [], history: [] }
];

export const USACE_INSPECTIONS: OutGrantInspection[] = [
    { id: 'INSP-01', outGrantId: 'OG-01', inspectionDate: '2023-06-15', type: 'Routine', inspector: 'Mike Ross', status: 'Completed', findings: 'No issues found.' }
];

export const USACE_APPRAISALS: Appraisal[] = [
    { id: 'APP-01', assetId: 'UA-NEW-01', appraiser: 'Valuations Inc.', appraisalDate: '2024-05-01', type: 'Market Value', purpose: 'Acquisition', appraisedValue: 1150000, status: 'Approved', relatedActionId: 'ACQ-01' },
    { id: 'APP-02', assetId: 'UA-04', appraiser: 'Gov Appraisers', appraisalDate: '2023-11-01', type: 'Market Value', purpose: 'Disposal', appraisedValue: 145000, status: 'Approved', relatedActionId: 'DIS-01' }
];

export const USACE_ENVIRONMENTAL: EnvironmentalSite[] = [
    { id: 'ENV-01', assetId: 'UA-03', siteName: 'Lock Contamination', initiatingOrg: 'Ops Division', initiationDate: '2022-03-10', authority: 'CERCLA', riskClassification: 'Medium', lifecycleState: 'Under Remediation', status: 'Under Remediation', contaminants: ['Oil', 'Grease'], contaminationIndicators: 'Soil samples', programApplicability: ['ER 200-1-2'], remediationActions: [{ description: 'Soil removal', date: '2023-08-01', status: 'Completed' }], documentIds: [], history: [] },
    { id: 'ENV-02', assetId: 'UA-04', siteName: 'Shed Asbestos', initiatingOrg: 'DPW', initiationDate: '2023-09-15', authority: 'RCRA', riskClassification: 'Low', lifecycleState: 'Compliant', status: 'Compliant', contaminants: ['Asbestos'], contaminationIndicators: 'Survey', programApplicability: [], remediationActions: [], documentIds: [], history: [] }
];

export const USACE_CLAIMS: LegalClaim[] = [
    { id: 'CLM-01', assetId: 'UA-01', claimant: 'John Farmer', claimantInfo: { name: 'John Farmer' }, claimType: 'Property Damage', lifecycleState: 'Under Investigation', filedDate: '2024-04-10', incidentDate: '2024-04-01', claimAmount: 25000, description: 'Flooding alleged from levee seepage.', statutoryBasis: 'FTCA', jurisdiction: 'Federal', assignedOffice: 'Office of Counsel', responsibleOfficial: 'Amanda Legal', documentIds: [], history: [] }
];

export const USACE_RELOCATION: RelocationCase[] = [
    { id: 'REL-01', acquisitionId: 'ACQ-01', claimantName: 'Smith Family', claimantType: 'Residential Owner', displacementType: 'Physical', initiationDate: '2024-02-01', lifecycleState: 'Eligibility Determined', totalAssistance: 50000, totalBenefitsPaid: 10000, benefits: [{ id: 'BEN-01', type: 'Moving Expenses', amountClaimed: 10000, amountApproved: 10000, status: 'Paid' }], documentIds: [], history: [] }
];

export const USACE_SOLICITATIONS: Solicitation[] = [
    { id: 'SOL-01', assetId: 'UA-01', title: 'Levee Repair Contract', type: 'Invitation for Bid (IFB)', procurementMethod: 'Sealed Bidding', lifecycleState: 'Issued', issueDate: '2024-06-01', closeDate: '2024-07-15', description: 'Repair 500LF of levee.', bidItems: [], responses: [], documentIds: [], history: [] }
];

export const USACE_MOBILIZATION_DATA: MobilizationProfile[] = [
    { id: 'MOB-01', assetId: 'UA-02', missionCriticality: 'Mission Critical', readinessDesignation: 'P1 - Immediate', lifecycleState: 'Ready', condition: 85, facilityType: 'Barracks', functionalCapability: 'Housing for 200 troops', initiatingOrg: 'Base Ops', initiationDate: '2023-01-01', lastUpdatedDate: '2024-06-01', responsibleOfficial: 'Major Mobilize', history: [] }
];

export const USACE_COSTSHARE: CostShareAgreement[] = [
    { id: 'CSA-01', assetId: 'UA-01', projectId: 'P-105', sponsor: 'Port of Portland', partner: 'Port of Portland', agreementDate: '2020-05-15', authority: 'WRDA 1986', statutoryBasis: '33 U.S.C. 2211', costShareRatio: '65/35', federalSharePercentage: 65, totalProjectCost: 10000000, partnerContribution: 3500000, responsibleOrg: 'NWP', lifecycleState: 'Active', contributions: [{ dateRecorded: '2021-01-10', type: 'Cash', description: 'Initial Payment', valuationMethod: 'Actual', amount: 1000000, status: 'Credited' }], documentIds: [], history: [] }
];

export const USACE_PERMITS: Permit[] = [
    { id: 'PER-2024-001', assetId: 'UA-01', uniqueIdentifier: 'NWP-2024-100', type: 'Section 408', authority: 'Rivers and Harbors Act', description: 'Permission to alter levee for utility crossing.', lifecycleState: 'Active', status: 'Active', issueDate: '2024-03-01', effectiveDate: '2024-03-01', expirationDate: '2029-03-01', parties: [{ role: 'Applicant', name: 'City Utility' }], addresses: [], documentIds: [], history: [] }
];

export const USACE_ENCROACHMENTS: EncroachmentCase[] = [
    { 
        id: 'ENC-01', 
        assetId: 'UA-03', 
        type: 'Structure', 
        dateReported: '2023-08-10', 
        discoveryMethod: 'Inspection',
        locationDescription: 'North boundary, adjacent to Mile Marker 4.',
        initialAssessment: 'Unauthorized shed construction approx 20ft into easement.',
        lifecycleState: 'Under Corrective Action',
        status: 'Under Corrective Action',
        resolutionPlan: 'Issue Notice of Violation, require removal within 30 days.',
        responsibleOfficial: 'Alex Realty',
        tasks: [
            {
                id: 'TSK-01',
                caseId: 'ENC-01',
                description: 'Conduct Initial Site Verification',
                assignedTo: 'E-003',
                dueDate: '2023-08-15',
                status: 'Completed',
                activities: [
                    { id: 'ACT-01', taskId: 'TSK-01', action: 'Site Visit', date: '2023-08-12', performedBy: 'Mike Ross', outcome: 'Confirmed permanent shed structure present.' }
                ]
            },
            {
                id: 'TSK-02',
                caseId: 'ENC-01',
                description: 'Issue Notice of Violation to Landowner',
                assignedTo: 'U-10', // Amanda Legal
                dueDate: '2023-08-20',
                status: 'Completed',
                activities: [
                    { id: 'ACT-02', taskId: 'TSK-02', action: 'Draft Notice', date: '2023-08-18', performedBy: 'Amanda Legal', outcome: 'Notice drafted and approved.' },
                    { id: 'ACT-03', taskId: 'TSK-02', action: 'Send Certified Mail', date: '2023-08-19', performedBy: 'Admin Staff', outcome: 'Tracking #99887766' }
                ]
            },
            {
                id: 'TSK-03',
                caseId: 'ENC-01',
                description: 'Verify Removal',
                assignedTo: 'E-003',
                dueDate: '2023-09-20',
                status: 'In Progress',
                activities: []
            }
        ],
        documentIds: [],
        history: [
            { timestamp: '2023-08-20 14:00 PM', user: 'Amanda Legal', action: 'State Transition', details: 'Moved to Under Corrective Action.' },
            { timestamp: '2023-08-10 09:00 AM', user: 'System', action: 'Record Created', details: 'Encroachment reported via mobile app.' }
        ]
    },
    // New Record for demo
    {
        id: 'ENC-02',
        assetId: 'UA-01',
        type: 'Vegetation',
        dateReported: '2024-05-01',
        discoveryMethod: 'Patrol',
        locationDescription: 'Levee toe, Sector 4.',
        initialAssessment: 'Overgrown woody vegetation affecting levee integrity.',
        lifecycleState: 'Triaged',
        status: 'Triaged',
        responsibleOfficial: 'Major Mobilize',
        tasks: [],
        documentIds: [],
        history: [
             { timestamp: '2024-05-01 08:30 AM', user: 'Field Team', action: 'Record Created' }
        ]
    }
];

export const RESERVATIONS = [
    { id: 'RES-01', reservedBy: 'E-004', spaceName: 'Conference Room A', date: '2024-06-20', startTime: '10:00', endTime: '11:00', status: 'Confirmed' },
    { id: 'RES-02', reservedBy: 'E-005', spaceName: 'Desk 405', date: '2024-06-21', startTime: '09:00', endTime: '17:00', status: 'Confirmed' },
    { id: 'RES-03', reservedBy: 'E-001', spaceName: 'Board Room', date: '2024-06-22', startTime: '14:00', endTime: '15:30', status: 'Pending' }
];

export const UTILITY_BILLS = [
    { id: 'UB-01', propertyId: 'P001', utility: 'Electric', serviceDate: '2024-05', cost: 4500, consumption: 35000, unit: 'kWh' },
    { id: 'UB-02', propertyId: 'P001', utility: 'Water', serviceDate: '2024-05', cost: 1200, consumption: 8000, unit: 'Gal' },
    { id: 'UB-03', propertyId: 'P002', utility: 'Electric', serviceDate: '2024-05', cost: 6000, consumption: 48000, unit: 'kWh' },
    { id: 'UB-04', propertyId: 'P002', utility: 'Water', serviceDate: '2024-05', cost: 800, consumption: 5000, unit: 'Gal' }
];
