import {
	UnboundedDeque,
	BoundedDeque,
	SingleElementDeque,
	EmptyDeque
} from './implementation/index.js';

import _deque from './_deque.js';

const deque = _deque(UnboundedDeque, BoundedDeque, SingleElementDeque, EmptyDeque);

export default deque;
