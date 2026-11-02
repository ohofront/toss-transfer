import { supabase } from '@/lib/supabaseClient';
import { Recent, getLocalRecents, addLocalRecent } from './dummyData';

export type { Recent };

export type RecentResponse = Omit<Recent, 'bookmark'> & { bookmark: string | boolean };

export const fetchRecentList = async (): Promise<Recent[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('recent')
        .select('*')
        .returns<Recent[]>();

      if (!error && data && data.length > 0) {
        return data.map((item) => ({
          ...item,
          bookmark: item.bookmark === true,
        }));
      }
    } catch (e) {
      console.warn('Supabase fetchRecentList failed, falling back to dummy data:', e);
    }
  }

  return getLocalRecents();
};

export const addRecent = async (
  itemOrId: number | string | (Omit<Recent, 'id'> & { id?: number })
) => {
  if (typeof itemOrId === 'object') {
    addLocalRecent(itemOrId);
  }

  if (supabase) {
    try {
      const payload = typeof itemOrId === 'object' ? itemOrId : { id: itemOrId };
      await supabase.from('recent').upsert(payload);
    } catch (e) {
      console.warn('Supabase addRecent failed:', e);
    }
  }
};
