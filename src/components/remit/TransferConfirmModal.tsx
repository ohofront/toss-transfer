'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store';
import BankBadge, { getBankDisplayName } from './BankBadge';
import { remitAccount } from '@/services/account';
import { addRecent } from '@/services/recent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface TransferConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransferConfirmModal = ({ isOpen, onClose }: TransferConfirmModalProps) => {
  const router = useRouter();
  const { accountId, money, source, target, reset } = useStore();
  const [status, setStatus] = useState<'confirm' | 'loading' | 'success'>('confirm');

  if (!isOpen) return null;

  const handleTransfer = async () => {
    setStatus('loading');
    try {
      const remainingBalance = Math.max(0, source.balance - money);
      await remitAccount(accountId, remainingBalance);
      await addRecent({
        name: target.name,
        account: target.account,
        type: target.type,
        bookmark: false,
      });

      // Small delay for natural feel
      setTimeout(() => {
        setStatus('success');
      }, 400);
    } catch (e) {
      console.error('Transfer failed', e);
      alert('송금 중 오류가 발생했습니다.');
      setStatus('confirm');
    }
  };

  const handleFinish = () => {
    reset();
    router.push('/');
  };

  const bankName = getBankDisplayName(target.type);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
        {status === 'confirm' && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <BankBadge type={target.type} size={44} />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{target.name}</h3>
                <p className="text-xs text-gray-500">
                  {bankName} {target.account}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">보낼 금액</span>
                <span className="font-bold text-blue-600 text-base">
                  {money.toLocaleString()} 원
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">출금 계좌</span>
                <span className="text-gray-700 font-medium">
                  {source.account || '내 계좌'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">송금 후 잔액</span>
                <span className="text-gray-700 font-medium">
                  {Math.max(0, source.balance - money).toLocaleString()} 원
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">송금 수수료</span>
                <span className="text-blue-500 font-medium">무료</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleTransfer}
                className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              >
                보내기
              </button>
            </div>
          </>
        )}

        {status === 'loading' && (
          <div className="py-12 flex flex-col items-center justify-center gap-4">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-blue-500 text-4xl"
            />
            <p className="text-sm font-medium text-gray-600">송금 처리 중입니다...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-blue-500 text-5xl mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">송금 완료!</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold text-gray-900">{target.name}</span>님에게
            </p>
            <p className="text-lg font-bold text-blue-600 mb-6">
              {money.toLocaleString()}원을 보냈습니다.
            </p>
            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-4 rounded-xl text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferConfirmModal;
