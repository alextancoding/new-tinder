$(function(){

    var index = 0;
    var jsonData;
    var foodLength;
    var availableFood = [];

    window.onload = function() {
        document.getElementById("dislike").onclick = disliked;
        document.getElementById("like").onclick = liked;
        getData();
        availableFood();
    };

    $.get("/ping", function(data){
        if(data.error == "true"){
            $("#results").prepend("<div class='alert alert-danger'><strong>Error!</strong> "+ data.message +"</div>");
        }
    }, "json")

    function getData() {
        $.get("getFoodStack", function(data){
            console.log(data);
            jsonData = data.result[index];
            foodLength = data.result.length;
            jsonUrl = jsonData[1];
            jsonPrice = jsonData[2];
            jsonName = jsonData[4];

            document.getElementById("foodName").innerHTML = jsonName;
            document.getElementById("foodPrice").innerHTML = jsonPrice;
            document.getElementById("foodImage").src = jsonUrl;
        }, "json")
    }

    function availableFood() {
        for (var i = 0; i < foodLength.length; i++) {
            availableFood.push(i);
        }
        console.log(availableFood);
    }
    

    function disliked() {      
        if (availableFood.length == 0) { //size - 1
            document.getElementById("foodName").innerHTML = "----";
            document.getElementById("foodPrice").innerHTML = "";
            document.getElementById("foodImage").src = 'static/img/empty.jpg';
        } else {
            document.getElementById("youMatched").innerHTML = "";
            removeIndex = Math.floor(Math.random() * availableFood.length); //random # between 0 and availableFood.length
            index = availableFood[removeIndex];
            console.log(index);
            availableFood.splice(removeIndex, 1);
            getData();
        }
    }

    function liked() {
        if (availableFood.length > 0) {
            getData();
            document.getElementById("youMatched").innerHTML = "It's a Match! ...with " + jsonName;
        }
    }

})





