import { useContext } from 'react';
import { Context as LayoutContext } from './layout';

export default function useLayoutState() {
  return useContext(LayoutContext);
}
