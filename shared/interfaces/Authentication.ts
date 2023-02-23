export interface AuthCredentials {
  [key: string]: string;
}
export interface AuthInputs {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  helperText: string;
  required: boolean;
  pattern: string;
}
