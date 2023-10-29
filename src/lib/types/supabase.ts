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
      credits: {
        Row: {
          credits: number
          user_id: string
        }
        Insert: {
          credits?: number
          user_id: string
        }
        Update: {
          credits?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credits_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      generations: {
        Row: {
          created_at: string
          id: string
          number_of_pictures: number
          prompt: string | null
          status: Database["public"]["Enums"]["GENERATION_STATUS"]
          user_id: string
        }
        Insert: {
          created_at: string
          id?: string
          number_of_pictures: number
          prompt?: string | null
          status?: Database["public"]["Enums"]["GENERATION_STATUS"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          number_of_pictures?: number
          prompt?: string | null
          status?: Database["public"]["Enums"]["GENERATION_STATUS"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "generations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: {
          id: string
        }[]
      }
      increment_credits: {
        Args: {
          num: number
          row_id: string
        }
        Returns: number
      }
    }
    Enums: {
      GENERATION_STATUS: "pending" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
