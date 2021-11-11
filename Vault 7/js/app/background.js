console.log("Background script running successfully");

chrome.runtime.onMessage.addListener(
    function(message,sender,sendResponse)
    {
        switch(message.type)
        {
            case "login":
                console.log("login form data is: ",message.data);
                return true;
                break;
            case "signup":
                console.log("signup formdata",message.data);
                return true;
                break;
            default:
                console.log("couldn't see matching case");
        }
    }
);
$.ajax({
    url: "http://localhost:8001/storing-credential",
    data:{test:"test data"},
    type:"POST",
    sucess:function(response){
        console.log("response:",response);

    },
    error:function(response){
        console.log("response: ",response)
    }
  });