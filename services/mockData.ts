import { 
  Property, Lease, WorkOrder, Asset, SpaceMetric, SustainabilityMetric, Status,
  Vendor, PreventiveMaintenanceSchedule, Employee, ServiceRequest, CapitalProject,
  SustainabilityInitiative, BudgetLineItem, AuditLog, User, CostCenter, InventoryItem,
  SafetyIncident, Document, ProjectRisk, Notification, Contract, Transaction, MoveRequest, Workflow,
  Reservation, Visitor, ComplianceTask, InsurancePolicy, UtilityBill, ParkingPermit, KeyRecord, ConditionAssessment,
  PpbeFund, FundTransaction, UnfundedRequirement, CapitalPlanItem, Invoice, PurchaseOrder, Chargeback, ProjectMilestone, ChangeOrder, LeaseClause
} from '../types';

export const NOTIFICATIONS: Notification[] = [
  { id: 'N-01', message: 'Project **CP-02** is now over budget by $150,000.', type: 'alert', timestamp: '2 hours ago', isRead: false, link: '/projects' },
  { id: 'N-02', message: 'Work Order **WO-2024-889** has been assigned to you.', type: 'task', timestamp: '8 hours ago', isRead: false, link: '/operations' },
  { id: 'N-03', message: 'Lease for **Starbucks Corp** is expiring in 90 days.', type: 'info', timestamp: '1 day ago', isRead: true, link: '/lease-admin' },
  { id: 'N-04', message: 'Q4 Sustainability Report is ready for review.', type: 'info', timestamp: '2 days ago', isRead: true, link: '/sustainability' },
  { id: 'N-05', message: 'PPBE Fund **OM-FY24** is 95% obligated.', type: 'alert', timestamp: '3 days ago', isRead: false, link: '/ppbe-funds' },
];

export const CONTRACTS: Contract[] = [
  { id: 'C-01', name: 'HQ Janitorial Services', vendorId: 'V-04', type: 'Service', startDate: '2023-01-01', endDate: '2025-12-31', value: 250000, status: 'Active', renewalDate: '2025-10-01', documentId: 'DOC-01' },
  { id: 'C-02', name: 'Logistics Hub HVAC Maintenance', vendorId: 'V-01', type: 'Service', startDate: '2022-06-01', endDate: '2024-05-31', value: 75000, status: 'Expired', renewalDate: '2024-03-01', documentId: 'DOC-03' },
  { id: 'C-03', name: 'CP-01 Renovation Contract', vendorId: 'V-04', type: 'Construction', startDate: '2023-08-15', endDate: '2024-02-28', value: 400000, status: 'Active', renewalDate: '', documentId: 'DOC-01' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'T-01', propertyId: 'P005', type: 'Disposition', stage: 'Negotiation', dealValue: 18500000, closeDate: '2024-01-15', broker: 'CBRE' },
  { id: 'T-02', propertyId: 'new-prop-1', type: 'Acquisition', stage: 'Due Diligence', dealValue: 35000000, closeDate: '2024-03-01', broker: 'JLL' },
  { id: 'T-03', propertyId: 'new-prop-2', type: 'Acquisition', stage: 'Prospecting', dealValue: 50000000, closeDate: '2024-06-30', broker: 'Cushman & Wakefield' },
  { id: 'T-04', propertyId: 'new-prop-3', type: 'Acquisition', stage: 'Closing', dealValue: 22000000, closeDate: '2023-12-15', broker: 'JLL' },
];

export const MOVE_REQUESTS: MoveRequest[] = [
  { id: 'MR-01', employeeName: 'John Miller', fromLocation: 'HQ-210', toLocation: 'HQ-215', moveDate: '2023-11-10', status: 'Approved' },
  { id: 'MR-02', employeeName: 'Marketing Dept.', fromLocation: 'HQ Floor 1', toLocation: 'HQ Floor 4', moveDate: '2024-01-05', status: 'Requested' },
  { id: 'MR-03', employeeName: 'Jane Smith', fromLocation: 'Remote', toLocation: 'HQ-Flex-05', moveDate: '2023-11-15', status: 'Completed' },
];

export const WORKFLOWS: Workflow[] = [
  { id: 'WF-01', name: 'Emergency WO Notification', trigger: 'Work Order Created (Priority: Emergency)', actions: ['Notify: Facility Director', 'Create: Calendar Event'], enabled: true },
  { id: 'WF-02', name: 'Lease Expiry Alert', trigger: 'Lease: 90 Days to Expiry', actions: ['Notify: Real Estate Manager', 'Create Task: Review Renewal'], enabled: true },
  { id: 'WF-03', name: 'Project Budget Alert', trigger: 'Project: Spent > 90% of Budget', actions: ['Notify: Project Manager', 'Notify: Financial Analyst'], enabled: false },
];

