console.log("popup.js loaded");

let Vault7=angular.module("Vault7",['ui.router']);
Vault7.config(function ($stateProvider,$urlRouterProvider) {
$stateProvider
.state('home',{
    url:'/home',
    templateUrl:'../views/Welcome.html'
})
.state('login',{
    url:'/login',
    templateUrl:'../views/login.html'
})  
.state('signup',{
    url:'/signup',
    templateUrl:'../views/Signup.html'
}) 
.state('welcome',{
    url:'/welcome',
    templateUrl:'../views/Welcome.html'
}) 
$urlRouterProvider.otherwise('login')  
})

Vault7.controller("PopupCtrl",['$scope','$state',function($scope,$state){
    console.log("Popup control initialized");
    $scope.login=function(formData)
    {
        console.log("Login Form Data:",formData);
        chrome.runtime.sendMessage({type:"login",data: formData},
        function(response)
        {
            console.log("response from background is :",response);
            if(response.user)
            {
                $scope.name=response.username;
                $state.go('welcome');
            }
        }
        );
    }
    $scope.signup=function(formData)
    {
        console.log("Signup Form Data:",formData);
        chrome.runtime.sendMessage({type:"signup",data: formData},
        function(response)
        {
            console.log("response from background is :",response);
            if(response.token)
            {
                $state.go('signup',{});
                $state.go('/login',{});
                console.log("going to login");
            }
        }
        );
    }
}])