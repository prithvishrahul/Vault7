console.log("Background script running successfully");

let dev=true;
let domain=dev ? "http://localhost:8001/" : "https://www.vault7.com";

chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch(message.type)
        {
            case "login":
                console.log("login form data is: ",message.data);
                let loginusercred=message.data;
                loginusercred.username= message.data.email.split('@')[0];
                ajaxCall("POST","user/login",loginusercred,function(response){
                    console.log("response from the server",response);
                })
                return true;
                break;
            case "signup":
                console.log("signup formdata",message.data);
                let signupusercred=message.data;
                signupusercred.username= message.data.email.split('@')[0];
                ajaxCall("POST","user/signup",signupusercred,function(response){
                    console.log("response from the server",response);
                })
                return true;
                break;
            default:
                console.log("couldn't see matching case");
        }
    }
);

function ajaxCall(type,path,data,callback)
{
    $.ajax({
        url: domain + path,
        data:data,
        type:type,
        sucess:function(response){
            console.log("response:",response);
            callback(response);
    
        },
        error:function(response){
            console.log("response: ",response);
            callback(response);
        }
      });
}
