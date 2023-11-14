export interface ValidationSchema {
  validate: (data: any) => Promise<any>;
}