export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      automations: {
        Row: {
          id: string
          created_at: string
          name: string
          creator: string | null
          category_id: string
          sub_category_id: string | null
          functionality: string | null
          video_link: string | null
          recipe: string | null
          youtube_transcript: string | null
          applications_utilized: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          creator?: string | null
          category_id: string
          sub_category_id?: string | null
          functionality?: string | null
          video_link?: string | null
          recipe?: string | null
          youtube_transcript?: string | null
          applications_utilized?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          creator?: string | null
          category_id?: string
          sub_category_id?: string | null
          functionality?: string | null
          video_link?: string | null
          recipe?: string | null
          youtube_transcript?: string | null
          applications_utilized?: string[] | null
        }
      }
      applications: {
        Row: {
          id: string
          created_at: string
          name: string
          logo_url: string | null
          category_id: string
          sub_category_id: string | null
          type: string
          website_url: string
          summary: string
          key_features: Json[]
          pricing_details: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          logo_url?: string | null
          category_id: string
          sub_category_id?: string | null
          type: string
          website_url: string
          summary: string
          key_features: Json[]
          pricing_details?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          logo_url?: string | null
          category_id?: string
          sub_category_id?: string | null
          type?: string
          website_url?: string
          summary?: string
          key_features?: Json[]
          pricing_details?: Json | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
        }
      }
      sub_categories: {
        Row: {
          id: string
          name: string
          category_id: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          category_id: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          category_id?: string
          description?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 