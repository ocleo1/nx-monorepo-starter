import { useSelector } from 'react-redux';

import type { RootState } from '../../reducer';
import type { OneState } from './slice';


export default function One() {
  const { color } = useSelector<RootState, OneState>(state => state.bar.one) || {};

  return (
    <div>
      <span>World</span>
      <span>{color}</span>
    </div>
  );
}
