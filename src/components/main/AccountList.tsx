'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import KB from '@/assets/kb.webp';
import KAKAO from '@/assets/kako.webp';
import AccountLink from './AccountLink';
import { Account, getLocalAccounts } from '@/services/dummyData';

interface AccountListProps {
  initialAccounts: Account[];
}

const AccountList = ({ initialAccounts }: AccountListProps) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);

  useEffect(() => {
    // Sync with localStorage on client mount
    const local = getLocalAccounts();
    if (local && local.length > 0) {
      setAccounts(local);
    }

    const handleUpdate = () => {
      setAccounts(getLocalAccounts());
    };

    window.addEventListener('accounts_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('accounts_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const totalBalance = accounts.reduce(
    (total, { balance }) => total + balance,
    0
  );

  return (
    <div>
      <h1 className="flex justify-between font-bold items-center mb-5">
        <span className="text-lg text-black">계좌</span>
        <span className="total-balance text-sm text-gray-500">
          {totalBalance.toLocaleString()} 원
        </span>
      </h1>
      <ul className="flex flex-col gap-8">
        {accounts.map(({ id, name, balance, type }) => (
          <li key={id} className="account-container flex relative gap-4 h-8 items-center">
            <div className="profile inline-flex rounded-full overflow-hidden w-8 h-8 relative flex-shrink-0 bg-gray-100 items-center justify-center">
              {type === 'KB' ? (
                <Image src={KB} alt="KB국민" fill className="object-cover" />
              ) : type === 'KAKAO' ? (
                <Image src={KAKAO} alt="카카오뱅크" fill className="object-cover" />
              ) : (
                <span className="text-xs font-bold text-gray-600">{type}</span>
              )}
            </div>
            <div className="info flex-1 flex justify-center flex-col gap-1">
              <span className="text-xs account-name text-gray-600">{name}</span>
              <span className="text-sm font-bold text-black">
                {balance.toLocaleString()} 원
              </span>
            </div>
            <AccountLink accountId={id} account={name} balance={balance} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
