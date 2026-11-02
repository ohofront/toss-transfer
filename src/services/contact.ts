import { supabase } from '@/lib/supabaseClient';
import { Contact, getLocalContacts } from './dummyData';

export type { Contact };

export const fetchContactList = async (): Promise<Contact[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact')
        .select('*')
        .returns<Contact[]>();

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchContactList failed, falling back to dummy data:', e);
    }
  }

  return getLocalContacts();
};
