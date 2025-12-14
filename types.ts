
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
  type: 'alert' | 'info' | 'task' | 'warning';
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'CAD' | 'Lease Agreement' | 'Invoice' | 'Permit' | 'Contract' | 'Blueprint' | 'Insurance Policy' | 'Compliance Report' | 'Purchase Order' | 'Change Order' | 'Appraisal Report' | 'Conveyance' | 'NEPA Study' | 'Disposal Authorization' | 'Determination of Excess' | 'Relocation Notice' | 'Benefit Claim' | 'Remediation Plan' | 'Solicitation Package' | 'Bid Response' | 'Legal Correspondence' | 'Evidence' | 'Cost Share Agreement' | 'Inspection Report' | 'Regulatory Permit' | 'Deed' | 'Easement Agreement' | 'Recruiting Lease';
  url: string;
  uploadedDate: string;
  size: string;
  relatedTo: string;
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
  noi: number;
  fci: number;
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
  camCharge: number;
  clauses?: LeaseClause[];
}

export interface LeaseClause {
  id: string;
  leaseId: string;
  name: 'Renewal Option' | 'Termination Option' | 'Rent Escalation' | 'CAM Cap';
  details: string;
  criticalDate?: string;
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
  assetId?: string; // Integration Point
  relatedIncidentId?: string; // Integration Point
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
  category: 'Labor' | 'Materials' | 'Contingency' | 'Permits' | 'Vendor' | 'Design' | 'Construction';
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
  milestones?: ProjectMilestone[];
  changeOrders?: ChangeOrder[];
}

export interface ProjectMilestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface ChangeOrder {
  id: string;
  projectId: string;
  title: string;
  reason: 'Client Request' | 'Unforeseen Condition' | 'Design Change';
  costImpact: number;
  scheduleImpactDays: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
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
  role: 'Admin' | 'Facility Manager' | 'Technician' | 'Read Only' | 'Financial Analyst' | 'Project Manager' | 'Disposal Officer' | 'Relocation Specialist' | 'Environmental Specialist' | 'Contracting Officer' | 'Legal Officer' | 'Mobilization Planner' | 'Cost-Share Manager' | 'Out-Grant Admin' | 'Regulatory Specialist' | 'Real Property Accountable Officer';
  lastLogin: string;
}

export interface Reservation {
  id: string;
  spaceId: string;
  spaceName: string;
  reservedBy: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'Confirmed' | 'Cancelled';
}

export interface Visitor {
  id: string;
  name: string;
  company: string;
  host: string;
  arrival: string;
  departure?: string;
  status: 'Expected' | 'Checked In' | 'Checked Out';
}

export interface ComplianceTask {
  id: string;
  name: string;
  type: 'Permit Renewal' | 'Inspection' | 'Audit';
  propertyId: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  assignedTo: string;
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
  serviceDate: string;
  cost: number;
  consumption: number;
  unit: 'kWh' | 'therms' | 'gallons' | 'kg';
  documentId: string;
}

export interface ParkingPermit {
  id: string;
  permitNumber: string;
  assignedTo: string;
  lot: string;
  spot?: string;
  vehicle: string;
  expiryDate: string;
}

export interface KeyRecord {
  id: string;
  keyNumber: string;
  type: 'Physical Key' | 'Access Card' | 'Fob';
  assignedTo: string;
  accesses: string;
  issueDate: string;
  returnDate?: string;
}

export interface ConditionAssessment {
  id: string;
  assetId: string;
  assessmentDate: string;
  assessedBy: string;
  conditionScore: number;
  notes: string;
  recommendedAction: string;
}

export interface PpbeFund {
  id: string;
  name: string;
  appropriationType: 'O&M' | 'MILCON' | 'RDT&E' | 'Procurement';
  fiscalYear: number;
  programElement: string;
  totalAmount: number;
  committed: number;
  obligated: number;
  expended: number;
}

