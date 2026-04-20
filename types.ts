
export type Status = 'OnTrack' | 'AtRisk' | 'Overdue' | 'Completed' | 'Pending' | 'Planning' | 'Good' | 'Warning' | 'Critical';

export interface AuditEvent {
  timestamp: string;
  user: string;
  action: string;
  details?: string;
}

export interface ValidationResult {
    allowed: boolean;
    reason?: string;
}

export interface ChangeOrder {
    id: string;
    title: string;
    status: string;
    costImpact: number;
    scheduleImpactDays: number;
}

export interface ProjectMilestone {
    id: string;
    name: string;
    dueDate: string;
    status: string;
}

// Encroachment Types (Requirement 17)

export type EncroachmentState = 'Reported' | 'Triaged' | 'Investigated' | 'Action Planned' | 'Under Corrective Action' | 'Resolved' | 'Closed' | 'Archived';

export interface WorkActivity {
  id: string;
  taskId: string;
  action: string; // e.g. "Site Visit", "Notice Sent", "Meeting"
  date: string;
  performedBy: string; // employeeId or name
  outcome: string;
  evidenceDocumentId?: string;
}

export interface EncroachmentTask {
  id: string;
  caseId: string;
  description: string;
  assignedTo: string; // employeeId
  dueDate: string;
  status: 'Assigned' | 'In Progress' | 'Blocked' | 'Completed' | 'Verified';
  activities: WorkActivity[];
}

export interface EncroachmentCase {
  id: string;
  assetId: string;
  relatedOutGrantId?: string; // Link to Outgrant if applicable
  type: 'Structure' | 'Vegetation' | 'Use' | 'Unauthorized Access' | 'Dumping';
  dateReported: string;
  discoveryMethod: 'Inspection' | 'Public Report' | 'Remote Sensing' | 'Patrol';
  
  locationDescription: string;
  initialAssessment: string;
  
  lifecycleState: EncroachmentState;
  status: string; // Mapped to lifecycleState for backward compatibility
  
  resolutionPlan?: string;
  responsibleOfficial: string;
  
  tasks: EncroachmentTask[];
  documentIds: string[];
  history: AuditEvent[];
}

// USACE REMIS Types

export interface RealPropertyAsset {
    id: string;
    rpuid: string;
    name: string;
    location: string;
    program: 'Civil Works' | 'Military';
    type: string;
    status: 'Active' | 'Excess' | 'Disposed' | 'Archive' | 'In Progress';
    cefmsSyncStatus: 'Synced' | 'Pending' | 'Error';
    assetCategoryCode: string;
    mobilizationUse: string;
    area: number;
    unit: string;
    acquisitionDate: string;
    cost: number;
    components?: { id: string; name: string; type: string; cost: number }[];
    history?: AuditEvent[];
}

export interface AcquisitionRecord {
    id: string;
    assetId: string;
    stage: 'Planning' | 'Site Selection' | 'NEPA Review' | 'Appraisal' | 'Negotiation' | 'Condemnation' | 'Closing' | 'Closed' | 'Terminated';
    acquisitionMethod: string;
    interestType: string;
    purpose: string;
    authority: string;
    statutoryBasis: string;
    responsibleOrg: string;
    fundingSource: string;
    cost: number;
    closeDate: string;
    appraisalIds: string[];
    history?: AuditEvent[];
}

export interface DisposalRecord {
    id: string;
    assetId: string;
    lifecycleState: 'Initiated' | 'Excess Determined' | 'Pending Authorization' | 'Authorized' | 'Executed' | 'Closed' | 'Archived';
    initiatingOrg: string;
    proposedMethod: string;
    disposalRationale: string;
    excessDeterminationDate?: string;
    excessDeterminationAuthority?: string;
    excessDeterminationJustification?: string;
    authorizationStatus: string;
    authorizingOfficial?: string;
    authorizationDate?: string;
    completionDate?: string;
    proceeds?: number;
    appraisalIds: string[];
    environmentalSiteIds: string[];
    legalClaimIds: string[];
    documentIds: string[];
    history?: AuditEvent[];
}

export interface OutGrant {
    id: string;
    assetId: string;
    grantee: string;
    type: string;
    authority: string;
    permittedUse: string;
    startDate: string;
    endDate: string;
    revenue: number;
    insuranceProof: boolean;
    publicBenefitAllowance: boolean;
    lifecycleState: 'Proposed' | 'Active' | 'Amended' | 'Suspended' | 'Expired' | 'Terminated' | 'Closed' | 'Archived';
    utilizationSummary?: { isCompliant: boolean; lastUpdated: string; updatedBy: string; observedUse: string; };
    documentIds: string[];
    history?: AuditEvent[];
}

export interface OutGrantInspection {
    id: string;
    outGrantId: string;
    inspectionDate: string;
    type: string;
    inspector: string;
    status: string;
    findings: string;
    correctiveActions?: string;
}

