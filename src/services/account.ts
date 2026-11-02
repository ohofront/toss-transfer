import { supabase } from '@/lib/supabaseClient';
import {
  Account,
  getLocalAccounts,
  updateLocalAccountBalance,
} from './dummyData';

export type { Account };

export const getAccounts = async (): Promise<Account[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .returns<Account[]>();

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase getAccounts failed, falling back to dummy data:', e);
    }
  }

  return getLocalAccounts();
};

export const remitAccount = async (id: number, money: number) => {
  updateLocalAccountBalance(id, money);

  if (supabase) {
    try {
      await supabase.from('accounts').upsert({ id, balance: money });
    } catch (e) {
      console.warn('Supabase remitAccount failed, updated locally only:', e);
    }
  }
};