export interface FundTransaction {
  id: string;
  fundId: string;
  projectId?: string;
  workOrderId?: string;
  relocationCaseId?: string;
  environmentalSiteId?: string; 
  legalClaimId?: string;
  type: 'Commitment' | 'Obligation' | 'Expenditure';
  amount: number;
  date: string;
  description: string;
}

export interface UnfundedRequirement {
  id: string;
  title: string;
  propertyId: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  estimatedCost: number;
  justification: string;
  submittedBy: string;
  status: 'Submitted' | 'In Review' | 'Approved for Funding' | 'Deferred';
}

export interface CapitalPlanItem {
  id: string;
  projectName: string;
  fiscalYear: number;
  projectedCost: number;
  fundingStatus: 'Funded' | 'Partial' | 'Unfunded';
  priorityScore: number;
}

export interface Invoice {
  id: string;
  vendorId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Paid' | 'Disputed';
  purchaseOrderId?: string;
  workOrderId?: string;
  documentId: string;
}

export interface PurchaseOrder {
  id: string;
  vendorId: string;
  orderDate: string;
  totalAmount: number;
  status: 'Draft' | 'Issued' | 'Partially Received' | 'Received' | 'Closed';
  workOrderId?: string;
  projectId?: string;
  items: { description: string; quantity: number; unitPrice: number }[];
}

export interface Chargeback {
  id: string;
  fromCostCenterId: string;
  toCostCenterId: string;
  amount: number;
  date: string;
  description: string;
  type: 'Space' | 'Service';
}

export interface AuditEvent {
  timestamp: string;
  user: string;
  action: string;
  details?: string;
}

export interface AssetComponent {
  id: string;
  parentAssetId: string;
  parentImprovementId?: string;
  name: string;
  type: 'Improvement' | 'Component' | 'Betterment';
  lifecycleState: 'Planned' | 'Active' | 'Modified' | 'Retired' | 'Archived';
  installDate: string;
  cost: number;
  appraisalValue?: number;
  description?: string;
  history?: AuditEvent[];
}

// Req 19: RPUID Governance
export interface RPUIDMetadata {
    authority: string; // e.g. "DoDI 4165.14"
    generationMethod: 'System Generated' | 'Migrated';
    generationDate: string;
}

export interface RealPropertyAsset {
  id: string;
  rpuid: string; // 19.1.1 Unique Identifier
  rpuidStatus: 'Issued' | 'Active' | 'Inactive' | 'Archived' | 'Historical'; // 19.7.1
  rpuidMetadata?: RPUIDMetadata; // 19.1.4
  
  name: string;
  assetCategoryCode: string;
  type: 'Land' | 'Building' | 'Structure' | 'Linear Structure';
  status: 'Active' | 'Excess' | 'Disposed' | 'In Progress' | 'Archive';
  location: string;
  acquisitionDate: string;
  cost: number;
  area: number;
  unit: 'Acres' | 'SqFt';
  program: 'Military' | 'Civil Works';
  mobilizationUse: boolean;
  cefmsSyncStatus: 'Synced' | 'Pending' | 'Error';
  cefmsId?: string; // 19.6.2 Linkage
  components?: AssetComponent[];
  history?: AuditEvent[];
}

export interface UtilizationSummary {
    id: string;
    outGrantId: string;
    observedUse: string;
    isCompliant: boolean;
    lastUpdated: string;
    updatedBy: string;
}

export interface InspectionFinding {
  id: string;
  description: string;
  severity: 'Critical' | 'Major' | 'Minor';
  status: 'Open' | 'Closed';
}

export interface InspectionRecommendation {
  id: string;
  description: string;
  response?: string;
  correctiveActionPlan?: string;
}

