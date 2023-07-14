export interface FormValues {
    subject: string;
    character: string;
    message: string;
    description: string;
    ageGroup: number;
    specialNeeds?: string;
    language: string;
  }
  
export interface LogInFormValues {
    username: string;
    password: string;
  }