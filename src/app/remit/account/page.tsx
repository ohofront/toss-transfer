'use client';

import { useState } from 'react';
import RemitHeader from '@/components/remit/RemitHeader';
import BankBadge from '@/components/remit/BankBadge';
import TransferConfirmModal from '@/components/remit/TransferConfirmModal';
import useStore from '@/store';

const BANKS = [
  { type: 'TOSS', name: '토스뱅크' },
  { type: 'KAKAO', name: '카카오뱅크' },
  { type: 'KB', name: 'KB국민' },
  { type: 'SHINHAN', name: '신한' },
  { type: 'WOORI', name: '우리' },
  { type: 'NH', name: 'NH농협' },
  { type: 'HANA', name: '하나' },
  { type: 'IBK', name: 'IBK기업' },
];

const AccountPage = () => {
  const [selectedBank, setSelectedBank] = useState<string>('TOSS');
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTarget } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      alert('계좌번호를 입력해주세요.');
      return;
    }
    const name = recipientName.trim() || '받는 분';
    setTarget({
      id: Date.now(),
      name,
      account: accountNumber.trim(),
      type: selectedBank,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex-1 flex flex-col">
      <RemitHeader />

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col mt-4">
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 mb-2">은행 선택</label>
          <div className="grid grid-cols-4 gap-2">
            {BANKS.map((bank) => {
              const isSelected = selectedBank === bank.type;
              return (
                <button
                  key={bank.type}
                  type="button"
                  onClick={() => setSelectedBank(bank.type)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 text-blue-600 font-bold'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <BankBadge type={bank.type} size={28} />
                  <span className="truncate">{bank.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 mb-2">계좌번호</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9-]/g, ''))}
            placeholder="계좌번호 입력 (- 제외 가능)"
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 mb-2">받는 분 이름</label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="받는 분 이름 (예: 김토스)"
            className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="mt-auto pt-4">
          <button
            type="submit"
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm rounded-2xl transition-colors"
          >
            다음
          </button>
        </div>
      </form>

      <TransferConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AccountPage;
