'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import RemitHeader from '@/components/remit/RemitHeader';
import TransferConfirmModal from '@/components/remit/TransferConfirmModal';
import { fetchContactList, Contact } from '@/services/contact';
import useStore from '@/store';
import ProfileImg from '@/assets/profile.jpg';
import { getBankDisplayName } from '@/components/remit/BankBadge';

const ContactPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTarget } = useStore();

  useEffect(() => {
    fetchContactList().then((data) => {
      setContacts(data);
    });
  }, []);

  const handleSelect = (contact: Contact) => {
    setTarget({
      id: contact.id,
      name: contact.name,
      account: contact.account,
      type: contact.type,
    });
    setIsModalOpen(true);
  };

  const filtered = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.phone.includes(query)
  );

  return (
    <div className="h-full flex-1 flex flex-col">
      <RemitHeader />

      <div className="my-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="이름 또는 전화번호로 검색"
          className="w-full px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <h4 className="text-xs font-bold text-gray-400 mb-2 px-1">
          연락처 {filtered.length}명
        </h4>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            일치하는 연락처가 없습니다.
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {filtered.map((contact) => (
              <li
                key={contact.id}
                onClick={() => handleSelect(contact)}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                  <Image
                    src={ProfileImg}
                    alt={contact.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900 truncate">
                    {contact.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {contact.phone} · {getBankDisplayName(contact.type)}{' '}
                    {contact.account}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <TransferConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ContactPage;
