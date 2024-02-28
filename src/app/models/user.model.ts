

export  interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  bio: string|null;
  createdAt: Date;
}