export interface UtilizationInspection {
  id: string;
  assetId: string;
  outGrantId?: string;
  inspectionDate: string;
  scope: string;
  criteria: string;
  teamComposition: string;
  responsibleOrg: string;
  type: 'Routine' | 'Compliance' | 'Termination' | 'Utilization' | 'Audit';
  inspector: string;
  lifecycleState: 'Planned' | 'Scheduled' | 'In Progress' | 'Completed' | 'Reviewed' | 'Approved' | 'Closed' | 'Archived';
  status: string;
  findings: InspectionFinding[];
  recommendations: InspectionRecommendation[];
  utilizationSummary?: string;
  correctiveActions?: string;
  reportDocumentId?: string;
  history: AuditEvent[];
}

export type OutGrantInspection = UtilizationInspection;

export interface OutGrant {
  id: string;
  assetId: string;
  grantee: string;
  type: 'Lease' | 'License' | 'Easement' | 'Permit';
  authority: string;
  permittedUse: string;
  startDate: string;
  endDate: string;
  revenue: number;
  lifecycleState: 'Proposed' | 'Active' | 'Amended' | 'Suspended' | 'Expired' | 'Terminated' | 'Closed' | 'Archived';
  status: string;
  utilizationSummary?: UtilizationSummary;
  documentIds: string[];
  history: AuditEvent[];
}

export interface Appraisal {
  id: string;
  assetId: string;
  relatedActionId: string;
  appraisalDate: string;
  appraisedValue: number;
  appraiser: string;
  appraiserQualifications: string;
  type: 'Market Value' | 'In-Kind Consideration';
  purpose: 'Acquisition' | 'Disposal' | 'Outgrant';
  scope: string;
  assumptions: string;
  status: 'Initiated' | 'In Progress' | 'Under Review' | 'Approved' | 'Archived';
  documentId: string;
  history?: AuditEvent[];
}

export interface AcquisitionRecord {
  id: string;
  assetId: string;
  stage: 'Planning' | 'Site Selection' | 'NEPA Review' | 'Appraisal' | 'Negotiation' | 'Condemnation' | 'Closing' | 'Closed' | 'Terminated';
  cost: number;
  fundingSource: string;
  acquisitionMethod: 'Purchase' | 'Donation' | 'Transfer' | 'Condemnation';
  closeDate: string;
  authority: string;
  purpose: string;
  statutoryBasis: string;
  interestType: 'Fee' | 'Easement' | 'Leasehold' | 'Permit';
  estateAcquired: string;
  responsibleOrg: string;
  appraisalIds: string[];
  negotiationIds: string[];
  approvalIds: string[];
  history?: AuditEvent[];
}

export interface DisposalRecord {
  id: string;
  assetId: string;
  lifecycleState: 'Initiated' | 'Excess Determined' | 'Pending Authorization' | 'Authorized' | 'Executed' | 'Closed' | 'Archived';
  stage: string;
  initiatingOrg: string;
  disposalRationale: string;
  proposedMethod: 'Public Sale' | 'Transfer' | 'Donation' | 'Demolition' | 'Exchange';
  excessDeterminationDate?: string;
  excessDeterminationAuthority?: string;
  excessDeterminationJustification?: string;
  authorizationStatus: 'Pending' | 'Approved' | 'Rejected' | 'Not Started';
  authorizationDate?: string;
  authorizingOfficial?: string;
  proceeds?: number;
  completionDate?: string;
  appraisalIds: string[];
  environmentalSiteIds: string[];
  legalClaimIds: string[];
  documentIds: string[];
  history: AuditEvent[];
}

export interface RelocationBenefit {
    id: string;
    type: 'Moving Expenses' | 'Replacement Housing' | 'Business Reestablishment' | 'Advisory Services';
    amountClaimed: number;
    amountApproved: number;
    status: 'Submitted' | 'Approved' | 'Paid' | 'Rejected';
    approvalDate?: string;
    paymentReference?: string;
}

