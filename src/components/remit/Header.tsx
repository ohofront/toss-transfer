'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';

const path: Record<string, string> = {
  '/remit': '송금',
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="relative text-center font-bold text-lg py-1">
      <button
        type="button"
        aria-label="홈으로 이동"
        className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center text-gray-700 hover:text-black cursor-pointer"
        onClick={() => router.push('/')}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="text-lg" />
      </button>
      {path[pathname] || '송금'}
    </header>
  );
};

export default Header;
