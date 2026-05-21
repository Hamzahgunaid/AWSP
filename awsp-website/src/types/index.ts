export type Locale = 'ar' | 'en';

export interface Project {
  id: number;
  name_ar: string;
  name_en: string;
  district_ar: string;
  district_en: string;
  governorate_ar: string;
  intervention_type_ar: string;
  intervention_type_en: string;
  sector_ar: string;
  sector_en: string;
  donor_ar: string;
  donor_en: string;
  implementer_ar: string;
  implementer_en: string;
  contractor_ar?: string;
  contractor_en?: string;
  year: number;
  cost_usd: number;
  lat?: number;
  lng?: number;
  stakeholder_id?: number;
  status: 'completed' | 'active' | 'planned';
  description_ar?: string;
  description_en?: string;
}

export interface Phase {
  id: number;
  name_en: string;
  name_ar: string;
  start_date: string;
  end_date: string;
  duration: string;
  status: 'completed' | 'active' | 'planned';
  description_en: string;
  description_ar: string;
  activities_en: string[];
  activities_ar: string[];
  outputs_en: string[];
  outputs_ar: string[];
}

export interface TaskforceMember {
  id: number;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  department: 'MWE' | 'LWSCA' | 'Taskforce' | 'Other';
  photo_url?: string;
  display_order: number;
}

export interface Partner {
  id: string;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  description_en: string;
  description_ar: string;
  logo_src: string;
  href: string;
}

export interface NewsPost {
  id: string;
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  body_en: string;
  body_ar: string;
  category: 'programme-update' | 'milestone' | 'partner-news' | 'media';
  type: 'news' | 'event';
  event_date?: string;
  event_location?: string;
  featured_image?: string;
  published_at: string;
  published: boolean;
}

export interface KnowledgeDocument {
  id: string;
  title_en: string;
  title_ar: string;
  abstract_en: string;
  abstract_ar: string;
  category: 'reports' | 'frameworks' | 'data' | 'presentations' | 'guidelines';
  phase: number;
  languages: ('ar' | 'en')[];
  file_type: string;
  file_size: string;
  file_url: string;
  published_at: string;
}

export interface Stakeholder {
  id: number;
  name_en: string;
  name_ar: string;
  abbreviation?: string;
  category: 'public-sector' | 'donor' | 'development-partner' |
            'civil-society' | 'community' | 'private-sector' | 'academic';
  level: 'international' | 'national' | 'local';
  interest: number;
  influence: number;
}

export interface ActiveFilters {
  districts: string[];
  interventionTypes: string[];
  sectors: string[];
  donors: string[];
  implementers: string[];
  yearRange: [number, number];
  costRange: [number, number];
}
