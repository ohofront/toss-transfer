'use client';

import Image from 'next/image';
import KB from '@/assets/kb.webp';
import KAKAO from '@/assets/kako.webp';

interface BankBadgeProps {
  type: string;
  className?: string;
  size?: number;
}

export const getBankDisplayName = (type: string): string => {
  const map: Record<string, string> = {
    KB: 'KB국민',
    KAKAO: '카카오뱅크',
    TOSS: '토스뱅크',
    SHINHAN: '신한은행',
    WOORI: '우리은행',
    NH: 'NH농협',
    HANA: '하나은행',
    IBK: 'IBK기업',
  };
  return map[type.toUpperCase()] || type;
};

const BankBadge = ({ type, className = '', size = 36 }: BankBadgeProps) => {
  const upperType = type ? type.toUpperCase() : '';

  if (upperType === 'KB') {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={KB} alt="KB" fill className="object-cover" />
      </div>
    );
  }

  if (upperType === 'KAKAO') {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={KAKAO} alt="카카오" fill className="object-cover" />
      </div>
    );
  }

  const bankStyles: Record<string, { bg: string; text: string; label: string }> = {
    TOSS: { bg: 'bg-[#0064FF]', text: 'text-white', label: '토스' },
    SHINHAN: { bg: 'bg-[#0046FF]', text: 'text-white', label: '신한' },
    WOORI: { bg: 'bg-[#0083CA]', text: 'text-white', label: '우리' },
    NH: { bg: 'bg-[#029B3F]', text: 'text-white', label: '농협' },
    HANA: { bg: 'bg-[#008485]', text: 'text-white', label: '하나' },
    IBK: { bg: 'bg-[#1A479B]', text: 'text-white', label: '기업' },
  };

  const style = bankStyles[upperType] || {
    bg: 'bg-gray-400',
    text: 'text-white',
    label: upperType.slice(0, 2) || '은행',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold text-xs select-none flex-shrink-0 ${style.bg} ${style.text} ${className}`}
      style={{ width: size, height: size }}
    >
      {style.label}
    </div>
  );
};

export default BankBadge;
