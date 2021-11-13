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
async function storing(text1,text2,text3)
{
    var email=text1;
    var password=text2;
    var type=text3;
    var res=console.log(`the email is ${email} the password is ${password} the type is ${type}`);
    const uri="mongodb+srv://root:k0007@vault7cluster.vfpyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client= new MongoClient(uri);
    try {
        await client.connect();
        if(client.connect)
        {
            console.log(`db connected`);
        }
        /* await listDatabases(client); */
        await createListing(client,{
            email:text1,
            password:text2,
            type:text3
        });
    } catch (error) {
        console.log(error);
        
    }
   /*  finally
    {
        await client.close();
    } */
}
async function createListing(client, newListing){
    const result = await client.db("myFirstDatabase").collection("user_data").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}