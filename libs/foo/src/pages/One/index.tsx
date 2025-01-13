import { useSelector } from 'react-redux';

import type { RootState } from '../../reducer';
import type { OneState } from './slice';


export default function One() {
  const { color } = useSelector<RootState, OneState>(state => state.foo.one) || {};

  return (
    <div>
      <span>Hello</span>
      <span>{color}</span>
    </div>
  );
}
