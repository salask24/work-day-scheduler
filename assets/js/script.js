//date and time from moment.js at the top
const dateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a');
//jQuery getting id from html and adding dateand time on to front end
$('#currentDay').text(dateAndTime)


// 9a-5p
var tasks = {
    "9": [],"10": [], "11": [],"12": [],"13": [],"14": [],"15": [],"16": [],"17": []
};

//setting item
var setTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


//getting item
var getTasks = function() {

    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks = loadedTasks

        // for each key/value pair in tasks, create a task
        $.each(tasks, function(hour, task) {
            var textArea = $("#" + hour);
            textArea.val(task[0]);
        })
    }

    // make sure the past/current/future time is reflected
    auditTasks()
    //function will be below -  had to call it here for it to work later
}


//boom herer it is
var auditTasks = function() {
    //past, present, and future

    var currentHour = moment().hour();
    $(".time-block").each( function() {
        var elementHour = parseInt($(this).find("textarea").attr("id"));

        // handle past, present, and future
        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
};

var replaceTextarea = function(textareaElement) {
    // use closest to get whatever is in textarea
    var taskInfo = textareaElement.closest(".time-block");
    var textArea = taskInfo.find("textarea");

    // get the time and task
    var time = textArea.attr("id");
    var text = textArea.val().trim();

    console.log(time);

    // persist the data
    tasks[time]= [text];  // setting to a one item list since there's only one task for now
    console.log(tasks);
    setTasks();
}

/* THEM CLICK HANDLERSSSS */

// tasks
$(".task").click(function() {

    // save the other tasks if they've already been clicked
    $("textarea").each(function() {
        replaceTextarea($(this));
    })

    // convert to a textarea element if the time hasn't passed
    var time = $(this).closest(".time-block").attr("id");
    if (parseInt(time) >= moment().hour()) {

        // create a textInput element that includes the current task
        var text = $(this).text();
        var textInput = $("<textarea>")
            .addClass("form-control")
            .val(text);

        // add the textInput element to the parent div
        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

$(".saveBtn").click(function() {
    replaceTextarea($(this));
})

//RUN IT ALL
getTasks();