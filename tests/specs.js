describe('Filters', function(){
	beforeEach(module('myapp'));
	describe('reverse', function(){
		var reverse;
		beforeEach(inject(function($filter){
			reverse = $filter('reverse', {});
		}));
		it('Should reverse a string', function(){
			expect(reverse('car')).toBe('rac');
			expect(reverse('don')).toBe('nod'); 
		});
	});

	//==============control1==================
	describe('control-1', function(){
		beforeEach(module('myapp'));
		var arr, scope, name;
		beforeEach(inject(function( $rootScope, $controller ){
			scope = $rootScope.$new();
			name = $controller('control1', {
				$scope : scope
			});
		}));
		it('Should have 3 names', function(){
			expect(scope.names.length).toBe(3);
			expect(scope.name).toEqual("Mauricio");
		})
	});
	//=============directive==================
	describe('first directive', function(){
		var compile, scope, directiveElem;
		/*beforeEach(function(){
			module('myapp');
			inject(function($compile, $rootScope){
				compile = $compile;
				scope = $rootScope.$new();
			});
			directiveElem = getCompiledElement();
		});
		function getCompiledElement(){
			var element = angular.element('<div dir></div>');
			var compiledElement = compile(element)(scope); 			
			scope.$digest();
			return compiledElement;
		}
		it('Should have updated text in span', function(){
			scope.text = 'some texts';
			scope.$digest();
			var spanElement = directiveElem.find('span');
			expect( spanElement ).toBeDefined();
			expect( spanElement.text() ).toEqual(scope.text);
		});
		

		it('Should increment counter onclick', function(){
			var element = angular.element('<div increment-counter></div>');
			var compileElement = compile(element)(scope);
			scope.$digest();
			directiveElem = compileElement;
			scope.value = 10;
			var button = directiveElem.find('button');
			button.triggerHandler('click');			
			scope.$digest();
			expect( scope.value).toEqual(11);
		});
		*/
		beforeEach(function(){
			module('myapp');
			inject(function($compile, $rootScope){
				compile = $compile;
				scope = $rootScope.$new();
				scope.config = {
					prop: 'value'
				};
				scope.notify = true;
				scope.onChange = jasmine.createSpy('onChange');
			});
			directiveElem = getCompiledElement2();
		});
		function getCompiledElement2(){
			var compiledDirective = compile(angular.element('<scope-directive config="config" notify="notify" on-change="onChange()"></scope-directive>'))(scope);
			scope.$digest();
			return compiledDirective;
		}
		it('config on isolated scope should be two-way bound', function(){
			var isolatedScope = directiveElem.isolateScope();
			isolatedScope.config.prop = 'value2';
			expect( scope.config.prop).toEqual('value2');
		});
		it('notify on isolated scope should be one-way bound', function(){
			var isolatedScope = directiveElem.isolateScope();
			isolatedScope.notify = false;
			expect( scope.notify ).toEqual( true );
		});
		it('onChange should be a function', function(){
			var isolatedScope = directiveElem.isolateScope();
			expect( typeof(isolatedScope.onChange)).toEqual('function');
		});
		it('should call onChange method of scope when invoked from isolated scope', function(){
			var isolatedScope = directiveElem.isolateScope();
			isolatedScope.onChange();
			expect(scope.onChange).toHaveBeenCalled();
		});
	});

});