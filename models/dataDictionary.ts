export interface dataDictionary
{
  dataDictionaryId: number;
  dataSourceName: string;
  parentDataGroupId:number ;
  dataGroupId: number;
  dataName: string;
  dataDescription: string;
  dataOwnerId: string;
  dataCustodianId: string;
  dataIntegrityId: number;
  dataAccessibilityId: number;
  dataPrivacyId: number;
  hasSensitiveData: boolean;
  hasSecretData: boolean ;
  hasPersonalData: boolean;
  securityClassLevelId: number;
  dataPrivacyLevelId: number;
  dataPrivacyReason: string;
  dataEnvironmentId: number;
  hasStructuredData: boolean;
  isArchived: boolean;
  isProtectedByLaw: boolean;
  hasStorageObligation: boolean;
  storagePeriodId: number;
  description: string;
  approvalStatusId:number ;
  itDepartmentId: string;
  isActive: boolean;
  userName: string;
  companyId: number;




}
