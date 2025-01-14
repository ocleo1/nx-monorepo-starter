import { useSelector } from 'react-redux';

import type { RootState } from '../../reducer';
import type { OneState } from './slice';


export default function One() {
  const { color } = useSelector<RootState, OneState>(state => state.foo.one) || {};

  return (
    <div>
      <span className="text-red-600">Hello</span>
      <span>{color}</span>
    </div>
  );
}
