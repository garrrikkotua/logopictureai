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
      generations: {
        Row: {
          created_at: string
          id: string
          prompt: string | null
          user_id: string | null
        }
        Insert: {
          created_at: string
          id?: string
          prompt?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          prompt?: string | null
          user_id?: string | null
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
