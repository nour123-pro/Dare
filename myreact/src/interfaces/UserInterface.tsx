export interface User {
    id: string; // Guid as string
    userName?: string;
    normalizedUserName?: string;
    email?: string;
    normalizedEmail?: string;
    emailConfirmed: boolean;
    passwordHash?: string;
    securityStamp?: string;
    concurrencyStamp?: string;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: string; // DateTimeOffset → ISO string
    lockoutEnabled: boolean;
    accessFailedCount: number;
  
    gender: 'Female' | 'Male';
    firstName: string;
    lastName: string;
    birthDate: string; // DateOnly → string (e.g., "2025-05-18")
    createdAt: string; // DateTime → ISO string
    isDeleted: boolean;
  }
  