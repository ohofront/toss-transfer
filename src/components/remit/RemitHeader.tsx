'use client';

import useStore from '@/store';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import styled from './style.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const path: Record<string, string> = {
  '/remit/recent': '최근',
  '/remit/account': '계좌',
  '/remit/contact': '연락처',
};

const RemitHeader = () => {
  const { money } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="relative text-center pt-1 mb-4">
      <button
        type="button"
        aria-label="이전 화면"
        className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black cursor-pointer"
        onClick={() => router.push('/remit')}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
      </button>
      <div className="font-bold text-base text-gray-900 mb-5">
        {money > 0 ? `${money.toLocaleString()}원 받는 분 입력` : '받는 분 입력'}
      </div>
      <nav className="border-b border-gray-200 flex justify-center">
        <ul className="inline-flex gap-2">
          {Object.entries(path).map(([key, value]) => (
            <li
              key={key}
              className={`text-[#868d98] px-6 py-2 ${
                key === pathname ? styled.active : ''
              }`}
            >
              <Link className="text-sm block" href={key}>
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default RemitHeader;
