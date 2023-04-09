export interface Message {
  name: string;
  phone: string;
  date: string;
  total: number;
  id?: number;
  
}

const messages: Message[] = [
  {
    name: 'Grocery Items',
    phone: '0822',
    date: '02/04/2023',
    total: 140.10,
    id: 1
  },
  {
    name: 'Meat Item 2',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 2
  },
  {
    name: 'Grocery Items',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 3

  },
  {
    name: 'Grocery Items',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 4
  },
  {
    name: 'Grocery Items',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 5
  },
  {
    name: 'Grocery Items',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 6
  },
  {
    name: 'Grocery Items',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 7
  },
  {
    name: 'Grocery Items',
    phone: '02/04/2023',
    date: '02/04/2023',
    total: 140.00,
    id: 8
  }
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find(m => m.id === id);