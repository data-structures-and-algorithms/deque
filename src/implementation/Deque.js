import {NotImplementedError, IndexError, ValueError} from '@aureooms/js-error';

/**
 * Deque.
 */
export default function Deque() {}

/**
 * Deque.prototype.len.
 *
 * @return {Number}
 */
Deque.prototype.len = function () {
	throw new NotImplementedError('len');
};

/**
 * Deque.prototype.capacity.
 *
 * @return {Number}
 */
Deque.prototype.capacity = function () {
	throw new NotImplementedError('capacity');
};

/**
 * Deque.prototype.empty.
 *
 * @return {Boolean}
 */
Deque.prototype.empty = function () {
	return this.len() === 0;
};

/**
 * Deque.prototype[Symbol.iterator].
 *
 * @return {Iterable<any>}
 */
Deque.prototype[Symbol.iterator] = function () {
	return this.values();
};

/**
 * Deque.prototype.values.
 *
 * @return {Iterable<any>}
 */
Deque.prototype.values = function () {
	throw new NotImplementedError('values');
};

/**
 * Deque.prototype.append.
 *
 * @param {any} _x
 */
Deque.prototype.append = function (_x) {
	throw new NotImplementedError('append');
};

/**
 * Deque.prototype.appendleft.
 *
 * @param {any} _x
 */
Deque.prototype.appendleft = function (_x) {
	throw new NotImplementedError('appendleft');
};

/**
 * Deque.prototype.clear.
 *
 * @return {Deque}
 */
Deque.prototype.clear = function () {
	throw new NotImplementedError('clear');
};

/**
 * Deque.prototype.copy.
 *
 * @return {Deque}
 */
Deque.prototype.copy = function () {
	throw new NotImplementedError('copy');
};

/**
 * Deque.prototype.count.
 *
 * @param {any} x
 * @return {Number}
 */
Deque.prototype.count = function (x) {
	let c = 0;

	for (const element of this) {
		if (element === x) {
			++c;
		}
	}

	return c;
};

/**
 * Deque.prototype.extend.
 *
 * @param {Iterable<any>} iterable
 */
Deque.prototype.extend = function (iterable) {
	for (const x of iterable) {
		this.append(x);
	}

	return this;
};

/**
 * Deque.prototype.extendleft.
 *
 * @param {Iterable<any>} iterable
 */
Deque.prototype.extendleft = function (iterable) {
	for (const x of iterable) {
		this.appendleft(x);
	}

	return this;
};

/**
 * Deque.prototype._checkbounds.
 *
 * @param {Number} i
 */
Deque.prototype._checkbounds = function (i) {
	if (i < 0 || i >= this.len()) {
		throw new IndexError(i);
	}
};

/**
 * Deque.prototype._where.
 *
 * @param {Number} _i
 * @return {Array}
 */
Deque.prototype._where = function (_i) {
	throw new NotImplementedError('_where');
};

/**
 * Deque.prototype.get.
 *
 * @param {Number} i
 * @return {any}
 */
Deque.prototype.get = function (i) {
	const [container, index] = this._where(i);

	return container[index];
};

/**
 * Deque.prototype.set.
 *
 * @param {Number} i
 * @param {any} value
 * @return {Deque}
 */
Deque.prototype.set = function (i, value) {
	const [container, index] = this._where(i);

	container[index] = value;

	return this;
};

/**
 * Deque.prototype._range
 *
 * @param {Number} start
 * @param {Number} stop
 * @return {Iterable<any>}
 */
Deque.prototype._range = function* (start, stop) {
	for (let i = start; i < stop; ++i) {
		yield [i, this.get(i)];
	}
};

/**
 * Deque.prototype.index.
 *
 * @param {any} x
 * @param {Number} start
 * @param {Number} stop
 */
Deque.prototype.index = function (x, start = 0, stop = this.len()) {
	for (const [i, element] of this._range(start, stop)) {
		if (element === x) {
			return i;
		}
	}

	throw new ValueError('not found');
};

/**
 * Deque.prototype.pop.
 *
 * @return {any}
 */
Deque.prototype.pop = function () {
	throw new NotImplementedError('pop');
};

/**
 * Deque.prototype.popleft.
 *
 * @return {any}
 */
Deque.prototype.popleft = function () {
	throw new NotImplementedError('popleft');
};

/**
 * Deque.prototype.insert.
 *
 * @param {Number} i
 * @param {any} x
 */
Deque.prototype.insert = function (i, x) {
	this._checkbounds(i);

	this.append(x);

	let j = this.len() - 1;

	for (; i < j; --j) {
		const a = this.get(j);
		this.set(j, this.get(j - 1));
		this.set(j - 1, a);
	}

	return this;
};

/**
 * Deque.prototype.delete.
 *
 * @param {Number} i
 */
Deque.prototype.delete = function (i) {
	this._checkbounds(i);

	const length = this.len() - 1;

	for (; i < length; ++i) {
		this.set(i, this.get(i + 1));
	}

	this.pop();

	return this;
};

/**
 * Deque.prototype.remove.
 *
 * @param {any} value
 */
Deque.prototype.remove = function (value) {
	const i = this.index(value);

	this.delete(i);

	return this;
};

/**
 * Deque.prototype.reverse.
 *
 * @return {Deque}
 */
Deque.prototype.reverse = function () {
	for (let i = 0, j = this.len(); i < --j; ++i) {
		const a = this.get(i);
		const b = this.get(j);
		this.set(i, b);
		this.set(j, a);
	}

	return this;
};

/**
 * Deque.prototype.rotate.
 *
 * @param {Number} n
 */
Deque.prototype.rotate = function (n) {
	if (n > 0) {
		while (n-- > 0) {
			this.appendleft(this.pop());
		}
	} else if (n < 0) {
		while (n++ < 0) {
			this.append(this.popleft());
		}
	}

	return this;
};
