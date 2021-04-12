var time=60;
var points=0;
var name = $("#exampleInputEmail1")
var phases = $(".phases")
var start = $("#0")
var buttons = $(".answer")
var startBtn = $("#start")
var id11 = $("#11")
var result = $("#result")
var correct = $(".correct")
// this is taking the previous high scores and packing them into a var
var high_score = localStorage.getItem('high_scores');
// made a box to put the highscors in
var sData = []; 
// if there isn't nothing do this
if (high_score !== null) {
    // this is unpacking the things and returning them to there origanal form
    var sorted_scores = JSON.parse(high_score)
    //this is sorting the scores from smallest to largest 
    sorted_scores.sort(function(a, b){
        return b.score - a.score
    })
    //wrights the score and name of highscore peoples as an list tag  
    for (x of sorted_scores){
        $("#high-scores").append('<li class="list-group-item">'+x.person+': '+x.score+'</li>');
    }
    // this puts the current score to are sData box
    sData = JSON.parse(high_score);
}
// 
$("#countdown").text(time);
$("#pointNum").text(points);


function endGame(){
    hidesteps();
    id11.show()
}

startBtn.on("click", function() {
    start.hide();
    $("#"+this.dataset.step).show();
intervalTimer = setInterval(function(){
    // check the timer and stop at 0
    if (time>0){
    //decrease the timer by one
    $("#countdown").text(time-=1);
    }else{ 
        endGame();
        result.text("TIME RAN OUT")
        // if timedout handle end with the message as parameter
        // handle_end(" Run Out of Time ");
    }
},1000)
})

hidesteps();

function hidesteps(){
    for (step of phases){
    $(step).hide();
  }};

  for ( button of buttons){
    $(button).on("click", function(){
      start.hide();
      hidesteps();
      $("#"+this.dataset.step).show();
      
    if($(this).hasClass("correct")){
        $("#pointNum").text(points+=10);
    }else{
        $("#countdown").text(time-=5);
    }

    if($(this).hasClass("last")){
        clearInterval(intervalTimer);  
        result.text("Congragulations you beat the timer your score was: "+points)
    }

    });
}

// 
$("#submit").on("click", function(){
    // this makes a var wich has the name
    var get_name=$("#exampleInputEmail1").val();
    //if name is larger then 1
    if (get_name.length > 1 ){
        //make var with the score and name
        var saved_score = {
            person: get_name.trim(),
            score: points
        };
    //move the new saved score to the sData box 
    sData.push(saved_score);
    // now it is storing the data in local storage but first it is stringyfying it wich means it is taking the data and bassicly packing it as a string
    localStorage.setItem("high_scores", JSON.stringify(sData));
    //restart the page
    document.location.href=curUrl;
    }
});
// 