export const DOCUMENTS: Document[] = [
  { id: 'DOC-01', name: 'Lease_Agreement_Starbucks.pdf', type: 'Lease Agreement', url: '#', uploadedDate: '2019-05-10', size: '2.5 MB', relatedTo: 'Property P004' },
  { id: 'DOC-02', name: 'HQ_Floorplan_Level1.cad', type: 'CAD', url: '#', uploadedDate: '2020-01-20', size: '15.2 MB', relatedTo: 'Property P001' },
  { id: 'DOC-03', name: 'HVAC_Invoice_V-01.pdf', type: 'Invoice', url: '#', uploadedDate: '2023-10-28', size: '128 KB', relatedTo: 'Work Order WO-2024-889' },
  { id: 'DOC-04', name: 'Lobby_Renovation_Blueprint_v3.cad', type: 'Blueprint', url: '#', uploadedDate: '2023-08-20', size: '25.8 MB', relatedTo: 'Project CP-01' },
  { id: 'DOC-05', name: 'Building_Permit_CP-01.pdf', type: 'Permit', url: '#', uploadedDate: '2023-09-05', size: '1.1 MB', relatedTo: 'Project CP-01' },
  { id: 'DOC-06', name: 'P001_Liability_Policy.pdf', type: 'Insurance Policy', url: '#', uploadedDate: '2023-01-01', size: '800 KB', relatedTo: 'Property P001' },
  { id: 'DOC-07', name: 'Q3_Safety_Audit.pdf', type: 'Compliance Report', url: '#', uploadedDate: '2023-10-01', size: '3.1 MB', relatedTo: 'Property P003' },
  { id: 'DOC-08', name: 'PO-2024-001.pdf', type: 'Purchase Order', url: '#', uploadedDate: '2024-01-10', size: '95 KB', relatedTo: 'PO-01' },
  { id: 'DOC-09', name: 'CO-CP02-001.pdf', type: 'Change Order', url: '#', uploadedDate: '2023-10-15', size: '210 KB', relatedTo: 'CP-02' },
];

export const PROPERTIES: Property[] = [
  { id: 'P001', name: 'Nexus Headquarters', address: '100 Enterprise Way, NY', type: 'Office', sizeSqFt: 450000, occupancyRate: 88, status: Status.Good, marketValue: 125000000, imageUrl: 'https://picsum.photos/400/300?random=1', documents: [DOCUMENTS[1]], noi: 7500000, fci: 92 },
  { id: 'P002', name: 'Innovation Lab Beta', address: '42 Tech Park Blvd, CA', type: 'Lab', sizeSqFt: 120000, occupancyRate: 95, status: Status.Good, marketValue: 85000000, imageUrl: 'https://picsum.photos/400/300?random=2', noi: 6200000, fci: 85 },
  { id: 'P003', name: 'Logistics Hub North', address: '88 Industrial Dr, IL', type: 'Industrial', sizeSqFt: 800000, occupancyRate: 72, status: Status.Warning, marketValue: 62000000, imageUrl: 'https://picsum.photos/400/300?random=3', noi: 4100000, fci: 68 },
  { id: 'P004', name: 'Downtown Retail Center', address: '500 Main St, TX', type: 'Retail', sizeSqFt: 55000, occupancyRate: 98, status: Status.Good, marketValue: 22000000, imageUrl: 'https://picsum.photos/400/300?random=4', documents: [DOCUMENTS[0]], noi: 1800000, fci: 95 },
  { id: 'P005', name: 'Satellite Office East', address: '12 Harbor View, MA', type: 'Office', sizeSqFt: 25000, occupancyRate: 45, status: Status.Critical, marketValue: 18000000, imageUrl: 'https://picsum.photos/400/300?random=5', noi: 950000, fci: 45 },
];

export const LEASE_CLAUSES: LeaseClause[] = [
    {id: 'LC-01', leaseId: 'L-102', name: 'Renewal Option', details: 'Tenant has the option to renew for one (1) additional five-year term.', criticalDate: '2024-02-15'},
    {id: 'LC-02', leaseId: 'L-102', name: 'CAM Cap', details: 'Annual CAM charges cannot increase by more than 5% year-over-year.'},
    {id: 'LC-03', leaseId: 'L-103', name: 'Termination Option', details: 'Tenant may terminate the lease with 180 days notice after the third lease year.', criticalDate: '2024-07-31'},
];

