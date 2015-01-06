var TodoApp = angular.module("TodoApp", ["ngRoute","ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'details.html' }).
            when('/edit/:editId', { controller: EditCtrl, templateUrl: 'details.html' }).

            otherwise({ redirectTo: '/' });
    });

TodoApp.factory('Todo', function ($resource) {
    return $resource('/api/Todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});

var ListCtrl = function ($scope, $location, Todo) {
    $scope.todos = Todo.query();

    $scope.delete = function () {
        var id = this.todo.Id;
        Todo.delete({ id: id }, function () {
            $('#todo_' + id).fadeOut();


        });
    }
};

var CreateCtrl = function ($scope, $location, Todo) {
    $scope.action = "Add!";
    $scope.save = function () {
        Todo.save($scope.item, function () {
            $location.path('/');
        });
    };
};

var EditCtrl = function ($scope, $location, $routeParams, Todo) {
    $scope.action = "Update";
    var id = $routeParams.editId;
    $scope.item = Todo.get({ id: id });

    $scope.save = function () {
        Todo.update({ id: id }, $scope.item, function () {
            $location.path('/');
        });
    }


};