import { atom, useAtom } from 'jotai';

const isRedirectingAtom = atom(false);

export function useIsRedirectingAtom() {
  return useAtom(isRedirectingAtom);
}
