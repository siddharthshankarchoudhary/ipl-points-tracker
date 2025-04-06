export interface User {
  imageUrl: string;
  firstName: string | null;
  lastName: string | null;
  id: string;
  createdAt: Date | null;
  emailAddress: string;
  updatedAt: Date | null;
  username: string | null;
  fullName: string | null;
}