export interface RelocationCase {
    id: string;
    acquisitionId: string;
    assetId: string;
    claimantName: string;
    claimantType: 'Residential Owner' | 'Residential Tenant' | 'Business' | 'Farm' | 'Non-Profit';
    displacementType: 'Physical' | 'Economic';
    lifecycleState: 'Initiated' | 'Eligibility Determined' | 'Assistance Approved' | 'Assistance Provided' | 'Closed' | 'Archived';
    status: string;
    initiationDate: string;
    eligibilityDeterminationDate?: string;
    vacationDate?: string;
    caseCloseDate?: string;
    totalAssistance: number;
    totalBenefitsPaid: number;
    benefits: RelocationBenefit[];
    history: AuditEvent[];
    documentIds: string[];
    payments: any[]; 
}

export interface EnvironmentalSite {
  id: string;
  assetId: string;
  siteName: string;
  lifecycleState: 'Identified' | 'Assessed' | 'Under Remediation' | 'Compliant' | 'Closed' | 'Archived';
  status: string;
  initiatingOrg: string;
  initiationDate: string;
  authority: string;
  programApplicability: ('NEPA' | 'CERCLA' | 'RCRA' | 'Clean Water Act')[];
  contaminants: string[];
  riskClassification: 'High' | 'Medium' | 'Low';
  contaminationIndicators?: string;
  remediationActions: { description: string; status: 'Planned' | 'In Progress' | 'Completed'; date: string }[];
  relatedActionId?: string;
  documentIds: string[];
  history?: AuditEvent[];
}

export interface BidItem {
  id: string;
  solicitationId: string;
  itemNumber: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface IfbResponse {
  id: string;
  solicitationId: string;
  bidderName: string;
  submissionDate: string;
  totalBidAmount: number;
  status: 'Received' | 'Opened' | 'Evaluated' | 'Selected' | 'Rejected' | 'Archived';
  documentId?: string;
}

export interface Solicitation {
  id: string;
  assetId: string;
  title: string;
  type: 'Invitation for Bid (IFB)' | 'Request for Proposal (RFP)';
  procurementMethod: 'Sealed Bidding' | 'Negotiated' | 'Simplified';
  lifecycleState: 'Draft' | 'Issued' | 'Amended' | 'Closed' | 'Under Evaluation' | 'Awarded' | 'Cancelled' | 'Archived';
  status: string;
  issueDate?: string;
  closeDate?: string;
  description?: string;
  pointOfContact?: string;
  bidItems?: BidItem[]; 
  responses?: IfbResponse[]; 
  documentIds: string[];
  history: AuditEvent[];
  openDate: string;
}

export interface LegalClaim {
  id: string;
  assetId: string;
  claimant: string;
  claimantInfo: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  claimType: 'Tort' | 'Title Dispute' | 'Contract' | 'Relocation Appeal' | 'Property Damage';
  lifecycleState: 'Received' | 'Under Investigation' | 'Adjudicated' | 'Settled' | 'Denied' | 'Paid' | 'Closed' | 'Archived';
  status: string;
  incidentDate: string;
  filedDate: string;
  statutoryBasis: string;
  jurisdiction: string;
  assignedOffice: string;
  responsibleOfficial: string;
  description: string;
  claimAmount: number;
  settlementAmount?: number;
  paymentDetails?: {
    amount: number;
    date: string;
    authority: string;
    transactionReference: string;
  };
  documentIds: string[];
  history: AuditEvent[];
}

export interface CostShareContribution {
  id: string;
  type: 'Cash' | 'In-Kind' | 'LERRD' | 'Work-In-Kind';
  description: string;
  amount: number;
  valuationMethod: 'Market Value' | 'Actual Cost' | 'Negotiated Value';
  dateRecorded: string;
  status: 'Pending' | 'Verified' | 'Credited';
}

export interface CostShareAgreement {
  id: string;
  assetId: string;
  projectId: string;
  partner: string;
  sponsor: string;
  authority: string;
  statutoryBasis: string;
  costShareRatio: string;
  federalSharePercentage: number;
  totalProjectCost: number;
  partnerContribution: number;
  lifecycleState: 'Initiated' | 'Agreed' | 'Active' | 'Adjusted' | 'Completed' | 'Closed' | 'Archived';
  status: string;
  agreementDate: string;
  responsibleOrg: string;
  contributions: CostShareContribution[];
  documentIds: string[];
  history: AuditEvent[];
}

export interface WorkActivity {
  id: string;
  taskId: string;
  description: string;
  plannedDate: string;
  actualDate?: string;
  outcome?: string;
  responsibleParty: string; // 17.1.4
  evidenceDocumentId?: string; // 17.3.3
}

export interface EncroachmentTask {
  id: string;
  caseId: string;
  title: string;
  type: 'Investigation' | 'Survey' | 'Notice' | 'Legal Referral' | 'Restoration';
  assignedTo: string;
  dueDate: string;
  lifecycleState: 'Assigned' | 'In Progress' | 'Blocked' | 'Completed' | 'Verified' | 'Closed'; // 17.7.2
  workActivities: WorkActivity[]; // 17.1.4
}

export interface EncroachmentCase {
  id: string;
  assetId: string;
  type: 'Structure' | 'Vegetation' | 'Use' | 'Boundary'; // 17.1.3
  discoveryDate: string; // 17.1.3
  locationDescription: string; // 17.1.3
  initialAssessment: string; // 17.1.3
  
