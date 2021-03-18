import ArbitrarySizeDeque from './ArbitrarySizeDeque.js';

export default function UnboundedDeque(iterable) {
	this._growth = 2;

	this._minsize = 10;

	this._currentsize = this._minsize;

	// eslint-disable-next-line unicorn/no-new-array
	this._container = new Array(this._currentsize);

	this._center = 0;

	this.length = 0;

	if (iterable !== null) {
		this.extend(iterable);
	}
}

UnboundedDeque.prototype = new ArbitrarySizeDeque();

UnboundedDeque.prototype._copy = function (container) {
	const length = this.length;

	for (let i = 0; i < length; ++i) {
		container[i] = this.get(i);
	}
};

UnboundedDeque.prototype._realloc = function (newsize) {
	// eslint-disable-next-line unicorn/no-new-array
	const container = new Array(newsize);

	this._copy(container);

	this._container = container;

	this._center = 0;

	this._currentsize = newsize;
};

UnboundedDeque.prototype._shrink = function () {
	const newsize = Math.max(this._minsize, this.length * this._growth);

	if (newsize * this._growth >= this._currentsize) {
		return;
	}

	this._realloc(newsize);
};

UnboundedDeque.prototype._grow = function (newlen) {
	if (newlen <= this._currentsize) {
		return;
	}

	this._realloc(newlen * this._growth);
};

UnboundedDeque.prototype.len = function () {
	return this.length;
};

UnboundedDeque.prototype.capacity = function () {
	return this._currentsize;
};

UnboundedDeque.prototype.append = function (x) {
	this._grow(this.length + 1);

	const i = (this._center + this.length) % this._currentsize;
	this._container[i] = x;
	++this.length;

	return this;
};

UnboundedDeque.prototype.appendleft = function (x) {
	this._grow(this.length + 1);

	--this._center;
	this._center += this._currentsize;
	this._center %= this._currentsize;
	this._container[this._center] = x;

	++this.length;

	return this;
};

UnboundedDeque.prototype.clear = function () {
	this._currentsize = this._minsize;

	// eslint-disable-next-line unicorn/no-new-array
	this._container = new Array(this._currentsize);

	this._center = 0;

	this.length = 0;

	return this;
};

UnboundedDeque.prototype.copy = function () {
	return new UnboundedDeque(this);
};

UnboundedDeque.prototype._where = function (i) {
	this._checkbounds(i);

	return [this._container, (this._center + i) % this._currentsize];
};

UnboundedDeque.prototype._popindex = function (container, index) {
	const value = container[index];

	// GC
	// TODO use null instead of 0 for non-Number deques
	container[index] = 0;

	--this.length;

	this._shrink();

	return value;
};
