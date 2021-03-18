import ArbitrarySizeDeque from './ArbitrarySizeDeque.js';

export default function BoundedDeque(iterable, maxlen) {
	this._maxlen = maxlen;

	// eslint-disable-next-line unicorn/no-new-array
	this._container = new Array(maxlen);

	this._center = 0;

	this.length = 0;

	if (iterable !== null) {
		this.extend(iterable);
	}
}

BoundedDeque.prototype = new ArbitrarySizeDeque();

BoundedDeque.prototype.len = function () {
	return this.length;
};

BoundedDeque.prototype.capacity = function () {
	return this._maxlen;
};

BoundedDeque.prototype.append = function (x) {
	if (this.length === this._maxlen) {
		this._container[this._center] = x;
		++this._center;
		this._center %= this._maxlen;
	} else {
		const i = (this._center + this.length) % this._maxlen;
		this._container[i] = x;
		++this.length;
	}

	return this;
};

BoundedDeque.prototype.appendleft = function (x) {
	--this._center;
	this._center += this._maxlen;
	this._center %= this._maxlen;
	this._container[this._center] = x;

	if (this.length < this._maxlen) {
		++this.length;
	}

	return this;
};

BoundedDeque.prototype.clear = function () {
	this._center = 0;

	this.length = 0;

	// eslint-disable-next-line unicorn/no-new-array
	this._container = new Array(this._maxlen);

	return this;
};

BoundedDeque.prototype.copy = function () {
	return new BoundedDeque(this, this._maxlen);
};

BoundedDeque.prototype._where = function (i) {
	this._checkbounds(i);

	return [this._container, (this._center + i) % this._maxlen];
};

BoundedDeque.prototype._popindex = function (container, index) {
	const value = container[index];

	// GC
	// TODO use null instead of 0 for non-Number deques
	container[index] = 0;

	--this.length;

	return value;
};
