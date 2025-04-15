import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client } from '../types/client';

interface ClientState {
  clients: Client[];
  selectedClientId: string | null;
  addClient: (client: Omit<Client, 'id'>) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  setSelectedClientId: (id: string | null) => void;
  getSelectedClient: () => Client | null;
}

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      clients: [],
      selectedClientId: null,

      addClient: (clientData) => {
        const newClient = {
          ...clientData,
          id: Date.now().toString(),
        };
        set((state) => ({
          clients: [...state.clients, newClient],
          selectedClientId: newClient.id,
        }));
      },

      updateClient: (updatedClient) => {
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === updatedClient.id ? updatedClient : client
          ),
        }));
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
          selectedClientId: state.selectedClientId === id ? null : state.selectedClientId,
        }));
      },

      setSelectedClientId: (id) => {
        set({ selectedClientId: id });
      },

      getSelectedClient: () => {
        const { clients, selectedClientId } = get();
        return clients.find((client) => client.id === selectedClientId) || null;
      },
    }),
    {
      name: 'client-storage',
    }
  )
);