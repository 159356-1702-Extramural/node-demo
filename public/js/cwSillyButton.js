var i = 0;
var responses = ["Don't click it!","Please don't click", "Stop it.", "No more", "Fine, click away."];

document.getElementById("the_button").addEventListener("click", function(){
    if(i < responses.length){
        var button = document.getElementById("the_button");
        button.innerHTML = responses[i];
        i++;
    }else{
        i = 0;
    }
}); 