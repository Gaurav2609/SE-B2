$(document).ready(function () {
    /* Do not disturb below lines */
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.navbar-collapse.in').toggleClass('in');
        // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('#navbarCollapseBtn').on('shown.bs.collapse', function () {
        console.log("Toggled!");
        $("#navbarCollapseBtnLink").children('.fa-align-justify').remove();
    
        $("#navbarCollapseBtnLink").append("<span><i class='fas fa-sliders-h'></i>&nbsp;&nbsp;&nbsp;Options</span>");
        $("#navbarCollapseBtnEnv").append("&nbsp;&nbsp; Messages");
        $("#navbarCollapseBtnBell").append("&nbsp;&nbsp; Notifications");
        $("#navbarCollapseBtnUser").append("&nbsp;&nbsp; You");
    
    });
    /* Do not disturb above lines */


    /* Start Adding your javascript here */
    
    // Seven types of continuous fetch I've to do:
    //      1. Fetch all reminders - medicine, doc visit, lab test
    //      2. Fetch all doctor appointments
    //      3. Previous Prescriptions
    //      4. Lab Requests
    //      5. Lab Responses
    //      6. Medicine Requests
    //      7. Medicine Responses

    // On page load do:
    //   - Get all DoctorAppointment, *reminders
    //   - Get all Prescriptions and Lab Tests.
    //   - Load them into calendar.  

    // Get all reminders onetime-AJAX call.
    // setInterval(function worker1() {
    //     // $.get('http://localhost:5000/testAjax', function(data) {
    //     $.get('patientCalendarReminderUpdate', function(data) { //http://localhost:5000/testAjax
    //         console.log(data); //data is returning successfully, make sure calendar entries are done appropriately.
    //     });
    // },10000);

    // Get all DoctorAppointment timedout-AJAX call.
    // setInterval(function worker2() {
    //     // $.get('http://localhost:5000/testAjax', function(data) {
    //     $.get('patientDoctorAppointment', function(data) { //http://localhost:5000/testAjax
    //         console.log(data); //data is returning successfully, make sure calendar entries are done appropriately.
    //     });
    // },10000);
    
    // Get all Prescriptions timedout-AJAX call.
    // setInterval(function worker3() {
    //     // $.get('http://localhost:5000/testAjax', function(data) {
    //     $.get('patientLabRequest', function(data) { //http://localhost:5000/testAjax
    //         console.log(data); //data is returning successfully, make sure calendar entries are done appropriately.
    //     });
    // },10000);
    
    function getTodayDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = yyyy + '/' + mm + '/' + dd;
        return(today);
    }
    // START: jqeury timeline calendar code
    // $('#calendar').fullCalendar({
    //     // put your options and callbacks here
    // });
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,listWeek'
        },
        themeSystem:'bootstrap4',
        bootstrapFontAwesome: true,
        nowIndicator: true,
        // defaultDate: '2018-03-12',
        defaultDate: getTodayDate(),
        height: function(){
            var height = $(window).height();
            var width = $(window).width();
            if(width<2560){
                return 400;    
            }
            else if(width<1440){
                return 400;    
            }
            else if(width<1024){
                return 480;    
            }
            else if(width<768){
                return 480;    
            }
            else if(width<425){
                return 360;                    
            }
            else if(width<375){
                return 360;                    
            }
            else if(width<320){
                return 310;                    
            }
        },
        defaultView: "listWeek",
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2018-10-12',
            },
            {
                title: 'Long Event',
                start: '2018-10-12',
                end: '2018-10-13'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2018-10-13T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2018-10-15T16:00:00'
            },
            {
                title: 'Conference',
                start: '2018-10-15',
                end: '2018-10-17'
            },
            {
                title: 'Meeting',
                start: '2018-10-15T10:30:00',
                end: '2018-10-16T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2018-10-15T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2018-10-17T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2018-10-19T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2018-10-21T20:00:00'
            },
        ]
    });
    // var someEvent1 = {
    //         title: 'Birthday Party',
    //         start: '2018-10-12T23:00:00'
    //     }
    // function temp(){
    //     var someEvent2 = {
    //             title: 'Click for Google',
    //             url: 'http://google.com/',
    //             start: '2018-10-12'
    //         }
    //     return someEvent2;
    // }
    // $("#calendar").fullCalendar("renderEvent",someEvent1,"stick");
    // $("#calendar").fullCalendar("renderEvent",temp(),"stick");

    // END: jqeury timeline calendar code

    // START: Popup defaults
    $.fn.popup.defaults.pagecontainer = '.popupClass';
    $('#basic').popup();
    $('#basic2').popup();
    $('#basic3').popup();

    var topRowBtnHeight = $("#mainButtons").css("height");
    $("#reqLabTestBtn").css("height",topRowBtnHeight);
    $("#bookMedicineBtn").css("height",topRowBtnHeight);
    $("#bookApptBtn").css("height",topRowBtnHeight);

    $("#reqLabTestBtn").on("click",function(event) {
        $(".popupSearchTextBox").val("");
        $(".selectedSearchID").val("");
    });
    $("#bookMedicineBtn").on("click",function(event) {
        $(".popupSearchTextBox").val("");
        $(".selectedSearchID").val("");
    });
    $("#bookApptBtn").on("click",function(event) {
        $(".popupSearchTextBox").val("");
        $(".selectedSearchID").val("");
    });

    // END : Popup defaults

    // START: Buy Medicine functionality
    // $("#bookMedicineBtn").on("click",function(argument){
        // Func 1: Early fetch doctors names as per customer's typing. -- make it such that any search can be invoked.
        // Func 2: Fetch times as per doctor suggested. Refresh this every 5 seconds.
        // Func 3: Poll Reminder tables and add them into calendar every 5 seconds.
        // Func 4: On page load, get all entries from DoctorAppointment table and load to calendar. Then call func3 periodically.
        // Step 1: Upon Doctor-Date-Time selection, make entry into DoctorAppointment table.
        // Step 2: Make an entry into DoctorReminder table. Let Func3 handle updation part.           
    // });
    // END : Buy Medicine functionality

    // START : Following lines are used to control the 
    // Set reminder functionalities in tabs.
    $("#doctorReminderOptions").show();
    $("#medicineReminderOptions").hide();
    $("#labTestReminderOptions").hide();

    $("#doctorReminder").on("click", function(argument) {
        $(".reminderSearchTextBox").attr("placeholder","Search for Doctors");
        $(".reminderSearchTextBox").attr("name","popupDoctorSearch");
        $("#doctorReminderMessage").show();
        $("#medicineReminderOptions").hide();
        $("#labTestReminderOptions").hide();
    });
    $("#medicineReminder").on("click", function(argument) {
        $(".reminderSearchTextBox").attr("placeholder","Search for Pharmacies");
        $(".reminderSearchTextBox").attr("name","popupMedicineSearch");
        $("#doctorReminderMessage").hide();
        $("#medicineReminderOptions").show();
        $("#labTestReminderOptions").hide();
    });
    $("#labTestReminder").on("click", function(argument) {
        $(".reminderSearchTextBox").attr("placeholder","Search for Labs");
        $(".reminderSearchTextBox").attr("name","popupLabSearch");
        $("#doctorReminderMessage").hide();
        $("#labTestReminderOptions").show();
        $("#medicineReminderOptions").hide();
    });
    //END : Set Reminder tab functionalities.

    // START : jquery dropdown timepicker code.
    // $('.timeScroller').each(function(index, el) {
    //     $(this).timepicker({ 
    //         'scrollDefault': 'now',
    //         'forceRoundTime': true,
    //         'timeFormat': 'H:i:s' 
    //     });
    // }); 
    // END : jquery dropdown timepicker code.

    // START : individualPrescription functionality
    var i = 4; //since previous popus took 1,2,3.
    $(".individualRowTwoItem").each(function(){
        var popupDiv = "<div id=basic"+i.toString()+" "+"class='popupWrapperDiv'>\
                            <div class='container-fluid'>\
                                <div class='row justify-content-center'>\
                                    <div class='col-xl-12 col-lg-12 col-md-12 col-12 popupDiv'>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class='container-fluid'>\
                                <div class='row justify-content-center'>\
                                    <div class='col-xl-12 col-lg-12 col-md-12 col-12' style='padding-right: 0px;'>\
                                        <button class='basic"+i+"_close btn btn-danger popupCloseBtn noRadiusBtn' id='basic"+i+"_close'>Close</button>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>";
        $("#popupDivHolder").append(popupDiv);
        $("#basic"+i).popup();
        $(this).addClass("basic"+i+"_open");    
        i++;
    });
    // END : individualPrescription functionality

    // START : Search functionality
    function getResTypeByName(name) {
        if(name.search("Doctor")!=-1)
        {
            return "Doctor";
        }
        else if(name.search("Medicine")!=-1)
        {
            return "Medicine";
        }
        else if(name.search("Lab")!=-1)
        {
            return "Lab";
        }
    }

    $(".popupSearchTextBox").each(function(index, el){
        $(this).on('input', function(event) {
            var inpData = {
                inpText : $(this).val(),
                resType : getResTypeByName($(this).attr('name'))
            };
            console.log("$(this).attr('name'):",$(this).attr('name'));
            
            // Remove all children
            $("#popup"+inpData["resType"]+"SearchResults").empty();
            
            console.log(inpData)
            if(inpData["inpText"].length >= 3) // send request only when 3+ characters are typed
            {
                $.ajax({
                    url: 'commonSearch',
                    type: 'GET',
                    dataType: 'json',
                    data: inpData,
                })
                .done(function(data) {

                    if(!data.hasOwnProperty("data"))//make divs and put data
                    {
                        $.each(data, function(index, val) {
                            /* iterate through data */
                            $("#popup"+inpData["resType"]+"SearchResults").append("\
                                <div class='popupSearchResultsDiv'>\
                                    <div class='popupSearchResultsName'>"
                                        + val[0] +
                                    "</div>\
                                    <div class='popupSearchResultsID' hidden>"
                                        + val[1] +
                                    "</div>\
                                </div>\
                            ");
                            $(".popupSearchResultsDiv").on('click', function(event) {
                                /* Act on the event */
                                console.log("$('.popupSearchResultsName').text():",$(".popupSearchResultsName").text());
                                $(".popupSearchTextBox").val($(".popupSearchResultsName").text());
                                $(".selectedSearchID").val($(".popupSearchResultsID").text());
                                $("#popup"+inpData["resType"]+"SearchResults").empty();
                            }); 
                        });
                    }
                })
                .fail(function(err) {
                    console.log("error");
                    console.log(err);
                })
                .always(function() {
                    console.log("complete");
                });
                
            }
        });
    });
 

    // END : Search functionality

    // START : Popup Book button fucntionality -> Booking doctor appointment, buy medicines etc.
    function getInputTypeDateByID(ID){
        var date = new Date($("#"+ID).val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        return([year, month, day].join('-'));
    }

    function diffBetweenArrs (a1, a2) {

        var a = [], diff = [];
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
    }

    var allTimeSlots = ["00:00:00", "00:30:00", "01:00:00", "01:30:00", 
                        "02:00:00", "02:30:00", "03:00:00", "03:30:00", 
                        "04:00:00", "04:30:00", "05:00:00", "05:30:00", 
                        "06:00:00", "06:30:00", "07:00:00", "07:30:00", 
                        "08:00:00", "08:30:00", "09:00:00", "09:30:00", 
                        "10:00:00", "10:30:00", "11:00:00", "11:30:00", 
                        "12:00:00", "12:30:00", "13:00:00", "13:30:00", 
                        "14:00:00", "14:30:00", "15:00:00", "15:30:00", 
                        "16:00:00", "16:30:00", "17:00:00", "17:30:00", 
                        "18:00:00", "18:30:00", "19:00:00", "19:30:00", 
                        "20:00:00", "20:30:00", "21:00:00", "21:30:00", 
                        "22:00:00", "22:30:00", "23:00:00", "23:30:00"];

    function setAvailableTimeSlots(doctorID, inpDate)
    {
        var inpData = {
            doctorID : doctorID,
            inpDate : inpDate
        };
        $.ajax({
            url: 'getAvailableTimeSlots',
            type: 'GET',
            dataType: 'json',
            data: inpData,
        })
        .done(function(data) {
            var dataToArr = [];
            $.each(data, function(index, val) {
                dataToArr.push(val);
            });
            var res = diffBetweenArrs(allTimeSlots,dataToArr);
            console.log("res:",res);
        
            $.each(res, function(index, val) {
                $(".timeScroller").append("<option>"+val+"</option>");
            });
        })
        .fail(function(err) {
            console.log("error");
            console.log(err);
        })
        .always(function() {
            console.log("complete");
        });
    }


    // For doctor appt booking:
    $("#popupDoctorDate").on('blur', function(event) {
        //might need to clear old doctorID and inpDate

        var doctorID = $("#selectedDoctorID").val();
        var inpDate = getInputTypeDateByID("popupDoctorDate");
        setAvailableTimeSlots(doctorID,inpDate);
    });

    $("#doctorApptBookBtn").on('click',function(event) {
        event.preventDefault();
        /* Act on the event */
        var doctorID = $("#selectedDoctorID").val();
        var inpDate = getInputTypeDateByID("popupDoctorDate");
        
        var payload = {
            doctorID : doctorID,
            apptDate : inpDate,
            apptTime : $("#popupDoctorTime").find(":selected").text() // must be 24 hrs, like 18:30
        }
        var jsonPayload = JSON.stringify(payload);
        console.log(jsonPayload)

        $.ajax({
            url: 'patientDoctorAppointment',
            type: 'POST',
            dataType: 'json',
            data: jsonPayload,
            contentType:"application/json; charset=UTF-8"
        })
        .done(function(data) {
            console.log("success");
            console.log(data);
            $("#doctorBookMessage").append("\
                <div class='alert alert-success alert-dismissible fade show' role='alert'>\
                    <strong>Appointment booked successfully!</strong><br> Your calendar will be updated soon.\
                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                        <span aria-hidden='true'>&times;</span>\
                    </button>\
                </div>\
            ");
        })
        .fail(function(err) {
            console.log("error");
            console.log(err);
            $("#doctorBookMessage").append("\
                <div class='alert alert-danger alert-dismissible fade show' role='alert'>\
                    <strong>Server Error:</strong>"+err+".\
                    <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\
                        <span aria-hidden='true'>&times;</span>\
                    </button>\
                </div>\
            ");
        })
        .always(function() {
            console.log("complete");
        });
        
    });

    $("#labBookBtn").on('click',function(event) {
        event.preventDefault();
        /* Act on the event */

        var payload = {
            labID : $("#selectedLabID").val(),
            apptDate : getInputTypeDateByID("popupLabDate"),
        }
        var jsonPayload = JSON.stringify(payload);
        console.log(jsonPayload)

        $.ajax({
            url: 'patientLabRequest',
            type: 'POST',
            dataType: 'json',
            data: jsonPayload,
            contentType:"application/json; charset=UTF-8"
        })
        .done(function(data) {
            console.log("success");
            console.log(data);
        })
        .fail(function(err) {
            console.log("error");
            console.log(err);
        })
        .always(function() {
            console.log("complete");
        });
        
    });
    
    $("#medicineBookBtn").on('click',function(event) {
        event.preventDefault();
        /* Act on the event */
    });
    
        
    // END : Popup Book button fucntionality -> Booking doctor appointment, buy medicines etc.

    /* End Adding your javascript here */
});