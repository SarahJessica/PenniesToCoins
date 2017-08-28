'use strict';

$(document).ready(init);
var input = $('#penniesTotal').val();

function init() {
  // $('#answer').append("hello");
}

$('#go').click(function() {
  var num = $('#p').val();
  console.log(num);
  $('#answer').append(num);
});

// function mainCalculation() {
//   var num = $('#penniesTotal').val();
//   $('#answer').append(num);
// }
