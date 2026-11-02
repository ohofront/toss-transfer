'use client';

import useStore from '@/store';
import { moneyUtil } from '@/util/number-util';

const Money = () => {
  const { money, source } = useStore();

  return (
    <div className="money flex flex-1 flex-col items-center justify-center">
      {source.account ? (
        <span className="text-xs text-gray-500 mb-3 bg-gray-100 px-3 py-1 rounded-full">
          {source.account} · 잔액 {source.balance.toLocaleString()}원
        </span>
      ) : null}
      <span className="text-4xl font-bold text-gray-900">
        {money.toLocaleString()} 원
      </span>
      <span className="h-5 text-sm mt-2 text-gray-500 font-medium">
        {!!money && `${moneyUtil(money)} 원`}
      </span>
    </div>
  );
};

export default Money;
