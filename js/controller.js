'use strict';

/* Controllers */



/**
 * Controller for the whole html content.
 *
 * @param $scope
 * @param $location
 * @constructor
 *
 * @see http://www.recursiverobot.com/post/53767548784/angularjs-with-indexeddb-using-a-helper-library
 */
function AppCtrl($scope) {
  $scope.newTodo = "";

  $scope.items = '';

  var initCallback = function(){
    getItems();
  };

  var dataStore = new IDBStore('todos', initCallback);

  var getItemsSuccess = function(data){
    $scope.items = data;
    // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
    $scope.$apply();
  };

  var errorCallback = function(){
    console.log('error');
  };

  var getItems = function(){
    dataStore.getAll(getItemsSuccess,errorCallback);
    console.log('getItems');
  };

  $scope.deleteItem = function(item){
    dataStore.remove(item,getItems,errorCallback);
  }

  $scope.addItem = function(){
    dataStore.put({'timeStamp': new Date().getTime(), 'text' : $scope.newTodo},getItems,errorCallback);
    $scope.newTodo = '';
  };

}
AppCtrl.$inject = ['$scope'];