  lifecycleState: 'Reported' | 'Triaged' | 'Investigated' | 'Action Planned' | 'Under Corrective Action' | 'Resolved' | 'Closed' | 'Archived'; // 17.7.1
  status: string; // Mapped for backward compatibility
  
  // 17.1.5 Associations
  relatedOutGrantId?: string;
  relatedPermitId?: string;
  relatedInspectionId?: string;
  relatedLegalClaimId?: string;
  
  resolution?: string; // Final outcome
  responsibleOfficial: string; // 17.3.4
  dateReported: string; // Legacy
  
  tasks: EncroachmentTask[]; // 17.1.2
  documentIds: string[];
  history: AuditEvent[]; // 17.8.1
}

export interface MobilizationProfile {
  id: string;
  assetId: string;
  lifecycleState: 'Identified' | 'Validated' | 'Ready' | 'Activated' | 'Deactivated' | 'Archived';
  missionCriticality: 'Mission Critical' | 'Mission Essential' | 'Non-Critical';
  readinessDesignation: 'P1 - Immediate' | 'P2 - 24 Hours' | 'P3 - 72 Hours' | 'Reserve';
  facilityType: string;
  functionalCapability: string;
  condition: number;
  contingencyPlanId?: string;
  operationalRequirement?: string;
  initiatingOrg: string;
  initiationDate: string;
  lastUpdatedDate: string;
  responsibleOfficial: string;
  history: AuditEvent[];
}

export interface PermitParty {
  id: string;
  permitId: string;
  role: 'Applicant' | 'Permittee' | 'Agent';
  name: string;
  email?: string;
  phone?: string;
}

export interface PermitAddress {
  id: string;
  permitId: string;
  type: 'Mailing' | 'Site';
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
}

export interface Permit {
  id: string;
  assetId: string;
  uniqueIdentifier: string;
  type: 'Section 10' | 'Section 404' | 'Section 408' | 'General';
  authority: string;
  issueDate?: string;
  effectiveDate?: string;
  expirationDate?: string;
  lifecycleState: 'Drafted' | 'Submitted' | 'Under Review' | 'Issued' | 'Active' | 'Amended' | 'Suspended' | 'Revoked' | 'Expired' | 'Closed' | 'Archived';
  status: string;
  description: string;
  parties: PermitParty[];
  addresses: PermitAddress[];
  documentIds: string[];
  history: AuditEvent[];
}

export interface RealPropertyLinkage {
  id: string;
  assetId: string;
  instrumentType: 'Contract' | 'Agreement' | 'Deed' | 'Easement' | 'Conveyance' | 'Permit';
  instrumentNumber: string;
  description: string;
  executingAuthority: string;
  effectiveDate: string;
  expirationDate?: string;
  lifecycleState: 'Established' | 'Active' | 'Amended' | 'Superseded' | 'Inactive' | 'Archived';
  status: string;
  initiatingOrg: string;
  relatedDocumentId?: string;
  history: AuditEvent[];
}

// Requirement 18: Cartographic & GIS Enablement
export interface GeospatialMetadata {
  dataSource: string; // 18.1.5
  collectionMethod: string;
  accuracy: string; // e.g. "Sub-meter"
  captureDate: string;
  coordinateSystem: string; // 18.1.3
}

export interface GeospatialFeature {
  id: string;
  entityId: string; // Link to Asset or Task (18.1.3, 18.1.4)
  entityType: 'Asset' | 'Inspection' | 'Encroachment' | 'WorkActivity';
  geometryType: 'Point' | 'Line' | 'Polygon';
  coordinates: { lat: number; lng: number } | { lat: number; lng: number }[]; // Simplified for mock
  layerId: string; // 18.1.4
  metadata: GeospatialMetadata; // 18.1.5
  lifecycleState: 'Drafted' | 'Validated' | 'Published' | 'Updated' | 'Retired' | 'Archived'; // 18.7.1
  responsibleOfficial: string; // 18.3.3
  history: AuditEvent[]; // 18.8.1
}

export interface GeospatialLayer {
  id: string;
  name: string;
  type: 'Feature' | 'Raster' | 'Map Service';
  description: string;
  ownerOrg: string;
  lifecycleState: 'Drafted' | 'Published' | 'Retired';
  classification: 'Unclassified' | 'CUI' | 'Secret'; // 18.5.2
}

// --- RFMIS (Recruiting Facilities Management Information System) Interfaces ---

export interface RecruitingFacility {
  id: string;
  rsid: string; // Recruiting Station ID (Unique)
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  
  // Organization Hierarchy
  recruitingBrigade: string; // e.g., '1st Recruiting Brigade'
  recruitingBattalion: string; // e.g., 'New York City Battalion'
  serviceComponent: 'Army' | 'Navy' | 'Air Force' | 'Marines' | 'Joint';
  
