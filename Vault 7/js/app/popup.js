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
.state('userstore',{
    url:'/userstore',
    templateUrl:'../views/Userstore.html'
}) 
$urlRouterProvider.otherwise('login')  
})

Vault7.controller("PopupCtrl",['$scope','$state',function($scope,$state){
    console.log("Popup control initialized");
    $scope.login=function(formData)
    {
        console.log("Login Form Data:",formData);
        chrome.runtime.sendMessage({type:"login",data: {...formData,'ok':true}},
        function(response)
        {
            console.log("response from background is :",response);
            if(response.user)
            {
                $scope.name=response.user.username;
                localStorage['username']=response.user.username;
                console.log(localStorage["username"]);
                $state.go('welcome');
            }
        }
        );
    }
    $scope.signup=function(formData)
    {
        console.log("Signup1 Form Data:",formData);
        chrome.runtime.sendMessage({type:"signup",data: {...formData,'ok':true}},
        function(response)
        {
            console.log("response from background is :",response);
            if(response)
            {
                $state.go('signup',{});
                $state.go('login',{});
                console.log("going to login");
            }
        }
        );
    },
    $scope.savecred=function(formData)
    {
        console.log("Savecred Form Data:",formData);
        chrome.runtime.sendMessage({type:"savecred",data: {...formData,'ok':true}},
        function(response)
        {
            console.log("response from background is :",response);
        }
        );
    }
    $scope.retrivecred=function(formData)
    {
        console.log("Savecred Form Data:",formData);
        chrome.runtime.sendMessage({type:"retrivecred",data: {...formData,'ok':true}},
        function(response)
        {
            console.log("response from background is :",response);
        }
        );
    }
    $scope.logout = function(){
    	$state.go('login');
    }
    $scope.goBack = function(){
    	$state.go('welcome');
    }
}])
Vault7.controller("ScraperCtrl",['$scope','$state',function($scope,$state)
{
    console.log("ScraperCtrl initialized");
    $scope.storeCredentials = function(){
    	$state.go('userstore');
    }
    $scope.logout = function(){
    	$state.go('login');
    }
}
])