export const LEASES: Lease[] = [
  { id: 'L-101', propertyId: 'P001', tenantName: 'Internal', startDate: '2020-01-01', endDate: '2030-12-31', monthlyRent: 0, status: 'Active', criticalDates: [{ name: 'Rent Review', date: '2025-01-01'}], camCharge: 18.50 },
  { id: 'L-102', propertyId: 'P004', tenantName: 'Starbucks Corp', startDate: '2019-05-15', endDate: '2024-05-15', monthlyRent: 12500, status: 'Expiring Soon', criticalDates: [{ name: 'Renewal Option', date: '2024-02-15'}], clauses: [LEASE_CLAUSES[0], LEASE_CLAUSES[1]], camCharge: 22.00 },
  { id: 'L-103', propertyId: 'P003', tenantName: 'FastShip Logistics', startDate: '2021-08-01', endDate: '2026-07-31', monthlyRent: 45000, status: 'Active', criticalDates: [{ name: 'Termination Option', date: '2024-07-31'}], clauses: [LEASE_CLAUSES[2]], camCharge: 8.75 },
];

export const VENDORS: Vendor[] = [
  { id: 'V-01', name: 'ACME HVAC Solutions', trade: 'HVAC', rating: 4.8, onTimeCompletionRate: 95, avgInvoiceCost: 1500 },
  { id: 'V-02', name: 'City Electrical Co.', trade: 'Electrical', rating: 4.5, onTimeCompletionRate: 92, avgInvoiceCost: 850 },
  { id: 'V-03', name: 'Pro Plumbers Inc.', trade: 'Plumbing', rating: 4.2, onTimeCompletionRate: 88, avgInvoiceCost: 1100 },
  { id: 'V-04', name: 'BuildRight Construction', trade: 'General Contractor', rating: 4.9, onTimeCompletionRate: 98, avgInvoiceCost: 125000 },
];

export const COST_CENTERS: CostCenter[] = [
  { id: 'CC-01', name: 'HQ Facility Operations', owner: 'E-001', budget: 500000, spent: 375000 },
  { id: 'CC-02', name: 'Lab Beta R&D Facilities', owner: 'E-001', budget: 250000, spent: 265000 },
  { id: 'CC-03', name: 'Logistics Maintenance', owner: 'E-001', budget: 750000, spent: 650000 },
  { id: 'CC-04', name: 'Marketing Department', owner: 'E-005', budget: 100000, spent: 45000 },
];

export const WORK_ORDERS: WorkOrder[] = [
  { id: 'WO-2024-889', propertyId: 'P001', title: 'HVAC Failure in Server Room', priority: 'Emergency', status: 'In Progress', category: 'HVAC', assignedTo: 'Mike Ross', dueDate: '2023-10-27', cost: 1200, costCenterId: 'CC-01', assetId: 'A-5001' },
  { id: 'WO-2024-890', propertyId: 'P001', title: 'Lobby Light Replacement', priority: 'Low', status: 'Open', category: 'Electrical', assignedTo: 'Sarah Jin', dueDate: '2023-10-30', cost: 250, costCenterId: 'CC-01' },
  { id: 'WO-2024-891', propertyId: 'P002', title: 'Leaking Pipe 4th Floor Restroom', priority: 'High', status: 'Open', category: 'Plumbing', assignedTo: 'V-03', dueDate: '2023-10-28', cost: 800, costCenterId: 'CC-02', relatedIncidentId: 'SI-02' },
  { id: 'WO-2024-892', propertyId: 'P003', title: 'Q4 Preventive Maintenance', priority: 'Medium', status: 'Completed', category: 'Preventive', assignedTo: 'Team A', dueDate: '2023-10-15', cost: 2500, costCenterId: 'CC-03', assetId: 'A-5002' },
];

export const INVENTORY: InventoryItem[] = [
  { id: 'INV-01', name: 'HVAC Filter 16x20', sku: 'HF-1620', stock: 150, reorderLevel: 50, location: 'HQ Storage A', costPerUnit: 12.50 },
  { id: 'INV-02', name: 'LED Bulb E26', sku: 'LB-E26', stock: 480, reorderLevel: 200, location: 'HQ Storage B', costPerUnit: 3.75 },
  { id: 'INV-03', name: 'Ballast Type A', sku: 'BT-A', stock: 35, reorderLevel: 20, location: 'Lab Beta Storage', costPerUnit: 45.00 },
  { id: 'INV-04', name: 'Ceiling Tile 2x4', sku: 'CT-24', stock: 80, reorderLevel: 100, location: 'HQ Storage A', costPerUnit: 8.20 },
];