  // Property Attributes
  type: 'Storefront' | 'Free-standing' | 'Mall' | 'Government Owned';
  status: 'Active' | 'Closing' | 'Relocating' | 'Planned' | 'Suspended';
  sizeSqFt: number;
  usableSqFt: number;
  
  // Lifecycle & Management
  lifecycleStage: 'Planning' | 'Acquisition' | 'Occupancy' | 'Sustainment' | 'Disposal';
  usaceDistrict: string; // e.g., 'New York District (NAN)'
  
  // Metrics (Req 6)
  fci: number; // Facility Condition Index
  suitabilityScore: number; // 0-100 (Req 4)
  
  // GIS (Req 10)
  coordinates: { lat: number; lng: number };
  catchmentAreaRadiusMiles: number;
  
  history: AuditEvent[];
}

export interface RecruitingLease {
  id: string;
  facilityId: string; // Links to RecruitingFacility
  leaseNumber: string;
  landlordName: string;
  landlordContact: { name: string; phone: string; email: string };
  
  startDate: string;
  expirationDate: string;
  annualRent: number;
  
  // Terms (Req 2)
  renewalOptions: string; // e.g., '2 x 1 Year'
  terminationRights: string; // e.g., '30 days notice for convenience'
  
  // Services (Req 11)
  servicesIncluded: ('Janitorial' | 'Utilities' | 'Security' | 'Maintenance')[];
  
  status: 'Active' | 'Holdover' | 'Expired' | 'Terminated';
  history: AuditEvent[];
}

export interface SRMProject {
  id: string;
  facilityId: string;
  name: string;
  type: 'Sustainment' | 'Restoration' | 'Modernization';
  status: 'Planning' | 'Funded' | 'In Progress' | 'Completed' | 'Cancelled';
  
  estimatedCost: number;
  actualCost: number;
  fiscalYear: number;
  fundingSource: string; // e.g., 'O&M Army'
  
  description: string;
  contractor?: string;
  completionDate?: string;
}
