import {TypeError, ValueError} from '@failure-abstraction/error';

/**
 * _deque.
 *
 * @param {Deque} UnboundedDeque
 * @param {Deque} BoundedDeque
 * @param {Deque} SingleElementDeque
 * @param {Deque} EmptyDeque
 */
export default function _deque(
	UnboundedDeque,
	BoundedDeque,
	SingleElementDeque,
	EmptyDeque,
) {
	/**
	 * Deque.
	 *
	 * @param {Iterable<any>} iterable
	 * @param {Number} maxlen
	 */
	const deque = (iterable = null, maxlen = null) => {
		if (maxlen === null) {
			return new UnboundedDeque(iterable);
		}

		if (!Number.isInteger(maxlen)) {
			throw new TypeError(maxlen);
		}

		if (maxlen === 0) {
			return new EmptyDeque(iterable);
		}

		if (maxlen === 1) {
			return new SingleElementDeque(iterable);
		}

		if (maxlen > 0) {
			return new BoundedDeque(iterable, maxlen);
		}

		throw new ValueError(maxlen);
	};

	return deque;
}