export const SAFETY_INCIDENTS: SafetyIncident[] = [
  { id: 'SI-01', propertyId: 'P003', type: 'Near Miss', date: '2023-10-15', severity: 'Low', status: 'Closed', description: 'Forklift operator nearly backed into racking. No injuries or damage.' },
  { id: 'SI-02', propertyId: 'P001', type: 'Property Damage', date: '2023-09-20', severity: 'Medium', status: 'Under Investigation', description: 'Water damage from leaking pipe on 4th floor. Ceiling tiles and carpet affected.' },
  { id: 'SI-03', propertyId: 'P001', type: 'Injury', date: '2023-10-22', severity: 'Low', status: 'Corrective Action Pending', description: 'Contractor sustained minor cut to hand. First aid administered.' },
];

export const ASSETS: Asset[] = [
  { id: 'A-5001', propertyId: 'P001', name: 'Chiller Unit #1', serialNumber: 'CH-99283', purchaseDate: '2018-03-01', warrantyEnd: '2028-03-01', condition: 85, location: 'P001 - Roof', maintenanceCostYTD: 5200, downtimeHours: 4 },
  { id: 'A-5002', propertyId: 'P001', name: 'Backup Generator', serialNumber: 'GN-11002', purchaseDate: '2015-06-20', warrantyEnd: '2025-06-20', condition: 60, location: 'P001 - Basement', maintenanceCostYTD: 12500, downtimeHours: 0 },
  { id: 'A-5003', propertyId: 'P002', name: 'Air Handler 4', serialNumber: 'AH-44321', purchaseDate: '2020-01-15', warrantyEnd: '2025-01-15', condition: 92, location: 'P002 - Floor 2', maintenanceCostYTD: 1800, downtimeHours: 0 },
];

export const PM_SCHEDULES: PreventiveMaintenanceSchedule[] = [
  { id: 'PM-001', assetId: 'A-5001', task: 'Filter Change & Coil Cleaning', frequency: 'Quarterly', nextDueDate: '2024-01-15', status: 'Scheduled' },
  { id: 'PM-002', assetId: 'A-5002', task: 'Full Load Test', frequency: 'Annually', nextDueDate: '2024-03-01', status: 'Scheduled' },
  { id: 'PM-003', assetId: 'A-5001', task: 'Annual Inspection', frequency: 'Annually', nextDueDate: '2023-09-01', status: 'Overdue', lastCompletedDate: '2022-09-05' },
];

export const SUSTAINABILITY_DATA: SustainabilityMetric[] = [
  { month: 'Jan', energyKWh: 45000, waterGal: 12000, carbonTons: 12.5, wasteKg: 500, recyclingKg: 250 },
  { month: 'Feb', energyKWh: 42000, waterGal: 11500, carbonTons: 11.8, wasteKg: 480, recyclingKg: 245 },
  { month: 'Mar', energyKWh: 48000, waterGal: 13000, carbonTons: 13.2, wasteKg: 520, recyclingKg: 260 },
  { month: 'Apr', energyKWh: 46000, waterGal: 12500, carbonTons: 12.9, wasteKg: 510, recyclingKg: 255 },
  { month: 'May', energyKWh: 51000, waterGal: 14000, carbonTons: 14.1, wasteKg: 550, recyclingKg: 270 },
  { month: 'Jun', energyKWh: 58000, waterGal: 15500, carbonTons: 16.5, wasteKg: 600, recyclingKg: 310 },
];

export const SUSTAINABILITY_INITIATIVES: SustainabilityInitiative[] = [
  { id: 'SI-01', name: 'LED Lighting Retrofit', type: 'Energy', status: 'Completed', projectedSavings: '$15,000 / year', completionDate: '2023-08-01' },
  { id: 'SI-02', name: 'Smart Irrigation System', type: 'Water', status: 'In Progress', projectedSavings: '500,000 Gal / year', completionDate: '2024-06-30' },
  { id: 'SI-03', name: 'Centralized Composting Program', type: 'Waste', status: 'Planning', projectedSavings: '5 tons landfill diversion', completionDate: '2024-12-31' },
];

