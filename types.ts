
export type DocType = 'desenquadramento' | 'enquadramento' | 'investidor' | 'primeira_aquisicao';

export interface Project {
  id: string;
  name: string;
  speName: string;
  cnpj: string;
  cartorio: string;
  matricula: string;
  isMatriculaMae: boolean;
  qualificationText: string;
  city: string; // "São Paulo", "Jundiaí", etc.
  address: string; // Automated address
  registro: string; // "R. X" for footer
}

export interface Category {
  id: 'HIS-1' | 'HIS-2' | 'HMP';
  label: string;
  fullLabel: string;
  incomeRangeText: string;
  valueLimit: number;
}

export interface FormData {
  docType: DocType;
  projectId: string;
  category: Category['id'];
  
  // Acquisition Type for Doc 4
  acquisitionType: 'first' | 'second';

  // Client 1
  clientName: string;
  clientRg: string;
  clientCpf: string;
  clientQualification: string; // Used for Doc 2 primarily
  
  // Client 2 (Optional)
  client2Name: string;
  client2Rg: string;
  client2Cpf: string;

  // Unit Info
  unitNumber: string;
  towerName: string;
  houseNumber: string; // For Villagio
  
  // Address for Doc 3 (Now derived from Project, but keeping text in case manual override is ever needed, though UI will hide it)
  propertyAddress: string;

  // Registry Info
  matriculaOverride: string; 
  // registroR removed in favor of Project.registro

  // Date
  day: string;
  month: string;
  year: string;
  
  // Misc
  fileName: string;
  customIncomeText: string; // For Doc 2 and 3 overrides
}