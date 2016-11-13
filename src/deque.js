import {
	Deque ,
	ArbitrarySizeDeque ,
	UnboundedDeque ,
	BoundedDeque ,
	SingleElementDeque ,
	EmptyDeque ,
} from './implementation' ;

const deque = _deque( UnboundedDeque , BoundedDeque , SingleElementDeque , EmptyDeque ) ;

export default deque ;
