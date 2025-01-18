import { useSelector } from 'react-redux';

import type { RootState } from '../../reducer';
import type { OneState } from './slice';


export default function One() {
  const { color } = useSelector<RootState, OneState>(state => state.bar.one) || {};

  return (
    <div>
      <span className="text-blue-600">World</span>
      <span>{color}</span>
    </div>
  );
}
