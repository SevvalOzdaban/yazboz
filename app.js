var selIt, startUser, selectedItem, checked, lowestToHighest;
var checks = $('.form-check-input');
var counter = 1;
var output1 = $('#output1');
var output2 = $('#output2');
var output3 = $('#output3');
var output4 = $('#output4');
document.getElementById("page2").style.display = "none";

//in page1 --> users can select one checkbox
checks.click(function () {
  checks.not(this).prop("checked", false);
  startUser = parseInt(this.id);
});
//select and display user image
$('.user1').on("change", "#input1", function () {
  if (event.target.files.length > 0) {
    src1 = URL.createObjectURL(event.target.files[0]);
    output1 = $("#output1").attr('src', src1);
    var outputSrc1 = output1.attr("src");
    $("#image1Col").append("<img width='100%' height='100px' src='" + outputSrc1 + "'/>");
  }
});
$('.user2').on("change", "#input2", function () {
  if (event.target.files.length > 0) {
    src2 = URL.createObjectURL(event.target.files[0]);
    output2 = $("#output2").attr('src', src2);
    var outputSrc2 = output2.attr("src");
    $("#image2Col").append("<img width='100%' height='100px' src='" + outputSrc2 + "'/>");
  }
});
$('.user3').on("change", "#input3", function () {
  if (event.target.files.length > 0) {
    src3 = URL.createObjectURL(event.target.files[0]);
    output3 = $("#output3").attr('src', src3);
    var outputSrc3 = output3.attr("src");
    $("#image3Col").append("<img width='100%' height='100px' src='" + outputSrc3 + "'/>");
  }
});
$('.user4').on("change", "#input4", function () {
  if (event.target.files.length > 0) {
    src4 = URL.createObjectURL(event.target.files[0]);
    output4 = $("#output4").attr('src', src4);
    var outputSrc4 = output4.attr("src");
    $("#image4Col").append("<img width='100%' height='100px' src='" + outputSrc4 + "'/>");

  }
});

function getLaps() {
  if (($("#name1").val()) == "" || ($("#name2").val()) == "" || ($("#name3").val()) == "" || ($("#name4").val()) == "" ) {
    Swal.fire("Please fill text field");
  }
  else if (!($('input:checkbox').is(":checked"))) {
    Swal.fire("Please select check box");
  }
  else {
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
    //get and set users name for users score table
    $("#user1Col").text($("#name1").val());
    $("#user2Col").text($("#name2").val());
    $("#user3Col").text($("#name3").val());
    $("#user4Col").text($("#name4").val());
    selIt = $("#selectedItem").val(); //string
    selectedItem = parseInt(selIt); // convert to int
    //create users score table 
    for (var i = 1; i <= selectedItem; i++) {
      var markup = "<tr id=row" + i + "><td class=table-dark>" + i + "</td></tr>";
      $("table #tbody1").append(markup);
      for (var j = 1; j < 5; j++) {
        var mark =
          "<td><input id=user" + i + j + " type='number'></td>";
        $("#row" + i).append(mark);
      }
      var check =
        "<td><input type='checkbox' id='checkBox" + i + "' onClick='checkControl(this)' </td>";
      $("#row" + i).append(check);
    }
    $("tr :input").attr('disabled', true);
    $("#row1 :input").attr('disabled', false);
    getStarter();
    compareUsers();
  }
} 

//find players who are starting
function getStarter() {
  for (var i = 1; i <= selectedItem; i++) {
    var mod = startUser % 4;
    // console.log(`startUserId`, startUser)
    $("#user" + i + mod).css("background-color", '#ccccff');
    if (mod == 0) {
      mod = 4;
      $("#user" + i + mod).css("background-color", '#ccccff');
    }
    startUser++;
  }
}
function checkControl(elem) {
  //disable rows
  var tr = $(elem).closest("tr");
  $(tr).find('input').attr('disabled', true);
  $(tr).next("tr").find('input').attr('disabled', false);
  //when users don't fill input values, set this values zero
  if(!$(tr).find('input').val()){
    $(tr).find('input').val("0");
  }
  //find current sum
  $("#sumUser1").text(parseInt(parseInt($("#user" + counter + 1).val()) + parseInt($("#sumUser1").text())));
  $("#sumUser2").text(parseInt(parseInt($("#user" + counter + 2).val()) + parseInt($("#sumUser2").text())));
  $("#sumUser3").text(parseInt(parseInt($("#user" + counter + 3).val()) + parseInt($("#sumUser3").text())));
  $("#sumUser4").text(parseInt(parseInt($("#user" + counter + 4).val()) + parseInt($("#sumUser4").text())));
  //sort current sum
  var inputVal = [parseInt($("#sumUser1").text()), parseInt($("#sumUser2").text()), parseInt($("#sumUser3").text()), parseInt($("#sumUser4").text())];
  lowestToHighest = inputVal.sort((a, b) => a - b);
  
  //find user's alignment
  //1.green // 2.yellow // 3.orange // 4.red
  for (var i = 1; i < 5; i++) {
    if (parseInt($("#sumUser" + i).text()) == lowestToHighest[0]) {
      $("#sumUser" + i).css("background-color", "#47d147");
      winnerName = $("#name" + i).val();
    }
    if (parseInt($("#sumUser" + i).text()) == lowestToHighest[1]) {
      $("#sumUser" + i).css("background-color", "#ffff99");
    }
    if (parseInt($("#sumUser" + i).text()) == lowestToHighest[2]) {
      $("#sumUser" + i).css('background', '#ff9966');
    }
    if (parseInt($("#sumUser" + i).text()) == lowestToHighest[3]) {
      $("#sumUser" + i).css('background', '#ff3333  ');
    }
  }
  counter++;
  //users summary table
  for (var i = 1; i <= 4; i++) {
    for (var j = 1; j <= 4; j++) {
      if (i == j) {
        $(".cross").text("X");
        $(".cross").css('background', "#ffff66");
      }
      else {
        $("#" + i + j).text((parseInt($("#sumUser" + i).text()) - parseInt($("#sumUser" + j).text())));
        var sumDif = $("#" + i + j).text();
        if (parseInt(sumDif) > 0) {
          $("#" + i + j).css('background', "#ff3333");
        }
        else if (parseInt(sumDif) == 0) {
          $("#" + i + j).css('background', "#6666ff");

        }
        else {
          $("#" + i + j).text(Math.abs(parseInt(sumDif)));
          $("#" + i + j).css('background', "#4dff88");
        }
      }
    }
  }
  findWinner();
}
function compareUsers() {
  $("#compareUser1").text($("#name1").val());
  $("#compareUser11").text($("#name1").val());
  $("#compareUser2").text($("#name2").val());
  $("#compareUser22").text($("#name2").val());
  $("#compareUser3").text($("#name3").val());
  $("#compareUser33").text($("#name3").val());
  $("#compareUser4").text($("#name4").val());
  $("#compareUser44").text($("#name4").val());
}
function findWinner(){
var selIt = $("#selectedItem").val();
selectedItem = parseInt(selIt); // convert to int
  if($("#checkBox" + selectedItem).is(':checked')){
    //document.getElementById("results").style.display = "display";
    Swal.fire("Winner is " + winnerName + " with " + lowestToHighest[0] + " point");
}
}