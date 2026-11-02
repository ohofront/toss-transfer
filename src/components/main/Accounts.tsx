import { getAccounts } from '@/services/account';
import AccountList from './AccountList';

const Accounts = async () => {
  const accounts = await getAccounts();

  return <AccountList initialAccounts={accounts} />;
};

export default Accounts;
