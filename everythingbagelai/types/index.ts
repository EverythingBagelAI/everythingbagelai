export interface Application {
  id: string
  name: string
  logo_url?: string
  category_id: string
  sub_category_id: string
  category: string
  sub_category: string
  type: string
  website_url: string
  summary: string
  key_features: string[]
  pricing_rating?: number
  functionality_rating?: number
  accessibility_rating?: number
  created_at: string
} 