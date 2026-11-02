export type AccountType = 'KB' | 'KAKAO' | 'TOSS' | 'SHINHAN' | 'WOORI' | 'NH' | 'HANA';

export interface Account {
  id: number;
  name: string;
  balance: number;
  bookmark: boolean;
  type: AccountType;
}

export interface Recent {
  id: number;
  name: string;
  account: string;
  type: string;
  bookmark: boolean;
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  account: string;
  type: string;
}

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 1,
    name: 'KB마이핏통장',
    balance: 2450000,
    bookmark: true,
    type: 'KB',
  },
  {
    id: 2,
    name: '카카오뱅크 입출금통장',
    balance: 1380000,
    bookmark: false,
    type: 'KAKAO',
  },
];

export const INITIAL_RECENTS: Recent[] = [
  {
    id: 1,
    name: '김토스',
    account: '토스뱅크 1000-1234-5678',
    type: 'TOSS',
    bookmark: true,
  },
  {
    id: 2,
    name: '이국민',
    account: 'KB국민 9400-8821-1234',
    type: 'KB',
    bookmark: true,
  },
  {
    id: 3,
    name: '박카카오',
    account: '카카오뱅크 3333-01-9876543',
    type: 'KAKAO',
    bookmark: false,
  },
  {
    id: 4,
    name: '정신한',
    account: '신한은행 110-382-998811',
    type: 'SHINHAN',
    bookmark: false,
  },
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 1,
    name: '강민수',
    phone: '010-1234-5678',
    account: '토스뱅크 1000-2233-4455',
    type: 'TOSS',
  },
  {
    id: 2,
    name: '김토스',
    phone: '010-2345-6789',
    account: '토스뱅크 1000-1234-5678',
    type: 'TOSS',
  },
  {
    id: 3,
    name: '박카카오',
    phone: '010-3456-7890',
    account: '카카오뱅크 3333-01-9876543',
    type: 'KAKAO',
  },
  {
    id: 4,
    name: '이국민',
    phone: '010-4567-8901',
    account: 'KB국민 9400-8821-1234',
    type: 'KB',
  },
  {
    id: 5,
    name: '최우리',
    phone: '010-5678-9012',
    account: '우리은행 1002-123-456789',
    type: 'WOORI',
  },
  {
    id: 6,
    name: '홍길동',
    phone: '010-9876-5432',
    account: 'NH농협 302-0000-1111-22',
    type: 'NH',
  },
];

const STORAGE_KEYS = {
  ACCOUNTS: 'toss_dummy_accounts',
  RECENTS: 'toss_dummy_recents',
  CONTACTS: 'toss_dummy_contacts',
} as const;

export const getLocalAccounts = (): Account[] => {
  if (typeof window === 'undefined') return INITIAL_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS));
      return INITIAL_ACCOUNTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ACCOUNTS;
  }
};

export const updateLocalAccountBalance = (id: number, newBalance: number): Account[] => {
  const accounts = getLocalAccounts();
  const updated = accounts.map((acc) =>
    acc.id === id ? { ...acc, balance: newBalance } : acc
  );
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(updated));
      window.dispatchEvent(new Event('accounts_updated'));
    } catch (e) {
      console.error('Failed to save accounts to localStorage', e);
    }
  }
  return updated;
};

export const getLocalRecents = (): Recent[] => {
  if (typeof window === 'undefined') return INITIAL_RECENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(INITIAL_RECENTS));
      return INITIAL_RECENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_RECENTS;
  }
};

export const addLocalRecent = (
  recent: Omit<Recent, 'id'> & { id?: number }
): Recent[] => {
  const current = getLocalRecents();
  const existingIndex = current.findIndex(
    (item) => item.name === recent.name || item.account === recent.account
  );

  let updated: Recent[];
  if (existingIndex >= 0) {
    const target = { ...current[existingIndex], ...recent };
    updated = [target, ...current.filter((_, idx) => idx !== existingIndex)];
  } else {
    const newItem: Recent = {
      id: recent.id ?? Date.now(),
      name: recent.name,
      account: recent.account,
      type: recent.type,
      bookmark: recent.bookmark ?? false,
    };
    updated = [newItem, ...current];
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save recents to localStorage', e);
    }
  }
  return updated;
};

export const getLocalContacts = (): Contact[] => {
  if (typeof window === 'undefined') return INITIAL_CONTACTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(INITIAL_CONTACTS));
      return INITIAL_CONTACTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_CONTACTS;
  }
};