export const SPACE_DATA: SpaceMetric[] = [
  { floor: 'Floor 1', utilization: 85, department: 'Sales', seatsTotal: 120, seatsAvailable: 18 },
  { floor: 'Floor 2', utilization: 45, department: 'Engineering', seatsTotal: 150, seatsAvailable: 82 },
  { floor: 'Floor 3', utilization: 92, department: 'Executive', seatsTotal: 40, seatsAvailable: 3 },
  { floor: 'Floor 4', utilization: 60, department: 'HR & Legal', seatsTotal: 80, seatsAvailable: 32 },
];

export const EMPLOYEES: Employee[] = [
  { id: 'E-001', name: 'Dr. Alistair Vance', title: 'Director of Facilities', department: 'Facilities', email: 'avance@nexus.corp', location: 'HQ-301', phone: '555-123-4567', imageUrl: `https://i.pravatar.cc/150?u=E-001`},
  { id: 'E-002', name: 'Sarah Jin', title: 'Lead Electrician', department: 'Facilities', email: 'sjin@nexus.corp', location: 'Field', phone: '555-123-4568', imageUrl: `https://i.pravatar.cc/150?u=E-002`},
  { id: 'E-003', name: 'Mike Ross', title: 'HVAC Specialist', department: 'Facilities', email: 'mross@nexus.corp', location: 'Field', phone: '555-123-4569', imageUrl: `https://i.pravatar.cc/150?u=E-003`},
  { id: 'E-004', name: 'Emily Carter', title: 'Project Manager', department: 'Capital Projects', email: 'ecarter@nexus.corp', location: 'HQ-250', phone: '555-123-4570', imageUrl: `https://i.pravatar.cc/150?u=E-004`},
  { id: 'E-005', name: 'John Miller', title: 'Software Engineer', department: 'Engineering', email: 'jmiller@nexus.corp', location: 'HQ-210', phone: '555-123-4571', imageUrl: `https://i.pravatar.cc/150?u=E-005`},
];

export const SERVICE_REQUESTS: ServiceRequest[] = [
  { id: 'SR-01', submittedBy: 'E-005', type: 'Temperature', location: 'HQ Floor 2', status: 'New', createdDate: '2023-10-26', details: 'The engineering wing is too cold.' },
  { id: 'SR-02', submittedBy: 'E-004', type: 'Janitorial', location: 'HQ Floor 2 Conf Room', status: 'Resolved', createdDate: '2023-10-25', details: 'Coffee spill on carpet.' },
];

export const BUDGET_ITEMS_PROJ1: BudgetLineItem[] = [
  {id: 'BLI-1', category: 'Design', budgeted: 40000, actual: 40000, variance: 0 },
  {id: 'BLI-2', category: 'Permits', budgeted: 15000, actual: 15000, variance: 0 },
  {id: 'BLI-3', category: 'Labor', budgeted: 150000, actual: 165000, variance: -15000 },
  {id: 'BLI-4', category: 'Materials', budgeted: 250000, actual: 245000, variance: 5000 },
  {id: 'BLI-5', category: 'Contingency', budgeted: 40000, actual: 10000, variance: 30000 },
];

export const MILESTONES_PROJ1: ProjectMilestone[] = [
    {id: 'M-01', name: 'Design Complete', dueDate: '2023-09-30', status: 'Completed'},
    {id: 'M-02', name: 'Permits Approved', dueDate: '2023-10-15', status: 'Completed'},
    {id: 'M-03', name: 'Demolition Phase', dueDate: '2023-11-15', status: 'In Progress'},
    {id: 'M-04', name: 'Construction Complete', dueDate: '2024-02-15', status: 'Not Started'},
];

export const CHANGE_ORDERS_PROJ2: ChangeOrder[] = [
    {id: 'CO-01', projectId: 'CP-02', title: 'Additional Structural Repairs', reason: 'Unforeseen Condition', costImpact: 150000, scheduleImpactDays: 14, status: 'Approved', date: '2023-10-15'},
    {id: 'CO-02', projectId: 'CP-02', title: 'Upgrade to TPO Roofing Material', reason: 'Client Request', costImpact: 75000, scheduleImpactDays: 0, status: 'Pending', date: '2023-10-28'},
]

export const RISKS_PROJ1: ProjectRisk[] = [
  { id: 'R-03', description: 'Permit approval delayed.', impact: 'Medium', probability: 'Low', mitigation: 'Weekly follow-ups with city office.' }
];

export const RISKS_PROJ2: ProjectRisk[] = [
  { id: 'R-01', description: 'Material delivery delays due to supply chain issues.', impact: 'High', probability: 'Medium', mitigation: 'Pre-order materials from alternate suppliers.' },
  { id: 'R-02', description: 'Unexpected structural damage discovered upon roof removal.', impact: 'High', probability: 'Low', mitigation: 'Allocate $50,000 from contingency budget for assessment.' },
];

