import {IndexError} from '@aureooms/js-error';
import Deque from './Deque.js';

/**
 * EmptyDeque.
 *
 * @param {Iterable<any>} iterable
 */
export default function EmptyDeque(iterable) {
	if (iterable !== null) {
		this.extend(iterable);
	}
}

EmptyDeque.prototype = new Deque();

EmptyDeque.prototype.len = function () {
	return 0;
};

EmptyDeque.prototype.capacity = function () {
	return 0;
};

EmptyDeque.prototype.values = function () {
	return {
		next() {
			return {done: true};
		},
	};
};

EmptyDeque.prototype.append = function (_x) {
	return this;
};

EmptyDeque.prototype.appendleft = function (_x) {
	return this;
};

EmptyDeque.prototype.clear = function () {
	return this;
};

EmptyDeque.prototype.copy = function () {
	return new EmptyDeque(this);
};

EmptyDeque.prototype._where = function (i) {
	throw new IndexError(i);
};

EmptyDeque.prototype.pop =
	// eslint-disable-next-line no-multi-assign
	EmptyDeque.prototype.popleft = function () {
		throw new IndexError('pop / popleft');
	};
