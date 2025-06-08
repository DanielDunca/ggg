export interface Problem {
  title: string;
  status: string;
  hint: string;
}

export interface UVTInfo {
  people?: string[];
  courses?: string[];
  researchGroups?: string[];
}

export interface Node {
  id: string;
  kind: string;
  activities: string[];
  dependencies: string[];
  influences: string[];
  problems: Problem[];
  people: string[];
  venues: string[];
  uvt?: UVTInfo;
}

export interface Link {
  source: string;
  target: string;
  relation: string;
}
