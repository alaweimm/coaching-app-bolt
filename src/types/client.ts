export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  startDate: string;
  status: 'active' | 'inactive';
  nextAppointment?: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  notes: string;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
}

export interface ClientContextType {
  clients: Client[];
  selectedClient: Client | null;
  setSelectedClient: (client: Client) => void;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
}