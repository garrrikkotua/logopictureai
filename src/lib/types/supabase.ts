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
      [_ in never]: never
    }
    Enums: {
      GENERATION_STATUS: "pending" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
