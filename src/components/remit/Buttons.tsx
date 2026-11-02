'use client';

import useStore from '@/store';
import Link from 'next/link';

const Buttons = () => {
  const { money, source } = useStore();

  const handleClick = (e: React.MouseEvent) => {
    if (money === 0) {
      alert('금액을 입력해주세요.');
      e.preventDefault();
      return;
    }
    if (source.balance > 0 && money > source.balance) {
      alert('출금 가능 잔액을 초과할 수 없습니다.');
      e.preventDefault();
      return;
    }
  };

  const isDisabled = money === 0;

  return (
    <div className="mt-7">
      <Link
        className={`block text-center w-full text-white text-sm font-semibold py-4 rounded-2xl transition-all ${
          isDisabled
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-[#3081f7] hover:bg-blue-600 cursor-pointer shadow-md'
        }`}
        href="/remit/recent"
        onClick={handleClick}
      >
        보내기
      </Link>
    </div>
  );
};

export default Buttons;
