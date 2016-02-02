var App = angular.module('myapp', [])
.filter('reverse', [function(){
	return function(string){
		return string.split('').reverse().join('');
	}
}]);

App.controller("control1", ['$scope', function($scope){
	$scope.names = [{ 'name': 'Mauricio'},{'name':'Diego'},{'name':'Adriana'}];
	$scope.name = "Mauricio";
}]);

App.directive("dir", function(){
	return function(scope, elem){
		var spanElem = angular.element('<span>'+scope.text +'</span>');
		elem.append(spanElem);

		scope.$watch('text', function(newVal, oldVal){
			spanElem.text(newVal);
		})
	};
});

App.directive('incrementCounter', function(){
	return {
		template: '<button>Increment Counter</button>',
		link: function(scope, elem){
			elem.find('button').on('click', function(){
				scope.value++;
			})
		}
	}
});

App.directive('scopeDirective', function(){
	return {
		scope:{
			config: '=',
			notify: '@',
			onChange: '&'
		}
	}
});

App.directive('parentDirective', function(){
	return {
		template: '<child-directive ng-transclude>This is child within a parent directory</child-directive>',
		replace: true,
		controller: function($scope){
			this.getName = function(){
				return 'Mauricio';
			},
			this.show = true;
		}
	}
});
//depends on parentDirective
App.directive('childDirective', function(){
	return {
		replace: true,
		require: ['^parentDirective'],
		translude: true,
		restrict: 'E',
		link: function(){
			console.log("a")
		},
		template: '<div></div>'

	}
});
