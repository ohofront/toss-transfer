'use client';

import { useEffect, useState } from 'react';
import RemitHeader from '@/components/remit/RemitHeader';
import BankBadge, { getBankDisplayName } from '@/components/remit/BankBadge';
import TransferConfirmModal from '@/components/remit/TransferConfirmModal';
import { fetchRecentList, Recent } from '@/services/recent';
import useStore from '@/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RecentPage = () => {
  const [recents, setRecents] = useState<Recent[]>([]);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTarget } = useStore();

  useEffect(() => {
    fetchRecentList().then((data) => {
      setRecents(data);
    });
  }, []);

  const handleSelect = (item: Recent) => {
    setTarget({
      id: item.id,
      name: item.name,
      account: item.account,
      type: item.type,
    });
    setIsModalOpen(true);
  };

  const filtered = recents.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.account.includes(query)
  );

  const bookmarked = filtered.filter((item) => item.bookmark);
  const others = filtered.filter((item) => !item.bookmark);

  return (
    <div className="h-full flex-1 flex flex-col">
      <RemitHeader />

      <div className="my-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="받는 분의 이름 또는 계좌번호 검색"
          className="w-full px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {bookmarked.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold text-gray-400 mb-2 px-1">즐겨찾기</h4>
            <ul className="flex flex-col gap-2">
              {bookmarked.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
                >
                  <BankBadge type={item.type} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {getBankDisplayName(item.type)} {item.account}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-yellow-400 text-sm"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          {bookmarked.length > 0 && others.length > 0 && (
            <h4 className="text-xs font-bold text-gray-400 mb-2 px-1">최근 보낸 계좌</h4>
          )}
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              최근 보낸 내역이 없습니다.
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {others.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors"
                >
                  <BankBadge type={item.type} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {getBankDisplayName(item.type)} {item.account}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className={item.bookmark ? 'text-yellow-400 text-sm' : 'text-gray-200 text-sm'}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <TransferConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RecentPage;
