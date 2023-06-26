export interface Contact {
  id: number;
  name: string;
  phone: string;
  image: string;
  isFavorite?: number;
  contactId?: string;
}

export interface SectionedContact {
  title: string;
  data: Contact[];
}

//used only for testing
export const EmptyContact: Contact = {
  id: 0,
  name: "",
  phone: "",
  image: "",
  isFavorite: 0,
};

export const ContactData: Contact[] = [
  {
    id: 72872,
    name: "Zanisha Smith",
    phone: "555-123-4567",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isFavorite: 1,
  },
  {
    id: 1989,
    name: "Avery Johnson",
    phone: "555-123-4567",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isFavorite: 1,
  },
  {
    id: 2007,
    name: "Emma Thompson",
    phone: "555-234-5678",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3147,
    name: "Liam Davis",
    phone: "555-345-6789",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    isFavorite: 1,
  },
  {
    id: 4124,
    name: "Sophia Garcia",
    phone: "555-456-7890",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 3245,
    name: "Emily Smith",
    phone: "(555) 555-1234",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 6789,
    name: "John Doe",
    phone: "(555) 555-5678",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 1234,
    name: "Sarah Johnson",
    phone: "(555) 555-9012",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    isFavorite: 1,
  },
  {
    id: 5678,
    name: "Michael Brown",
    phone: "(555) 555-3456",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 9012,
    name: "Olivia Davis",
    phone: "(555) 555-7890",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 3456,
    name: "David Wilson",
    phone: "(555) 555-1234",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    isFavorite: 1,
  },
  {
    id: 7890,
    name: "Emma Taylor",
    phone: "(555) 555-5678",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 2345,
    name: "James Anderson",
    phone: "(555) 555-9012",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 6781,
    name: "Sophia Hernandez",
    phone: "(555) 555-3456",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 9013,
    name: "William Martinez",
    phone: "(555) 555-7890",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    isFavorite: 1,
  },
];

export function groupContacts(contacts: Contact[]): SectionedContact[] {
  const contactMap = new Map<string, Contact[]>();
  for (const contact of contacts) {
    const firstLetter = contact.name[0];
    const contactList = contactMap.get(firstLetter) || [];
    contactList.push(contact);
    contactMap.set(firstLetter, contactList);
  }
  const result: SectionedContact[] = [];
  contactMap.forEach((contacts, letter) => {
    const sortedContacts = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    result.push({ title: letter, data: sortedContacts });
  });
  return result;
}

export function getFavoriteContacts(contacts: Contact[]) {
  return contacts.filter((contact) => contact.isFavorite == 1);
}

export function getContactById(id: number) {
  return ContactData.find((contact) => contact.id === id);
}
