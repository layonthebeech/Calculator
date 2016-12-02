$(document).ready(function() {
  var math = {
    '+': function(x, y) {
      return x + y
    },
    '-': function(x, y) {
      return x - y
    },
    '÷': function(x, y) {
      return x / y
    },
    '*': function(x, y) {
      return x * y
    },
  }
  var arr = [];
  var num = '';
  var outputStr = '';
  var total = 0;
  var operator = '';
  $('button').click(function() {
    //set value variable
    var value = $(this).attr("value");
    //if the output string has an equals and the button pressed isn't =
    if (outputStr.match(/\=/) && value !== '=') {
      //set outputString to empty String
      outputStr = '';
    }
    //if the button pressed is a number 
    if (value <= 9) {
      //if the button pressed plus the saved number is a number greater than 9 characters long
      if ((num + value).length > 9) {
        //max character alert
        alert('Max Character Alert');
      } else {
        //parse the number 
        var parsedValue = parseFloat(value);
        //add that to the saved number
        num += parsedValue;
        //add the string of the number to the output string
        outputStr += value;
        //set the output to the number
        $('#outputOne').text(num);
      }
      //if the button pressed is a decimal
    } else if (value === '.') {
      //add the decimal to the number though it shouldn't be allowed in certain cases TODO
      num += value;
      //add the decimal to the outputString
      outputStr += value;
      //set the output to the number
      $('#outputOne').text(num);
    } else {
      //if the parsednumber is greater than 0
      if (parseFloat(num) > 0) {
        //add that number to our array
        arr.push(parseFloat(num));
      }
      //if the value of the button pressed is clearAll
      if (value === "clearAll") {
        //set output to 0
        $('#outputOne').text(0);
        //clear outputstr
        outputStr = '';
        //set arr to empty
        arr = [];
        //set num counter to 0
        num = 0;
        //if the button pressed is clearEntry
      } else if (value === "clearEntry") {
        //if the array length is greater than 0
        if (arr.length > 0) { 
          //set output to 0
          $('#outputOne').text(0);
          //remove value from array set it to variable
          var remove = arr.pop();
          //set num to 0
          num = 0;
          //find the value in the string and remove it
          var slicedOutput = outputStr.slice(0,outputStr.length-remove.length)
          //set output two to the new string
          $('#outputTwo').text(slicedOutput);
        }
      } else if (value === "=") {
        if ((parseFloat(num) > 0 || arr.length > 1) && arr[arr.length - 1]) {
          total = arr[0];
          for (var i = 2; i < arr.length; i += 2) {
            total = math[arr[i - 1]](total, arr[i]);
          }
          outputStr += '=' + Math.ceil(total * 100) / 100;
          num = '';
          arr = [];
          $('#outputOne').text(Math.ceil(total * 100) / 100);
        }
      } else {
        if ((parseFloat(num) !== 0 || arr.length > 1)&& parseFloat(arr[arr.length-1]) <= 9) {
          arr.push(value);
          outputStr += value;
          $('#outputOne').text(value);
          num = '';
        }
      }
    }
    if(value !=='clearEntry') {$('#outputTwo').text(outputStr);}
  });
});