
import { 
    RealPropertyAsset, DisposalRecord, MobilizationProfile,
    Appraisal, AcquisitionRecord, EnvironmentalSite, CostShareAgreement,
    OutGrant, LegalClaim, EncroachmentCase
} from '../types';

export interface ValidationResult {
    allowed: boolean;
    reason?: string;
}

// Rule 1: Disposal Status Check (40 U.S.C. §521)
export const checkAssetDisposalStatus = (asset: RealPropertyAsset, disposals: DisposalRecord[]): ValidationResult => {
    const activeDisposal = disposals.find(d => d.assetId === asset.id && d.lifecycleState !== 'Closed' && d.lifecycleState !== 'Archived');
    if (asset.status === 'Disposed' && !activeDisposal) {
        return { allowed: false, reason: 'Rule 1: Asset cannot be marked Disposed without a closed Disposal Record.' };
    }
    return { allowed: true };
};

// Rule 10: Mobilization Criticality (10 U.S.C. §2801)
export const validateMobilizationCriticality = (asset: RealPropertyAsset, mobilizationProfiles: MobilizationProfile[]): ValidationResult => {
    const profile = mobilizationProfiles.find(p => p.assetId === asset.id);
    if (asset.status === 'Excess' && profile?.missionCriticality === 'Mission Critical') {
        return { allowed: false, reason: 'Rule 10: Mission Critical assets cannot be marked Excess without readiness downgrade.' };
    }
    return { allowed: true };
};

// Rule 25: Component Cost Summation (CFR 41 §102-71.20)
export const validateComponentCosts = (asset: RealPropertyAsset): ValidationResult => {
    if (!asset.components || asset.components.length === 0) return { allowed: true };
    const componentSum = asset.components.reduce((sum, c) => sum + c.cost, 0);
    if (componentSum > asset.cost) {
        return { allowed: false, reason: `Rule 25: Sum of component costs ($${componentSum}) exceeds total asset cost ($${asset.cost}).` };
    }
    return { allowed: true };
};

// Rule 20: NEPA Clearance for Acquisition (42 U.S.C. §4321)
export const validateNEPAForAcquisition = (acquisition: AcquisitionRecord, sites: EnvironmentalSite[]): ValidationResult => {
    // If acquisition is closing, ensure no open high-risk env sites
    // This logic assumes we can link env sites to acquisitions via asset ID or explicit link. 
    // Simplified: check if asset has any active environmental sites.
    const activeEnvIssues = sites.filter(s => s.assetId === acquisition.assetId && s.status !== 'Compliant' && s.status !== 'Closed');
    if (activeEnvIssues.length > 0) {
        return { allowed: false, reason: 'Rule 20: Cannot close acquisition with unresolved environmental issues (NEPA/CERCLA).' };
    }
    return { allowed: true };
};

// Rule 26: Funding Obligation (31 U.S.C. §1501)
export const validateAcquisitionFunding = (acquisition: AcquisitionRecord, transactions: any[]): ValidationResult => {
    // Mock check: ensure at least one "Obligation" transaction exists for this acquisition/project
    // Simplified for mock data structures
    return { allowed: true }; 
};

// Rule 28: Appraisal Recency (49 CFR 24.103)
export const validateAppraisalRecency = (appraisal: Appraisal): ValidationResult => {
    const appDate = new Date(appraisal.appraisalDate);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    if (appDate < sixMonthsAgo) {
        return { allowed: false, reason: 'Rule 28: Appraisal is older than 6 months. Update may be required.' };
    }
    return { allowed: true };
};

// Rule 2: Disposal Authorization (40 U.S.C. §545)
export const validateDisposalAuthorization = (disposal: DisposalRecord): ValidationResult => {
    if (disposal.lifecycleState === 'Authorized' && (!disposal.excessDeterminationDate || !disposal.excessDeterminationAuthority)) {
        return { allowed: false, reason: 'Rule 2: Cannot authorize disposal without Report of Excess determination.' };
    }
    return { allowed: true };
};

// Rule 7: Environmental Clearance for Disposal (CERCLA §120(h))
export const validateEnvironmentalForDisposal = (disposal: DisposalRecord, sites: EnvironmentalSite[]): ValidationResult => {
    // Check if linked sites are compliant
    const linkedSites = sites.filter(s => disposal.environmentalSiteIds.includes(s.id));
    const nonCompliant = linkedSites.filter(s => s.status !== 'Compliant' && s.status !== 'Closed');
    if (nonCompliant.length > 0) {
        return { allowed: false, reason: 'Rule 7: Cannot execute disposal. Linked environmental sites are not compliant.' };
    }
    return { allowed: true };
};

