export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            devotions: {
                Row: {
                    id: number
                    title: string
                    content: string | null
                    publish_date: string | null
                    status: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    title: string
                    content?: string | null
                    publish_date?: string | null
                    status?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    title?: string
                    content?: string | null
                    publish_date?: string | null
                    status?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            students: {
                Row: {
                    chemistry: number | null
                    chinese: number | null
                    created_at: string | null
                    english: number | null
                    id: string
                    math: number | null
                    name: string
                    physics: number | null
                    total: number | null
                }
                Insert: {
                    chemistry?: number | null
                    chinese?: number | null
                    created_at?: string | null
                    english?: number | null
                    id: string
                    math?: number | null
                    name: string
                    physics?: number | null
                    total?: number | null
                }
                Update: {
                    chemistry?: number | null
                    chinese?: number | null
                    created_at?: string | null
                    english?: number | null
                    id?: string
                    math?: number | null
                    name?: string
                    physics?: number | null
                    total?: number | null
                }
                Relationships: []
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
