import test from 'ava';

import {_chain as c} from '@iterable-iterator/chain';
import {list as l} from '@iterable-iterator/list';
import {map as m} from '@iterable-iterator/map';
import {range as r} from '@iterable-iterator/range';

import {IndexError, ValueError, NotImplementedError} from './_fixtures.js';

import {deque, Deque, SingleElementDeque, EmptyDeque} from '#module';

test('Deque base class', (t) => {
	const d = new Deque();

	t.throws(d.values.bind(d), {instanceOf: NotImplementedError}, 'Deque values');
	t.throws(l.bind(null, d), {instanceOf: NotImplementedError}, 'list( Deque )');
	t.throws(d.len.bind(d), {instanceOf: NotImplementedError}, 'Deque len');
	t.throws(
		d.capacity.bind(d),
		{instanceOf: NotImplementedError},
		'Deque capacity',
	);
	t.throws(d.empty.bind(d), {instanceOf: NotImplementedError}, 'Deque empty');
	t.throws(
		d.append.bind(d, 0),
		{instanceOf: NotImplementedError},
		'Deque append',
	);
	t.throws(
		d.appendleft.bind(d, 0),
		{instanceOf: NotImplementedError},
		'Deque appendleft',
	);
	t.throws(d.clear.bind(d), {instanceOf: NotImplementedError}, 'Deque clear');
	t.throws(d.copy.bind(d), {instanceOf: NotImplementedError}, 'Deque copy');
	t.throws(
		d.count.bind(d, 0),
		{instanceOf: NotImplementedError},
		'Deque count',
	);
	t.throws(
		d.extend.bind(d, 'a'),
		{instanceOf: NotImplementedError},
		'Deque extend',
	);
	t.throws(
		d.extendleft.bind(d, 'a'),
		{instanceOf: NotImplementedError},
		'Deque extendleft',
	);
	t.throws(d.get.bind(d, 0), {instanceOf: NotImplementedError}, 'Deque get');
	t.throws(d.set.bind(d, 0, 0), {instanceOf: NotImplementedError}, 'Deque set');
	t.throws(
		d.insert.bind(d, 0, 0),
		{instanceOf: NotImplementedError},
		'Deque insert',
	);
	t.throws(d.pop.bind(d), {instanceOf: NotImplementedError}, 'Deque pop');
	t.throws(
		d.popleft.bind(d),
		{instanceOf: NotImplementedError},
		'Deque popleft',
	);
});

test('deque throws', (t) => {
	t.throws(
		deque.bind(null, null, 1.2),
		{instanceOf: TypeError},
		'maxlen float',
	);
	t.throws(
		deque.bind(null, null, -1),
		{instanceOf: ValueError},
		'maxlen negative',
	);
	t.throws(
		deque.bind(null, null, {}),
		{instanceOf: TypeError},
		'maxlen object',
	);
});

test('empty', (t) => {
	t.true(deque().empty(), 'empty');
	t.false(deque('abc').empty(), 'not empty');
});

test('base class is Deque', (t) => {
	t.true(deque() instanceof Deque, 'deque( ) is a Deque');
	t.true(deque('abc') instanceof Deque, "deque( 'abc' ) is a Deque");
	t.true(deque(null) instanceof Deque, 'deque( null ) is a Deque');
	t.true(deque(null, 0) instanceof Deque, 'deque( null , 0 ) is a Deque');
	t.true(deque(null, 1) instanceof Deque, 'deque( null , 1 ) is a Deque');
	t.true(deque(null, 2) instanceof Deque, 'deque( null , 33 ) is a Deque');
	t.true(deque('abc', 0) instanceof Deque, "deque( 'abc' , 0 ) is a Deque");
	t.true(deque('abc', 1) instanceof Deque, "deque( 'abc' , 1 ) is a Deque");
	t.true(deque('abc', 2) instanceof Deque, "deque( 'abc' , 33 ) is a Deque");
});

test('from string', (t) => {
	t.deepEqual(l(deque('abc')), l('abc'), 'iterable constructor');
	t.deepEqual(l(deque('abc', 0)), l(''), 'iterable constructor 0');
	t.deepEqual(l(deque('abc', 1)), l('c'), 'iterable constructor 1');
	t.deepEqual(l(deque('abc', 2)), l('bc'), 'iterable constructor 2');
});

test('capacity', (t) => {
	t.is(deque('abc', 0).capacity(), 0, 'capacity 0');
	t.is(deque('abc', 1).capacity(), 1, 'capacity 1');
	t.is(deque('abc', 2).capacity(), 2, 'capacity 2');
});

