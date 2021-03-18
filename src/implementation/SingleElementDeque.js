import {IndexError} from '@aureooms/js-error';
import Deque from './Deque.js';

/**
 * SingleElementDeque.
 *
 * @param {Iterable<any>} iterable
 */
export default function SingleElementDeque(iterable) {
	this._empty = true;

	this._value = 0;

	if (iterable !== null) {
		this.extend(iterable);
	}
}

SingleElementDeque.prototype = new Deque();

SingleElementDeque.prototype.len = function () {
	return this._empty ? 0 : 1;
};

SingleElementDeque.prototype.capacity = function () {
	return 1;
};

SingleElementDeque.prototype.values = function* () {
	if (this._empty) {
		return;
	}

	yield this._value;
};

SingleElementDeque.prototype.append =
	// eslint-disable-next-line no-multi-assign
	SingleElementDeque.prototype.appendleft = function (x) {
		this._empty = false;
		this._value = x;

		return this;
	};

SingleElementDeque.prototype.clear = function () {
	this._empty = true;
	this._value = 0;

	return this;
};

SingleElementDeque.prototype.copy = function () {
	return new SingleElementDeque(this);
};

SingleElementDeque.prototype.pop =
	// eslint-disable-next-line no-multi-assign
	SingleElementDeque.prototype.popleft = function () {
		if (this._empty) {
			throw new IndexError('pop / popleft');
		}

		const value = this._value;

		this._empty = true;
		this._value = 0;

		return value;
	};

SingleElementDeque.prototype.get = function (i) {
	if (this._empty || i !== 0) {
		throw new IndexError(i);
	}

	return this._value;
};

SingleElementDeque.prototype.set = function (i, value) {
	if (this._empty || i !== 0) {
		throw new IndexError(i);
	}

	this._value = value;

	return this;
};