export interface Appraisal {
    id: string;
    assetId: string;
    appraiser: string;
    appraisalDate: string;
    type: string;
    purpose: string;
    appraisedValue: number;
    status: 'In Progress' | 'Under Review' | 'Approved' | 'Archived';
    relatedActionId?: string;
    appraiserQualifications?: string;
    scope?: string;
    assumptions?: string;
    history?: AuditEvent[];
}

export interface EnvironmentalSite {
    id: string;
    assetId: string;
    siteName: string;
    initiatingOrg: string;
    initiationDate: string;
    authority: string;
    riskClassification: 'Low' | 'Medium' | 'High';
    lifecycleState: 'Identified' | 'Assessed' | 'Under Remediation' | 'Compliant' | 'Closed' | 'Archived';
    status: string; // Mapped to lifecycleState
    contaminants: string[];
    contaminationIndicators: string;
    programApplicability: string[];
    remediationActions: { description: string; date: string; status: string }[];
    documentIds: string[];
    history?: AuditEvent[];
}

export interface LegalClaim {
    id: string;
    assetId: string;
    claimant: string;
    claimantInfo: { name: string; address?: string; phone?: string; email?: string };
    claimType: string;
    lifecycleState: 'Received' | 'Under Investigation' | 'Adjudicated' | 'Settled' | 'Denied' | 'Paid' | 'Closed' | 'Archived';
    filedDate: string;
    incidentDate: string;
    claimAmount: number;
    settlementAmount?: number;
    description: string;
    statutoryBasis: string;
    jurisdiction: string;
    assignedOffice: string;
    responsibleOfficial: string;
    paymentDetails?: { amount: number; date: string; authority: string; transactionReference: string };
    documentIds: string[];
    history?: AuditEvent[];
}

export interface RelocationCase {
    id: string;
    acquisitionId: string;
    assetId?: string;
    claimantName: string;
    claimantType: string;
    displacementType: string;
    initiationDate: string;
    eligibilityDeterminationDate?: string;
    lifecycleState: 'Initiated' | 'Eligibility Determined' | 'Assistance Approved' | 'Assistance Provided' | 'Closed' | 'Archived';
    totalAssistance: number;
    totalBenefitsPaid: number;
    benefits: { id: string; type: string; amountClaimed: number; amountApproved: number; status: string }[];
    documentIds: string[];
    history?: AuditEvent[];
}

export interface Solicitation {
    id: string;
    assetId: string;
    title: string;
    type: string;
    procurementMethod: string;
    lifecycleState: 'Draft' | 'Issued' | 'Amended' | 'Closed' | 'Under Evaluation' | 'Awarded' | 'Cancelled' | 'Archived';
    issueDate?: string;
    closeDate?: string;
    description?: string;
    pointOfContact?: string;
    bidItems?: { id: string; itemNumber: string; description: string; quantity: number; unit: string }[];
    responses?: { id: string; bidderName: string; submissionDate: string; totalBidAmount: number; status: string }[];
    documentIds: string[];
    history?: AuditEvent[];
}

export interface MobilizationProfile {
    id: string;
    assetId: string;
    missionCriticality: 'Mission Critical' | 'Mission Essential' | 'Non-Critical';
    readinessDesignation: string;
    lifecycleState: 'Identified' | 'Validated' | 'Ready' | 'Activated' | 'Deactivated' | 'Archived';
    condition: number;
    facilityType: string;
    functionalCapability: string;
    contingencyPlanId?: string;
    operationalRequirement?: string;
    initiatingOrg: string;
    initiationDate: string;
    lastUpdatedDate: string;
    responsibleOfficial: string;
    history?: AuditEvent[];
}

export interface CostShareContribution {
    dateRecorded: string;
    type: string;
    description: string;
    valuationMethod: string;
    amount: number;
    status: string;
}

export interface CostShareAgreement {
    id: string;
    assetId: string;
    projectId: string;
    sponsor: string; // partner
    partner: string;
    agreementDate: string;
    authority: string;
    statutoryBasis: string;
    costShareRatio: string;
    federalSharePercentage: number;
    totalProjectCost: number;
    partnerContribution: number;
    responsibleOrg: string;
    lifecycleState: 'Initiated' | 'Agreed' | 'Active' | 'Adjusted' | 'Completed' | 'Closed' | 'Archived';
    contributions: CostShareContribution[];
    documentIds: string[];
    history?: AuditEvent[];
}

export interface Permit {
    id: string;
    assetId: string;
    uniqueIdentifier: string;
    type: string;
    authority: string;
    description: string;
    lifecycleState: 'Drafted' | 'Submitted' | 'Under Review' | 'Issued' | 'Active' | 'Expired' | 'Closed' | 'Archived';
    status: string; // Mapped to lifecycleState
    issueDate?: string;
    effectiveDate?: string;
    expirationDate?: string;
    parties: { role: string; name: string; email?: string; phone?: string }[];
    addresses: { type: string; addressLine1: string; city: string; state: string; zip: string }[];
    documentIds: string[];
    history?: AuditEvent[];
}
