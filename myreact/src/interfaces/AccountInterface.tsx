import { User } from "./UserInterface";

export interface Account {
    accountId: string; // Guid as string
    accountName: string;
    accountProfile?: Uint8Array | null; // byte[] → binary or base64
    isDeleted: boolean;
    userId: string;
    user: User;
    createdAt: string; // DateTime → ISO string
  }
  



export interface AccountsAdminPanel{
   account:Account;
   purchaseCount:string;
}