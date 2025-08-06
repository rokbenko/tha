export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

export interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}