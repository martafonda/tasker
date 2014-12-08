var taskerTodo = angular.module('taskerTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

var ToggleHandler = (function() {
  var TOGGLED_CLASSNAME_SUFFIX_CLOSED = "-closed";
  var TOGGLED_CLASSNAME_SUFFIX_OPENED = "-opened";

  var dom = {
    body: $("body")
  };

  var toggle = function() {
    var name = $(this).attr("data-toggle-name");
    if($("#container").hasClass(name + TOGGLED_CLASSNAME_SUFFIX_CLOSED)){
        $("#container").toggleClass(name + TOGGLED_CLASSNAME_SUFFIX_OPENED);
        $("#sidebar").toggleClass(name + TOGGLED_CLASSNAME_SUFFIX_OPENED);
    }else{
        $("#container").toggleClass(name + TOGGLED_CLASSNAME_SUFFIX_CLOSED);
        $("#sidebar").toggleClass(name + TOGGLED_CLASSNAME_SUFFIX_CLOSED);
    }
  };
  
  return function(toggleableElements) {
    $(toggleableElements).on("click", toggle);
  };
})();

ToggleHandler("#toggleSidebar");
