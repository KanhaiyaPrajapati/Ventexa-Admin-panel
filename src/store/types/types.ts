export interface ServiceFeature {
  id?: string;
  service_id: string;
  feature_title: string;
  feature_description: string;
  is_active: boolean;
}


export interface AboutCompany {
  id?: string;
  company_overview: string;
  mission: string;
  vision: string;
  core_values: string;
  founded_year: number;
  headquarters: string;
}
