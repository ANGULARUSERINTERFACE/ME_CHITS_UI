myApp.config(['$routeProvider', '$locationProvider',
	function ($routeProvider,$locationProvider) {
		$routeProvider
			.when('/adminPage', {
				templateUrl: 'adminPage.html'
			})
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
	}
]);

myApp.controller('loginFormController',function($scope,$modal){
	$scope.showLogin = function() {
		$scope.opts = {
			backdrop: true,
			backdropClick: true,
			dialogFade: false,
			keyboard: false,
			templateUrl: 'loginForm.html',
			controller: loginController,
		};
		var modalInstance = $modal.open($scope.opts);
	};
});
var loginController = function($scope,$modalInstance,$modal,$http,$location){
	$scope.activeLoginForm = function(){
		$("#login-form").delay(100).fadeIn(100);
		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$('#login-form-link').addClass('active');
	}
	$scope.activeRegisterForm = function(){
		$("#register-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$('#register-form-link').addClass('active');
	}
	$scope.loginProcessController = function(){
		
		if($('#username').val() == ''){
			$('#alert').html('Please enter the User Name!!!');
		}
		else if($('#password').val() == ''){
			$('#alert').html('Please enter the Password!!!');
		}
		else if($('#userRole').val() == ''){
			$('#alert').html('Please select Your Role');
		}
		else{
			var data = {
				userName: $('#username').val(),
				passWord: $('#password').val(),
				userRole: $('#userRole').val()
			}
			$http({
				url: '/processLogin', // No need of IP address
				method: 'POST',
				data: data,
				headers: {'Content-Type': 'application/json'}
			}).success(function(data){  
				if(data.length == 0){
					$('#alert').html('Username and Password didn\'t match each other. Please try again.');
				}
				else{
					$('.panel-heading').parent().remove();
					$('.modal-backdrop').remove();
					$location.path('/adminPage');
				}
			});
		}
	}
	$scope.removeAlert = function(){
		$('#alert').html('');
	}
	$scope.registerProcessController = function(){
		
	}
}

function capitalize(s){
    return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
};
