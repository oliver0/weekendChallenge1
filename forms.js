$(document).ready(function() {
    var array = [];
    var titlesAppended = false;
    var totalMonthlyExpenditure = 0;
    $('#deleteButton').hide();

    $('#employeeinfo').on('submit', function(event) {
      event.preventDefault();

      // variable to determine if titles have been appended yet
      var deleteButtonVisible = false;
      // initialize a new variable as an empty object
      var values = {};

      // convert the form inputs into an array
      var fields = $('#employeeinfo').serializeArray();

      // iterate over the array and transfer each index into a new property on an object with the value of what was entered.
      fields.forEach(function(element, index, array) {
        // review index notation vs. dot notation on objects
        // here, dot notation wouldn't work
        values[element.name] = element.value;
      });

      // add the current values object to the global array
      array.push(values)

      // clear out inputs
      $('#employeeinfo').find('input[type=text]').val('');
      $('#employeeinfo').find('input[type=number]').val('');
      // append title to DOM if they aren't there already
      if(titlesAppended == false){
        appendTitles();
      }
      // append employee info to DOM
      appendDom(values);
      // add annual salary data to person
      $('#container .person').last().data('annualSalary', 1*values.employeeAnnualSalary);

      // append text that includes the total monly salary Expenditure and the text related to it
      appendTotalMonthlySalary();
      // show the delete button when at least 1 person has been submitted
      deleteButtonVisibility();

    });

    $('#container').on('click', '.person', function(){
      $(this).toggleClass('clicked');
    });


    $('#deleteButton').on('click', function(){
      $('.clicked').each(function(index, value){
        totalMonthlyExpenditure -= $(this).data("annualSalary");
      });

      //append total monthly salary expenditure
      var text = "Monthly Salary Expenditure: " + Math.round((totalMonthlyExpenditure/12)*100)/100;
      $('#monthlySalary').text(text);
      // remove all people that are currently clicked from the page
      $('.clicked').remove();
      //hide delete button if everyone has been removed
      deleteButtonVisibility();

    });

    function deleteButtonVisibility(){
      if($('#container .person').length > 0){
          $('#deleteButton').show();
        } else {
        $('#deleteButton').hide();
        // also hide the month salary expenditure text
        $('#monthlySalary').text("");
      }
    }

    function calcTotalMonthlySalary(){
      /*  originally used this code to calculate the monthly salary using the array of objects
          before changing to using the data attribute
      var total = 0;
      for (var i=0; i < array.length; i++){
        total += parseInt(array[i].employeeAnnualSalary);
      }
      totalMonthlyExpenditure = total;
      */
      var total = 0;
      $('#container .person').each(function(index, value){
        total += ($(this).data("annualSalary"));
      });
      totalMonthlyExpenditure = total;
    }

    function appendTotalMonthlySalary(){
      calcTotalMonthlySalary();
      var text = "Monthly Salary Expenditure: " + Math.round((totalMonthlyExpenditure/12)*100)/100;
      $('#monthlySalary').text(text);
    }

    function appendTitles(){
      $('#container').append('<h3>First Name</h3>'+
                            '<h3>Last Name</h3>'+
                            '<h3>ID</h3>'+
                            '<h3>Title</h3>'+
                            '<h3>Annual Salary</h3>');
      titlesAppended = true;
    }

    function appendDom(empInfo) {
      $('#container').append('<div class="person"></div>');
      var $el = $('#container').children().last();

      $el.append('<p>' + empInfo.employeefirstname + '</p>'+
                 '<p>' + empInfo.employeelastname  + '</p>'+
                 '<p>' + empInfo.employeeId        + '</p>'+
                 '<p>'+empInfo.employeeJobTitle    + '</p>'+
                 '<p>'+empInfo.employeeAnnualSalary +'</p>');
               }
});
