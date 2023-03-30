export interface FormCredentials {
  [key: string]: string;
}
export interface FormInput {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  helperText: string;
  required: boolean;
  pattern: string;
}
