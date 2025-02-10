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
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      sub_categories: {
        Row: {
          id: string
          name: string
          category_id: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category_id: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category_id?: string
          description?: string | null
          created_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          twitter_url: string | null
          linkedin_url: string | null
          facebook_url: string | null
          github_url: string | null
          category_id: string
          sub_category_id: string
          ranking: number | null
          pricing_rating: number | null
          functionality_rating: number | null
          accessibility_rating: number | null
          type: 'Free' | 'Premium' | 'Paid'
          website_url: string | null
          affiliate_code: string | null
          summary: string | null
          key_features: string[] | null
          pricing_details: string | null
          pricing_breakdown: Json | null
          alternatives: string[] | null
          reddit_sentiment: Json | null
          youtube_insights: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          twitter_url?: string | null
          linkedin_url?: string | null
          facebook_url?: string | null
          github_url?: string | null
          category_id: string
          sub_category_id: string
          ranking?: number | null
          pricing_rating?: number | null
          functionality_rating?: number | null
          accessibility_rating?: number | null
          type: 'Free' | 'Premium' | 'Paid'
          website_url?: string | null
          affiliate_code?: string | null
          summary?: string | null
          key_features?: string[] | null
          pricing_details?: string | null
          pricing_breakdown?: Json | null
          alternatives?: string[] | null
          reddit_sentiment?: Json | null
          youtube_insights?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          twitter_url?: string | null
          linkedin_url?: string | null
          facebook_url?: string | null
          github_url?: string | null
          category_id?: string
          sub_category_id?: string
          ranking?: number | null
          pricing_rating?: number | null
          functionality_rating?: number | null
          accessibility_rating?: number | null
          type?: 'Free' | 'Premium' | 'Paid'
          website_url?: string | null
          affiliate_code?: string | null
          summary?: string | null
          key_features?: string[] | null
          pricing_details?: string | null
          pricing_breakdown?: Json | null
          alternatives?: string[] | null
          reddit_sentiment?: Json | null
          youtube_insights?: Json | null
          created_at?: string
        }
      }
      automations: {
        Row: {
          id: string
          name: string
          creator: string | null
          category_id: string
          sub_category_id: string
          applications_utilized: string[] | null
          functionality: string | null
          video_link: string | null
          recipe: string | null
          youtube_transcript: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          creator?: string | null
          category_id: string
          sub_category_id: string
          applications_utilized?: string[] | null
          functionality?: string | null
          video_link?: string | null
          recipe?: string | null
          youtube_transcript?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          creator?: string | null
          category_id?: string
          sub_category_id?: string
          applications_utilized?: string[] | null
          functionality?: string | null
          video_link?: string | null
          recipe?: string | null
          youtube_transcript?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          application_id: string
          user_id: string | null
          pricing_rating: number | null
          functionality_rating: number | null
          accessibility_rating: number | null
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          application_id: string
          user_id?: string | null
          pricing_rating?: number | null
          functionality_rating?: number | null
          accessibility_rating?: number | null
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          user_id?: string | null
          pricing_rating?: number | null
          functionality_rating?: number | null
          accessibility_rating?: number | null
          comment?: string | null
          created_at?: string
        }
      }
      vector_documents: {
        Row: {
          id: string
          title: string
          content: string | null
          metadata: Json | null
          type: string | null
          embedding: number[] | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          metadata?: Json | null
          type?: string | null
          embedding?: number[] | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          metadata?: Json | null
          type?: string | null
          embedding?: number[] | null
          created_at?: string
        }
      }
      chat_logs: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          message: string | null
          agent_response: string | null
          context: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          message?: string | null
          agent_response?: string | null
          context?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          session_id?: string | null
          message?: string | null
          agent_response?: string | null
          context?: Json | null
          created_at?: string
        }
      }
      scraped_data: {
        Row: {
          id: string
          source: string
          content: string | null
          sentiment: Json | null
          related_application_id: string | null
          related_automation_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          source: string
          content?: string | null
          sentiment?: Json | null
          related_application_id?: string | null
          related_automation_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          source?: string
          content?: string | null
          sentiment?: Json | null
          related_application_id?: string | null
          related_automation_id?: string | null
          metadata?: Json | null
          created_at?: string
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