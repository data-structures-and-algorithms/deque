
var dll = require( "aureooms-js-dll" ) ;
var compare = require( "aureooms-js-compare" ) ;
var itertools = require( "aureooms-js-itertools" ) ;

var sorted = itertools.sorted ;

var mycollections = collections.compile( {

	BaseSet : Set ,
	DLL : dll.DoublyLinkedList ,
	BaseMap : Map

} ) ;

var counter = mycollections.counter ;
var NotImplementedError = mycollections.NotImplementedError ;

test( "counter" , function ( ) {

	var c ;

	c = counter( ) ;
	deepEqual( c.len( ) , 0 , "can build an empty counter" ) ;

	c = counter( "gallahad" ) ;
	deepEqual( c.get( "a" ) , 3 , "can build a counter from a string" ) ;

//	c.add( { "l" : 2 , "x" : 1 } ) ;
//	deepEqual( c.get( "l" ) , 4 , "can add an object" ) ;

	c.add( new Map( [ [ "x" , 1 ] ] ) ) ;
	deepEqual( c.get( "x" ) , 1 , "can add a Map object" ) ;

	c.add( [ [ "x" , 1 ] ] ) ;
	deepEqual( c.get( "x" ) , 2 , "can add a mapping" ) ;

	c.subtract( new Map( [ [ "x" , 1 ] ] ) ) ;
	deepEqual( c.get( "x" ) , 1 , "can subtract a Map object" ) ;

	c.subtract( [ [ "x" , 1 ] ] ) ;
	deepEqual( c.get( "x" ) , 0 , "can subtract a mapping" ) ;

	c.decrement( "x" ) ;
	deepEqual( c.get( "x" ) , -1 , "decrement" ) ;

	c.increment( "x" ) ;
	deepEqual( c.get( "x" ) , 0 , "increment" ) ;

	c.set( "w" , -1 ) ;

	deepEqual(
		sorted( compare.increasing , c.elements( ) ) ,
		[ "a" , "a" , "a" , "d" , "g" , "h" , "l" , "l" ] ,
		"elements"
	) ;

	c = counter( [ "eggs" , "ham" ] ) ;
	deepEqual( c.get( "bacon" ) , 0 , "count of a missing element is zero" ) ;

	raises( counter.fromkeys.bind( null , "abc" ) , NotImplementedError , "fromkeys default" ) ;
	raises( counter.fromkeys.bind( null , "abc" , 1 ) , NotImplementedError , "fromkeys" ) ;

} ) ;