test('extendleft', (t) => {
	t.deepEqual(l(deque(null).extendleft('abc')), l('cba'), 'extendleft');
	t.deepEqual(l(deque(null, 0).extendleft('abc')), l(''), 'extendleft 0');
	t.deepEqual(l(deque(null, 1).extendleft('abc')), l('c'), 'extendleft 1');
	t.deepEqual(l(deque(null, 2).extendleft('abc')), l('cb'), 'extendleft 2');
});

test('from range', (t) => {
	t.deepEqual(l(deque(r(0, 100, 1))), l(r(0, 100, 1)), 'range unbounded');
	t.deepEqual(l(deque(r(0, 100, 1), 50)), l(r(50, 100, 1)), 'range bounded');
	t.deepEqual(l(deque(r(0, 100, 1), 1)), l(r(99, 100, 1)), 'range 1');
	t.deepEqual(l(deque(r(0, 100, 1), 0)), l(r(100, 100, 1)), 'range 0');
});

test('EmptyDeque', (t) => {
	const d = deque('abc', 0);

	t.is(d.len(), 0, 'empty len');
	t.true(d.copy() instanceof EmptyDeque, 'empty copy is EmptyDeque');
	t.true(d.copy() !== d, 'empty copy is different');
	t.deepEqual(d.clear(), d, 'empty clear');

	t.throws(d.append('a').get.bind(d, 0), {instanceOf: IndexError}, 'empty get');
	t.throws(
		d.append('a').set.bind(d, 0, 'b'),
		{instanceOf: IndexError},
		'empty set',
	);
	t.throws(d.append('a').pop.bind(d), {instanceOf: IndexError}, 'empty pop');
});

test('SingleElementDeque', (t) => {
	const d = deque('abc', 1);

	t.is(d.len(), 1, 'single len');
	t.true(d.copy() instanceof SingleElementDeque, 'single copy is EmptyDeque');
	t.true(d.copy() !== d, 'single copy is different');
	t.deepEqual(d.clear(), d, 'single clear');
	t.is(d.clear().len(), 0, 'single clear len');

	t.throws(
		d.append('a').get.bind(d, 1),
		{instanceOf: IndexError},
		'single get 1',
	);
	t.throws(
		d.append('a').set.bind(d, 1, 'b'),
		{instanceOf: IndexError},
		'single set 1',
	);
	t.throws(d.clear().pop.bind(d), {instanceOf: IndexError}, 'single pop clear');

	t.throws(
		d.clear().get.bind(d, 0),
		{instanceOf: IndexError},
		'single empty get 0',
	);
	t.throws(
		d.clear().set.bind(d, 0, 'b'),
		{instanceOf: IndexError},
		'single empty set 0',
	);

	d.extend('abcdef');

	t.is(d.get(0), 'f', 'extend single get 0');
	t.deepEqual(d.set(0, 'g'), d, 'extend single set 0');
	t.is(d.pop(), 'g', 'extend single pop clear');

	d.extendleft('abcdef');

	t.is(d.get(0), 'f', 'extendleft single get 0');
	t.deepEqual(d.set(0, 'g'), d, 'extendleft single set 0');
	t.is(d.pop(), 'g', 'extendleft single pop clear');

	t.deepEqual(l(d), l(''), 'single empty values');
});

test('unbounded', (t) => {
	let i = 0;

	let j = 10_000;

	const d = deque(r(i, j, 1));

	t.deepEqual(l(d), l(r(i, j, 1)), 'big unbounded 10000');

	for (; j > 7500; --j) {
		d.pop();
	}

	for (; i < 2500; ++i) {
		d.popleft();
	}

	t.deepEqual(l(d), l(r(2500, 7500, 1)), 'big unbounded 5000');

	for (; j > 5000; --j) {
		d.pop();
	}

	for (; i < 4000; ++i) {
		d.popleft();
	}

	t.deepEqual(l(d), l(r(4000, 5000, 1)), 'shrink unbounded 1000');

	t.deepEqual(d.clear(), d, 'clear unbounded');

	t.is(d.len(), 0, 'unbounded is empty');

	d.extend(r(5000, 10_000, 1));

	d.extendleft(r(4999, -1, -1));

	t.deepEqual(l(d), l(r(0, 10_000, 1)), 'big unbounded extend');

	t.deepEqual(l(d.copy()), l(d), 'big unbounded copy');
});

