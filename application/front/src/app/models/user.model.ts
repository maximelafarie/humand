export interface User {
  id?: string;
  username: string;
  email?: string;
  lastName: string;
  firstName: string;
  roles: string[];
  formulationValidator?: boolean;
  processValidator?: boolean;
  pigmentationValidator?: boolean;
  complianceValidator?: boolean;
}
