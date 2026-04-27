export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    level: 'super_admin' | 'admin' | 'manager' | string;
    roleName: string;
    avatar?: string | null;
    createdAt?: string;
    permissions?: string[];
}
