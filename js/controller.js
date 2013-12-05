'use strict';

/* Controllers */



/**
 * Controller for the whole html content.
 *
 * @param $scope
 * @param $location
 * @constructor
 */
function AppCtrl($scope) {
  $scope.newTodo = "";

  $scope.todos = [];
  $scope.items = [];

  $scope.addTodo = function() {

    $scope.todos.push($scope.newTodo);

    console.log($scope.newTodo);
    $scope.newTodo = "";
  }
}
AppCtrl.$inject = ['$scope'];