test('bounded without overflow', (t) => {
	let i = 0;

	let j = 10_000;

	const d = deque(r(i, j, 1), j - i);

	t.deepEqual(l(d), l(r(i, j, 1)), 'big bounded(10000) 10000');

	for (; j > 7500; --j) {
		d.pop();
	}

	for (; i < 2500; ++i) {
		d.popleft();
	}

	t.deepEqual(l(d), l(r(2500, 7500, 1)), 'big bounded(10000) 5000');

	for (; j > 5000; --j) {
		d.pop();
	}

	for (; i < 4000; ++i) {
		d.popleft();
	}

	t.deepEqual(l(d), l(r(4000, 5000, 1)), 'shrink bounded(10000) 1000');

	t.deepEqual(d.clear(), d, 'clear bounded(10000)');

	t.is(d.len(), 0, 'bounded(10000) is empty');

	d.extend(r(5000, 10_000, 1));

	d.extendleft(r(4999, -1, -1));

	t.deepEqual(l(d), l(r(0, 10_000, 1)), 'big bounded(10000) extend');

	t.deepEqual(l(d.copy()), l(d), 'big bounded(10000) copy');
});

test('bounded with overflow', (t) => {
	const d = deque([], 5000);

	d.extend(r(0, 10_000, 1));

	t.deepEqual(l(d), l(r(5000, 10_000, 1)), 'bounded overflow extend');

	d.extendleft(r(0, 2500, 1));

	t.deepEqual(
		l(d),
		l(c([r(2499, -1, -1), r(5000, 7500, 1)])),
		'bounded overflow extend left',
	);
});

test('count', (t) => {
	const d = deque([], 5000);

	d.extend(r(0, 10_000, 1));

	d.extendleft(r(0, 2500, 1));

	t.is(d.count(0), 1, 'count 0 bounded');

	t.is(d.count(null), 0, 'count null bounded');

	const p = function (n) {
		return n < 2500;
	};

	t.is(deque(m(p, d)).count(true), 2500, 'count true');

	t.is(deque(m(p, d), 5000).count(true), 2500, 'count true bounded');

	t.is(deque(m(p, d), 2510).count(true), 10, 'count true bounded');

	t.is(deque(m(p, d), 2500).count(true), 0, 'count true bounded');

	t.is(deque(m(p, d), 10).count(true), 0, 'count true bounded');

	t.is(deque('aaa', 0).count('a'), 0, 'count empty');
	t.is(deque('aaa', 1).count('a'), 1, 'count single a');
	t.is(deque('aaa', 1).count('b'), 0, 'count single b');
});

test('miscellaneous', (t) => {
	const d = deque([], 5000);

	d.extend(r(0, 10_000, 1));

	d.extendleft(r(0, 2500, 1));

	t.deepEqual(l(deque('abcde').set(2, 'X')), l('abXde'), 'set');
	t.deepEqual(l(deque('abcde').reverse()), l('edcba'), 'reverse');
	t.deepEqual(
		l(deque().extendleft('abcde').reverse()),
		l('abcde'),
		'reverse left',
	);
	t.is(deque('abc').index('b'), 1, 'index abc');
	t.is(deque('abcb').index('b'), 1, 'index abcb');
	t.is(deque('abcb').index('b', 2), 3, 'index abcb 2');
	t.throws(
		d.clear().extend('abc').index.bind(d, 'd'),
		{instanceOf: ValueError},
		'index raises',
	);
	t.throws(
		d.clear().extend('abc').index.bind(d, 'b', 2, 3),
		{instanceOf: ValueError},
		'index raises range',
	);

	t.throws(
		d.clear().extend('abc').get.bind(d, -1),
		{instanceOf: IndexError},
		'get -1',
	);
	t.throws(
		d.clear().extend('abc').get.bind(d, 4),
		{instanceOf: IndexError},
		'get out of bounds',
	);

	t.deepEqual(l(deque('abcde').rotate(2)), l('deabc'), 'rotate 2');
	t.deepEqual(l(deque('abcde').rotate(0)), l('abcde'), 'rotate 0');
	t.deepEqual(l(deque('abcde').rotate(-2)), l('cdeab'), 'rotate -2');

	t.deepEqual(l(deque('xabcde', 5).rotate(2)), l('deabc'), 'bounded rotate 2');
	t.deepEqual(l(deque('xabcde', 5).rotate(0)), l('abcde'), 'bounded rotate 0');
	t.deepEqual(
		l(deque('xabcde', 5).rotate(-2)),
		l('cdeab'),
		'bounded rotate -2',
	);

	t.deepEqual(l(deque('abde').insert(2, 'X')), l('abXde'), 'unbounded insert');
	t.deepEqual(l(deque('abXde').delete(2)), l('abde'), 'unbounded delete');
	t.deepEqual(l(deque('abXde').remove('X')), l('abde'), 'unbounded remove');

	t.deepEqual(l(deque('abde', 5).insert(2, 'X')), l('abXde'), 'bounded insert');
	t.deepEqual(l(deque('abXde', 5).delete(2)), l('abde'), 'bounded delete');
	t.deepEqual(l(deque('abXde', 5).remove('X')), l('abde'), 'bounded remove');
});
