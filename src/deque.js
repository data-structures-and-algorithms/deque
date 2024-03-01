import _deque from './_deque.js';
import BoundedDeque from './implementation/BoundedDeque.js';
import EmptyDeque from './implementation/EmptyDeque.js';
import SingleElementDeque from './implementation/SingleElementDeque.js';
import UnboundedDeque from './implementation/UnboundedDeque.js';

const deque = _deque(
	UnboundedDeque,
	BoundedDeque,
	SingleElementDeque,
	EmptyDeque,
);

export default deque;
