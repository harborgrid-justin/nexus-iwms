export enum Status {
  Active = 'Active',
  Pending = 'Pending',
  Closed = 'Closed',
  Critical = 'Critical',
  Warning = 'Warning',
  Good = 'Good',
  OnTrack = 'On Track',
  AtRisk = 'At Risk',
  Overdue = 'Overdue',
  Planning = 'Planning',
  UnderReview = 'Under Review',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface Notification {
  id: string;
  message: string;
  type: 'alert' | 'info' | 'task';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'CAD' | 'Lease Agreement' | 'Invoice' | 'Permit' | 'Contract' | 'Blueprint' | 'Insurance Policy' | 'Compliance Report';
  url: string;
  uploadedDate: string;
  size: string;
  relatedTo: string; // e.g., 'Property P001', 'Project CP-02'
}

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Office' | 'Industrial' | 'Retail' | 'Lab';
  sizeSqFt: number;
  occupancyRate: number;
  status: Status;
  marketValue: number;
  imageUrl: string;
  documents?: Document[];
  noi: number; // Net Operating Income
  fci: number; // Facility Condition Index (0-100)
}

export interface Lease {
  id:string;
  propertyId: string;
  tenantName: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  criticalDates: { name: string; date: string }[];
}

export interface Contract {
  id: string;
  name: string;
  vendorId: string;
  type: 'Service' | 'Lease' | 'Construction';
  startDate: string;
  endDate: string;
  value: number;
  status: 'Draft' | 'Active' | 'Expired' | 'Terminated';
  renewalDate: string;
  documentId: string;
}

export interface Transaction {
  id: string;
  propertyId: string;
  type: 'Acquisition' | 'Disposition';
  stage: 'Prospecting' | 'Due Diligence' | 'Negotiation' | 'Closing';
  dealValue: number;
  closeDate: string;
  broker: string;
}

export interface MoveRequest {
  id: string;
  employeeName: string;
  fromLocation: string;
  toLocation: string;
  moveDate: string;
  status: 'Requested' | 'Approved' | 'Scheduled' | 'Completed';
}

export interface Workflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  enabled: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  trade: 'HVAC' | 'Plumbing' | 'Electrical' | 'General Contractor' | 'Janitorial';
  rating: number; // 1-5
  onTimeCompletionRate: number; // 0-100
  avgInvoiceCost: number;
}

export interface CostCenter {
  id: string;
  name: string;
  owner: string; // employeeId
  budget: number;
  spent: number;
}

export interface WorkOrder {
  id: string;
  title: string;
  propertyId: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'Open' | 'In Progress' | 'Completed' | 'On Hold';
  category: 'HVAC' | 'Plumbing' | 'Electrical' | 'General' | 'Corrective' | 'Preventive';
  assignedTo: string; // employeeId or vendorId
  dueDate: string;
  cost: number;
  costCenterId: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  location: string;
  costPerUnit: number;
}

export interface SafetyIncident {
  id: string;
  propertyId: string;
  type: 'Injury' | 'Property Damage' | 'Near Miss' | 'Environmental';
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Under Investigation' | 'Closed' | 'Corrective Action Pending';
  description: string;
}

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyEnd: string;
  condition: number; // 0-100
  location: string;
  propertyId: string;
  maintenanceCostYTD?: number;
  downtimeHours?: number;
}

export interface PreventiveMaintenanceSchedule {
  id: string;
  assetId: string;
  task: string;
  frequency: 'Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
  nextDueDate: string;
  lastCompletedDate?: string;
  status: 'Scheduled' | 'Overdue' | 'Completed';
}

export interface SpaceMetric {
  floor: string;
  utilization: number; // 0-100
  department: string;
  seatsTotal: number;
  seatsAvailable: number;
}

export interface Employee {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  location: string; // Assigned desk/office
  phone: string;
  imageUrl: string;
}

export interface ServiceRequest {
  id: string;
  submittedBy: string; // employeeId
  type: 'Temperature' | 'Maintenance' | 'Janitorial' | 'IT';
  location: string;
  status: 'New' | 'In Progress' | 'Resolved';
  createdDate: string;
  details: string;
}

export interface SustainabilityMetric {
  month: string;
  energyKWh: number;
  waterGal: number;
  carbonTons: number;
  wasteKg: number;
  recyclingKg: number;
}

export interface SustainabilityInitiative {
  id: string;
  name: string;
  type: 'Energy' | 'Water' | 'Waste';
  status: 'Planning' | 'In Progress' | 'Completed';
  projectedSavings: string;
  completionDate: string;
}

export interface BudgetLineItem {
  id: string;
  category: 'Labor' | 'Materials' | 'Contingency' | 'Permits' | 'Vendor';
  budgeted: number;
  actual: number;
  variance: number;
}

export interface ProjectRisk {
  id: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  probability: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface CapitalProject {
  id: string;
  name: string;
  propertyId: string;
  type: 'Renovation' | 'New Construction' | 'Major Repair';
  status: Status;
  startDate: string;
  endDate: string;
  totalBudget: number;
  spent: number;
  manager: string; // employeeId
  budgetItems?: BudgetLineItem[];
  risks?: ProjectRisk[];
  documents?: Document[];
}

export interface AuditLog {
  id: string;
  user: string; // employee name
  action: string;
  entity: string; // e.g. "Lease L-102"
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Facility Manager' | 'Technician' | 'Read Only' | 'Financial Analyst';
  lastLogin: string;
}

// NEW INTERFACES FOR EXPANDED FEATURES

export interface Reservation {
  id: string;
  spaceId: string; // e.g. 'HQ-Conf-A', 'HQ-Flex-05'
  spaceName: string;
  reservedBy: string; // employeeId
  date: string;
  startTime: string;
  endTime: string;
  status: 'Confirmed' | 'Cancelled';
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  host: string; // employeeId
  arrival: string; // ISO datetime
  departure?: string; // ISO datetime
  status: 'Expected' | 'Checked In' | 'Checked Out';
}

export interface ComplianceTask {
  id: string;
  name: string;
  type: 'Permit Renewal' | 'Inspection' | 'Audit';
  propertyId: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  assignedTo: string; // employeeId
}

export interface InsurancePolicy {
  id: string;
  propertyId: string;
  provider: string;
  policyNumber: string;
  type: 'Property' | 'Liability' | 'Workers Comp';
  coverageAmount: number;
  premium: number;
  expiryDate: string;
}

export interface UtilityBill {
  id: string;
  propertyId: string;
  utility: 'Electric' | 'Gas' | 'Water' | 'Waste';
  serviceDate: string; // e.g. '2023-10'
  cost: number;
  consumption: number;
  unit: 'kWh' | 'therms' | 'gallons' | 'kg';
  documentId: string;
}

export interface ParkingPermit {
  id: string;
  permitNumber: string;
  assignedTo: string; // employeeId
  lot: string;
  spot?: string;
  vehicle: string; // Make, model, plate
  expiryDate: string;
}

export interface KeyRecord {
  id: string;
  keyNumber: string;
  type: 'Physical Key' | 'Access Card' | 'Fob';
  assignedTo: string; // employeeId
  accesses: string; // e.g. 'HQ Main Entrance, Server Room'
  issueDate: string;
  returnDate?: string;
}

export interface ConditionAssessment {
  id: string;
  assetId: string;
  assessmentDate: string;
  assessedBy: string; // employeeId
  conditionScore: number; // 0-100
  notes: string;
  recommendedAction: string;
}
