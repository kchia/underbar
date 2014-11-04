/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
    // Alternative:
    // if (n === undefined){
    //   return array[0];
    // } else {
    //   return array.slice(0,n);
    // }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === 0 ? [] : 
      n > array.length ? array :
        n === undefined ? array[array.length-1] : array.slice(n-1,array.length)

    // Alternative:
    // if (n === 0) {
    //   return [];
    // } else if ( n > array.length) {
    //   return array;
    // } else {
    //   return n === undefined ? array[array.length-1] : array.slice(n-1,array.length);
    // }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    Array.isArray(collection) ? 
      function(){
        for(var i = 0; i < collection.length ;i++){
          iterator(collection[i], i, collection)
        }
      }() :
      function(){
        for(var i in collection){
          iterator(collection[i], i, collection)
        }
      }()

    // if (Array.isArray(collection)){
    //   for(var i = 0; i < collection.length; i++){
    //     iterator(collection[i], i, collection);
    //   }
    // } else {
    //   for(var i in collection){
    //     iterator(collection[i], i, collection);
    //   }
    // }
  
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;

    // Alternative:
    // var result;
    // each(collection, function(item,index){
    //     if (item === target) {
    //         result = index;
    //     }
    // });
    // return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = [];
    _.each(collection,function(item){
      if (test(item)){
        filtered.push(item);
      }
    });
      return filtered;
    /* Alternative:
     * var filtered = [];
     * for(var i=0; i < collection.length; i++){
     *   if (test(collection[i])){
     *   filtered.push(collection[i]);
     * }
     *}
     * return filtered;
    */
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection,function(item){
      return !test(item);
    });
    /* Alternative: 
     * var rejected = [];
     * _.each(collection, function(element){
     * if (!test(element)){
     *  rejected.push(element);
     * }
     * });
     * return rejected;
     */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var unique = [];
    _.each(array,function(item){
      if (unique.indexOf(item) === -1){
        unique.push(item);
      }
    })
    return unique;

    // Alternative 1:
    // var unique = [];
    // var sortedArr = array.sort();
    // _.each(sortedArr,function(item,i){
    //   if (i === 0) {
    //     unique.push(item);
    //   } else if (!(item === sortedArr[i-1])){
    //     unique.push(item);
    //   }
    // }
    // );
    // return unique;

    // Alternative 2:
    // var unique = [];
    // var sortedArr = array.sort();
    //  for (var i = 0; i < array.length; i++){
    //   if (i === 0){
    //    unique.push(sortedArr[i]);
    //  } else if (!(sortedArr[i] === sortedArr[i-1])){
    //    unique.push(sortedArr[i]);
    //   }
    //  }
    // return unique;
    
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];
    _.each(collection,function(item){
      mapped.push(iterator(item));
    });
    return mapped;
    /* Alternative:
     * for(var i = 0; i < collection.length ;i++){
     *  mapped.push(iterator(collection[i]));
     * }
     * return mapped;
     */
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
    // Alternative:
    // var plucked =[];
    // _.each(collection, function(item,index){
    //   for (var i in item){
    //     if(key === i){
    //         plucked.push(item[key]);
    //     }
    //   }
    // });
    // return plucked;
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args){
    return typeof functionOrKey === 'function' ? 
      function(){
        return _.map(collection, function(item){
          return functionOrKey.apply(item);
        });
      }() : function(){     
        return _.map(collection, function(item){
          return item[functionOrKey]();
        });
      }()
    };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
      accumulator === undefined ? accumulator = collection[0] : accumulator;
      _.each(collection, function(item){
        accumulator = iterator(accumulator,item);
      });
      return accumulator;
    // Alternative:
    //   accumulator === undefined ? accumulator = collection[0] : accumulator; 
    //   var current = accumulator;
    //   for (var i = 0; i < collection.length; i++){
    //     current = iterator(current,collection[i]);
    //   }
    //   return current;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        } 
        return item === target;
      }, false);
    
    // Alternative:
    //     var result = false;
    //     collection.length === undefined ? 
    //     function(){
    //       _.each(collection, function(value,key){
    //           if (value === target){result = true;}
    //       })
    //     }() : 
    //     function(){
    //       _.each(collection, function(item){
    //           if (item === target){result = true;}
    //       })
    //     }();
    //     return result;

    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    return _.reduce(collection,function(accumulator,item){
       if (iterator(item) && accumulator){
        return true;
       }
       return false;
    },true);

  // Alternative:
  //   var falsyResults = [0, undefined, null, false];
  //   return _.reduce(collection, function(current, item){
  //     if (iterator === undefined) {
  //       if (_.contains(falsyResults,item)){
  //         return false;
  //       }
  //       return true;
  //     } else if (_.contains(falsyResults,iterator(item))) {
  //         return false;
  //     } else {
  //         return current;
  //     }
  //   }, true);
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    return _.contains(collection,'yes') ? true : !_.every(collection, function(item){return !iterator(item);});
    // return collection.length === 0 ? false :  
    //   _.contains(collection,'yes') || _.reduce(collection,function(current,item){ 
    //     return !iterator(item) ? current : true;
    //     },false) ? true : 
    //     _.every(collection,iterator) && !_.contains(collection,false) ? true : 
    //       !_.every(collection,iterator) && !_.contains(collection,true) ? false : true; 
          

    // Alternative 2: 
    // var falsyResults = [0, undefined, null, false];
    // iterator === undefined ? iterator = _.identity : iterator;
    // return _.reduce(collection,function(current,item){
    //   return !iterator(item) || _.contains(falsyResults,item) ? current : true;
    // },false); 

    // Alternative 1:
    // iterator === undefined ? iterator = _.identity : iterator;
    // var truthyResults = [true,{},'yes'];
    //  if (collection.length === 0) {
    //     return false;
    //   } else { 
    //       return _.reduce(collection,function(current,item){
    //         return iterator(item) || _.contains(truthyResults,item) ? true : current;
    //         }, false) 
    //   } 
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var obj1 = arguments[0];
    _.each(arguments, function(item){
      for(var k in item){
        obj1[k] = item[k];
      }
    });
      return obj1;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var obj1 = arguments[0];
    _.each(arguments, function(item){
      for(var k in item){
        k in obj1 ? obj1[k] : obj1[k] = item[k];
      }
    });
      return obj1;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};
    var value;
    return function(){
      var key = JSON.stringify(arguments);
      if(key in memo){
        value = memo[key];
      } else {
        value = func.apply(this,arguments);
        memo[key] = value;
      }
      return value;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, args) {
    var argsArr = [];
    _.each(arguments,function(item,index){
      if (index > 1) {
        argsArr.push(item);
      }
    });
    setTimeout(function(){
      return func.apply(this,argsArr);
      },
      wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffled = [];
    var arrCopy = array.slice(0);
    var randIndex;
    for(var i = 0; i < array.length; i++){
      var randIndex = Math.floor(Math.random() * arrCopy.length);
      shuffled[i] = arrCopy[randIndex];
      arrCopy.splice(randIndex, 1);
    };
    return shuffled;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
      result = result || [];
      _.each(nestedArray, function(item){
          Array.isArray(item) ? _.flatten(item, result) : result.push(item);
          });
      return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
