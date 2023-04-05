export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

const messages: Message[] = [
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 0
  },
  {
    fromName: 'Meat Item 2',
    subject: '02/04/2023',
    date: '$140.00',
    id: 1
  },
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 2

  },
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 3
  },
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 4
  },
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 5
  },
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 6
  },
  {
    fromName: 'Grocery Items',
    subject: '02/04/2023',
    date: '$140.00',
    id: 7
  }
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find(m => m.id === id);