export const CAPITAL_PROJECTS: CapitalProject[] = [
  { id: 'CP-01', name: 'HQ Lobby Renovation', propertyId: 'P001', type: 'Renovation', status: Status.OnTrack, startDate: '2023-09-01', endDate: '2024-02-28', totalBudget: 495000, spent: 475000, manager: 'E-004', budgetItems: BUDGET_ITEMS_PROJ1, risks: RISKS_PROJ1, documents: [DOCUMENTS[3], DOCUMENTS[4]], milestones: MILESTONES_PROJ1 },
  { id: 'CP-02', name: 'Logistics Hub Roof Replacement', propertyId: 'P003', type: 'Major Repair', status: Status.AtRisk, startDate: '2023-06-15', endDate: '2023-11-30', totalBudget: 1200000, spent: 1350000, manager: 'E-004', risks: RISKS_PROJ2, changeOrders: CHANGE_ORDERS_PROJ2 },
  { id: 'CP-03', name: 'Lab Beta Expansion Wing', propertyId: 'P002', type: 'New Construction', status: Status.Planning, startDate: '2024-04-01', endDate: '2025-12-31', totalBudget: 25000000, spent: 0, manager: 'E-004' },
];

export const USERS: User[] = [
  { id: 'U-01', name: 'Dr. Alistair Vance', email: 'avance@nexus.corp', role: 'Admin', lastLogin: '2023-10-26 08:05 AM' },
  { id: 'U-02', name: 'Emily Carter', email: 'ecarter@nexus.corp', role: 'Project Manager', lastLogin: '2023-10-26 09:15 AM' },
  { id: 'U-03', name: 'Sarah Jin', email: 'sjin@nexus.corp', role: 'Technician', lastLogin: '2023-10-25 07:30 AM' },
  { id: 'U-04', name: 'John Doe', email: 'jdoe@nexus.corp', role: 'Read Only', lastLogin: '2023-10-24 02:00 PM' },
  { id: 'U-05', name: 'Finance Bot', email: 'fbot@nexus.corp', role: 'Financial Analyst', lastLogin: '2023-10-26 11:00 AM' },
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'AL-01', user: 'Dr. Alistair Vance', action: 'Approved budget variance for CP-02', entity: 'Capital Project CP-02', timestamp: '2023-10-26 10:30 AM' },
  { id: 'AL-02', user: 'System', action: 'Generated preventive work order WO-2024-892', entity: 'Asset A-5001', timestamp: '2023-10-25 12:00 AM' },
  { id: 'AL-03', user: 'Emily Carter', action: 'Updated status of Lease L-102 to Expiring Soon', entity: 'Lease L-102', timestamp: '2023-10-24 03:45 PM' },
  { id: 'AL-04', user: 'John Miller (E-005)', action: 'Submitted Service Request SR-01', entity: 'Service Request SR-01', timestamp: '2023-10-26 09:00 AM' },
];

// --- NEW MOCK DATA FOR EXPANDED FEATURES ---

export const RESERVATIONS: Reservation[] = [
  { id: 'RES-01', spaceId: 'HQ-Conf-A', spaceName: 'HQ Conference Room A', reservedBy: 'E-004', date: '2023-10-28', startTime: '10:00', endTime: '11:00', status: 'Confirmed' },
  { id: 'RES-02', spaceId: 'HQ-Flex-05', spaceName: 'HQ Flex Desk 05', reservedBy: 'E-005', date: '2023-10-28', startTime: '09:00', endTime: '17:00', status: 'Confirmed' },
  { id: 'RES-03', spaceId: 'LB-Focus-2', spaceName: 'Lab Beta Focus Room 2', reservedBy: 'E-005', date: '2023-10-29', startTime: '14:00', endTime: '15:30', status: 'Confirmed' },
];

export const VISITORS: Visitor[] = [
  { id: 'VIS-01', name: 'David Chen', company: 'ACME HVAC Solutions', host: 'E-001', arrival: '2023-10-28T09:00:00Z', status: 'Expected' },
  { id: 'VIS-02', name: 'Laura Palmer', company: 'JLL', host: 'E-004', arrival: '2023-10-27T11:30:00Z', departure: '2023-10-27T12:45:00Z', status: 'Checked Out' },
  { id: 'VIS-03', name: 'Dale Cooper', company: 'City Inspectors', host: 'E-001', arrival: '2023-10-27T14:00:00Z', status: 'Checked In' },
];

