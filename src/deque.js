import UnboundedDeque from './implementation/UnboundedDeque.js';
import BoundedDeque from './implementation/BoundedDeque.js';
import SingleElementDeque from './implementation/SingleElementDeque.js';
import EmptyDeque from './implementation/EmptyDeque.js';

import _deque from './_deque.js';

const deque = _deque(
	UnboundedDeque,
	BoundedDeque,
	SingleElementDeque,
	EmptyDeque,
);

export default deque;
