'use strict';

$(document).ready(init);
var input = $('#penniesTotal').val();

function init() {
  // $('#answer').append("hello");
}

$('#go').click(function() {
  console.log('in the function');
  var radio = $("input[name='currency']:checked").attr('value');
  var currency = getDenominations(radio);
  var num = $('#p').val();
  var ans = mainCalculation(num, currency);
  displayAnswers(currency, ans);
  $('#resultDisplay').append(displayAnswers(currency, ans));
});

const sterlingDenominations = [200, 100, 50, 20, 10, 5, 2, 1];
const usdDenominations = [100, 50, 25, 10, 5, 1];
const euroDenominations = [200, 100, 50, 20, 10, 5, 2, 1];

function getDenominations(radioValue) {
  console.log(radioValue);
  switch (radioValue) {
    case "GBP":
      return sterlingDenominations;
      break;
    case "USD":
      return usdDenominations;
      break;
    case "EUR":
      return euroDenominations;
      break;
    default:
      return sterlingDenominations;
  }
}

function mainCalculation(i, demonimations) {
  var value = parseInt(i);
  return demonimations.map(function(d) {
    var coinCount = 0;
    if (value >= d) {
      var coinCount = Math.floor(value / d);
      value = value - (coinCount * d);
    }
    return coinCount
  });
}

function displayAnswers(denominations, mappedAnswerArray) {
  $('#resultDisplay').empty();
  var answerList = $();
  var colWidth;
  if (denominations == [100, 50, 25, 10, 5, 1]) {
    colWidth = 'col-sm-2';
  } else {
    colWidth = 'col-sm-3';
  }
  denominations.map(function(e, i) {
    answerList = answerList.add('<div class="coin">' + e + ' <br /> '+ mappedAnswerArray[i] + '</div>');
  });
  $('#resultDisplay').append(answerList);
}

function addition(a, b, c) {
  return a + b + c;
}