export const COMPLIANCE_TASKS: ComplianceTask[] = [
  { id: 'CT-01', name: 'Fire Extinguisher Inspection', type: 'Inspection', propertyId: 'P001', dueDate: '2023-11-01', status: 'In Progress', assignedTo: 'E-002' },
  { id: 'CT-02', name: 'Elevator Operating Permit', type: 'Permit Renewal', propertyId: 'P001', dueDate: '2023-12-15', status: 'Pending', assignedTo: 'E-001' },
  { id: 'CT-03', name: 'Annual Safety Audit', type: 'Audit', propertyId: 'P003', dueDate: '2023-09-30', status: 'Completed', assignedTo: 'E-001' },
  { id: 'CT-04', name: 'Backflow Preventer Test', type: 'Inspection', propertyId: 'P002', dueDate: '2023-10-20', status: 'Overdue', assignedTo: 'V-03' },
];

export const INSURANCE_POLICIES: InsurancePolicy[] = [
  { id: 'IP-01', propertyId: 'P001', provider: 'Chubb', policyNumber: 'POL-98765', type: 'Property', coverageAmount: 150000000, premium: 120000, expiryDate: '2024-06-30' },
  { id: 'IP-02', propertyId: 'P001', provider: 'Travelers', policyNumber: 'POL-12345', type: 'Liability', coverageAmount: 10000000, premium: 45000, expiryDate: '2024-06-30' },
  { id: 'IP-03', propertyId: 'P003', provider: 'Chubb', policyNumber: 'POL-55555', type: 'Property', coverageAmount: 75000000, premium: 95000, expiryDate: '2024-08-31' },
];

export const UTILITY_BILLS: UtilityBill[] = [
  { id: 'UB-01', propertyId: 'P001', utility: 'Electric', serviceDate: '2023-09', cost: 12540.50, consumption: 51000, unit: 'kWh', documentId: 'DOC-03' },
  { id: 'UB-02', propertyId: 'P001', utility: 'Water', serviceDate: '2023-09', cost: 3400.00, consumption: 14000, unit: 'gallons', documentId: 'DOC-03' },
  { id: 'UB-03', propertyId: 'P002', utility: 'Electric', serviceDate: '2023-09', cost: 8900.20, consumption: 35000, unit: 'kWh', documentId: 'DOC-03' },
];

export const PARKING_PERMITS: ParkingPermit[] = [
  { id: 'PP-01', permitNumber: 'NEXUS-001', assignedTo: 'E-001', lot: 'HQ Exec Garage', spot: '1', vehicle: 'Tesla Model S, Plate 123-ABC', expiryDate: '2025-12-31' },
  { id: 'PP-02', permitNumber: 'NEXUS-152', assignedTo: 'E-005', lot: 'HQ Lot B', spot: undefined, vehicle: 'Toyota Camry, Plate 456-DEF', expiryDate: '2024-12-31' },
];

export const KEY_RECORDS: KeyRecord[] = [
  { id: 'KR-01', keyNumber: 'HQ-MASTER', type: 'Physical Key', assignedTo: 'E-001', accesses: 'All HQ Areas', issueDate: '2020-01-15' },
  { id: 'KR-02', keyNumber: 'AC-10582', type: 'Access Card', assignedTo: 'E-005', accesses: 'HQ Main Entrance, Floor 2', issueDate: '2022-03-01' },
];

export const CONDITION_ASSESSMENTS: ConditionAssessment[] = [
  { id: 'CA-01', assetId: 'A-5002', assessmentDate: '2023-08-15', assessedBy: 'E-003', conditionScore: 60, notes: 'Showing signs of wear on belts. Fuel filter is dirty.', recommendedAction: 'Replace belts and filters during next PM cycle.' },
  { id: 'CA-02', assetId: 'A-5001', assessmentDate: '2023-09-01', assessedBy: 'E-003', conditionScore: 85, notes: 'Running within normal parameters. Some minor corrosion on housing.', recommendedAction: 'Monitor corrosion, no immediate action needed.' },
];

// --- NEW FINANCIALS MOCK DATA ---
export const PPBE_FUNDS: PpbeFund[] = [
  { id: 'OM-FY24', name: 'O&M Fund FY24', appropriationType: 'O&M', fiscalYear: 2024, programElement: 'PE-01', totalAmount: 5000000, committed: 1250000, obligated: 3500000, expended: 3200000 },
  { id: 'MC-FY24', name: 'MILCON Fund FY24', appropriationType: 'MILCON', fiscalYear: 2024, programElement: 'PE-02', totalAmount: 25000000, committed: 25000000, obligated: 0, expended: 0 },
  { id: 'OM-FY23', name: 'O&M Fund FY23', appropriationType: 'O&M', fiscalYear: 2023, programElement: 'PE-01', totalAmount: 4500000, committed: 4500000, obligated: 4500000, expended: 4450000 },
];

