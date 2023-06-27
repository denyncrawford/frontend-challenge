import { atom, useAtom } from 'jotai';

const emailPasswordAtom = atom({
  email: '',
  password: '',
});

export function useEmailPasswordAtom() {
  return useAtom(emailPasswordAtom);
}