// Rule 27: Proceeds Verification (40 U.S.C. §571)
export const validateDisposalProceeds = (disposal: DisposalRecord): ValidationResult => {
    if (disposal.proposedMethod === 'Public Sale' && (!disposal.proceeds || disposal.proceeds <= 0)) {
        return { allowed: false, reason: 'Rule 27: Public Sale requires proceeds to be recorded before closing.' };
    }
    return { allowed: true };
};

// Rule 49: Clean Water Act Check (33 U.S.C. §1344)
export const validateDisposalClean = (disposal: DisposalRecord, sites: EnvironmentalSite[]): ValidationResult => {
    // Similar to Rule 7 but specific to wetlands/water if data existed
    return { allowed: true };
};

// Rule 4: Outgrant Term Limit (10 U.S.C. §2667)
export const validateOutgrantTerm = (start: string, end: string, type: string): ValidationResult => {
    if (type === 'Lease') {
        const s = new Date(start);
        const e = new Date(end);
        const years = (e.getTime() - s.getTime()) / (1000 * 3600 * 24 * 365.25);
        if (years > 5) {
            return { allowed: false, reason: 'Rule 4: Leases > 5 years require Secretarial approval (Simulated Warning).' };
        }
    }
    return { allowed: true };
};

// Rule 19: Grantee Insurance (ER 405-1-12)
export const validateGranteeInsurance = (outgrant: OutGrant): ValidationResult => {
    if (!outgrant.insuranceProof) {
        return { allowed: false, reason: 'Rule 19: Proof of insurance is required before activating Out-Grant.' };
    }
    return { allowed: true };
};

// Rule 22: FMV Requirement (10 U.S.C. §2667)
export const validateOutgrantRevenue = (outgrant: OutGrant, fmv: number): ValidationResult => {
    if (!outgrant.publicBenefitAllowance && outgrant.revenue < fmv) {
        return { allowed: false, reason: 'Rule 22: Revenue is below Fair Market Value. Public Benefit Allowance not claimed.' };
    }
    return { allowed: true };
};

// Rule 39: Legal Statute Validity
export const validateLegalStatute = (claim: LegalClaim): ValidationResult => {
    if (!claim.statutoryBasis) return { allowed: false, reason: 'Rule 39: Statutory basis is required for all claims.' };
    return { allowed: true };
};

// Rule 54: Encroachment Lifecycle Flow
export const validateEncroachmentTransition = (current: string, next: string): ValidationResult => {
    const validFlow: Record<string, string[]> = {
        'Reported': ['Triaged', 'Closed'], // Can close if duplicate/error
        'Triaged': ['Investigated', 'Closed'],
        'Investigated': ['Action Planned', 'Resolved', 'Closed'], // Resolved if no issue found
        'Action Planned': ['Under Corrective Action', 'Resolved'],
        'Under Corrective Action': ['Resolved', 'Action Planned'], // Back to planning if failed
        'Resolved': ['Closed'],
        'Closed': ['Archived', 'Reported'], // Reopen
        'Archived': []
    };

    if (!validFlow[current]?.includes(next)) {
        return { allowed: false, reason: `Rule 54: Invalid transition from ${current} to ${next}. Must follow ER 405-1-80 governance flow.` };
    }
    return { allowed: true };
};

// Rule 55: Encroachment Closure Prerequisite
export const validateEncroachmentClosure = (encroachment: EncroachmentCase): ValidationResult => {
    const openTasks = encroachment.tasks.filter(t => t.status !== 'Completed' && t.status !== 'Verified');
    if (openTasks.length > 0) {
        return { allowed: false, reason: "Rule 55: Cannot close encroachment case with open tasks. All tasks must be Completed or Verified." };
    }
    return { allowed: true };
};

// Rule 56: Audit Comment Detail
export const validateAuditCommentDetail = (comment: string): ValidationResult => {
    if (comment.length < 10) {
        return { allowed: false, reason: "Rule 56: Audit comments must be descriptive (min 10 chars)." };
    }
    return { allowed: true };
};