export const FUND_TRANSACTIONS: FundTransaction[] = [
  { id: 'FT-01', fundId: 'OM-FY24', projectId: 'CP-02', type: 'Commitment', amount: 1200000, date: '2023-06-01', description: 'Initial funding for roof replacement' },
  { id: 'FT-02', fundId: 'OM-FY24', workOrderId: 'WO-2024-889', type: 'Obligation', amount: 1200, date: '2023-10-26', description: 'PO issued to ACME HVAC' },
  { id: 'FT-03', fundId: 'MC-FY24', projectId: 'CP-03', type: 'Commitment', amount: 25000000, date: '2023-10-01', description: 'Funding for Lab Expansion' },
];

export const UNFUNDED_REQUIREMENTS: UnfundedRequirement[] = [
  { id: 'UFR-01', title: 'Replace Failing Boilers (P005)', propertyId: 'P005', priority: 'Critical', estimatedCost: 750000, justification: 'Current boilers are past life expectancy and risk catastrophic failure.', submittedBy: 'E-001', status: 'In Review' },
  { id: 'UFR-02', title: 'Security System Upgrade (P001)', propertyId: 'P001', priority: 'High', estimatedCost: 250000, justification: 'Existing CCTV system is outdated and has coverage gaps.', submittedBy: 'E-001', status: 'Submitted' },
];

export const CAPITAL_PLAN: CapitalPlanItem[] = [
  { id: 'CPI-01', projectName: 'Lab Beta Expansion', fiscalYear: 2024, projectedCost: 25000000, fundingStatus: 'Funded', priorityScore: 95 },
  { id: 'CPI-02', projectName: 'P005 Boiler Replacement', fiscalYear: 2025, projectedCost: 750000, fundingStatus: 'Unfunded', priorityScore: 88 },
  { id: 'CPI-03', projectName: 'Portfolio-wide LED Retrofit', fiscalYear: 2025, projectedCost: 1200000, fundingStatus: 'Partial', priorityScore: 82 },
  { id: 'CPI-04', projectName: 'P001 Security Upgrade', fiscalYear: 2026, projectedCost: 250000, fundingStatus: 'Unfunded', priorityScore: 75 },
];

export const INVOICES: Invoice[] = [
  { id: 'INV-001', vendorId: 'V-01', invoiceNumber: 'ACME-1050', invoiceDate: '2023-10-28', dueDate: '2023-11-27', amount: 1200, status: 'Approved', workOrderId: 'WO-2024-889', documentId: 'DOC-03' },
  { id: 'INV-002', vendorId: 'V-04', invoiceNumber: 'BR-200', invoiceDate: '2023-10-15', dueDate: '2023-11-14', amount: 50000, status: 'Paid', purchaseOrderId: 'PO-01', documentId: 'DOC-03' },
  { id: 'INV-003', vendorId: 'V-03', invoiceNumber: 'PRO-980', invoiceDate: '2023-10-30', dueDate: '2023-11-29', amount: 800, status: 'Submitted', workOrderId: 'WO-2024-891', documentId: 'DOC-03' },
];

export const PURCHASE_ORDERS: PurchaseOrder[] = [
  { id: 'PO-01', vendorId: 'V-04', orderDate: '2023-09-01', totalAmount: 250000, status: 'Partially Received', projectId: 'CP-01', items: [{ description: 'Structural Steel', quantity: 50, unitPrice: 3000 }, { description: 'Drywall', quantity: 1000, unitPrice: 100 }] },
  { id: 'PO-02', vendorId: 'V-01', orderDate: '2023-10-26', totalAmount: 1200, status: 'Issued', workOrderId: 'WO-2024-889', items: [{ description: 'Chiller Compressor', quantity: 1, unitPrice: 1200 }] },
];

export const CHARGEBACKS: Chargeback[] = [
  { id: 'CB-01', fromCostCenterId: 'CC-01', toCostCenterId: 'CC-04', amount: 15000, date: '2023-10-01', description: 'Q3 Space Usage Chargeback', type: 'Space' },
  { id: 'CB-02', fromCostCenterId: 'CC-02', toCostCenterId: 'CC-01', amount: 800, date: '2023-10-28', description: 'WO-2024-891 Plumbing Repair', type: 'Service' },
];
