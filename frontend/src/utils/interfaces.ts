export interface FormValues {
    subject: string;
    characters: string;
    name?: string;
    description?: string;
    ageGroup: number;
    lesson?: string;
    title: string;
  }
  
export interface LogInFormValues {
    username: string;
    password: string;
  }

export interface SignUpFormValues {
    username: string;
    password: string;
    confirmPassword:string;
  }