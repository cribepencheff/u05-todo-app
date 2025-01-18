export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: number;
          title: string | null;
          completed: boolean | null;
          created_at: string;
          user_id: string | null;
        };
        Insert: {
          title?: string | null;
          completed?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          title?: string | null;
          completed?: boolean | null;
          user_id?: string | null;
        };
      };
    };
  };
};
