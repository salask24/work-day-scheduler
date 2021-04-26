//date and time from moment.js at the top
const dateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a');
//jQuery getting id from html and adding dateand time on to front end
$('#currentDay').text(dateAndTime)


// 9a-5p
var tasks = {
    "9": [],"10": [], "11": [],"12": [],"13": [],"14": [],"15": [],"16": [],"17": []
};

var setTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var getTasks = function() {
    /* load the tasks from localStorage and create tasks in the right row */

    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks = loadedTasks

        // for each key/value pair in tasks, create a task
        $.each(tasks, function(hour, task) {
            var hourDiv = $("#" + hour);
            createTask(task, hourDiv);
        })
    }

    // make sure the past/current/future time is reflected
    auditTasks()
    //function will be below -  had to call it here for it to work later
}

var createTask = function(taskText, hourDiv) {
    /* create a task in the row that corresponds to the specified hour */

    var taskDiv = hourDiv.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskText)
    taskDiv.html(taskP);
}

var auditTasks = function() {
    /* update the background of each row based on the time of day */

    var currentHour = moment().hour();
    $(".time-block").each( function() {
        var elementHour = parseInt($(this).attr("id"));

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
    /* replaces the provided textarea element with a p element and persists the data in localStorage */

    // get the necessary elements
    var taskInfo = textareaElement.closest(".time-block");
    var textArea = taskInfo.find("textarea");

    // get the time and task
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

    // persist the data
    tasks[time] = [text];  // setting to a one item list since there's only one task for now
    setTasks();

    // replace the textarea element with a p element
    createTask(text, taskInfo);
}

/* THEM CLICK HANDLERS */

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

// save button click handler
$(".saveBtn").click(function() {
    replaceTextarea($(this));
})

// get the tasks from localStorage on load.
getTasks();


// function currentHour() {
//     var displayHour = moment().hour(); // Number
//     console.log(displayHour)

//     //displaying currrnt hour with id
//     $("textarea").each(function () {
//         var elementHour = $(this).attr("id")
//         console.log(elementHour)
//     })
//     //past, present, or future - light gray for for past, red for present and green for future
//     if (dateAndTime < currentHour) {
//         $(this).removeClass(["present", "future"]).addClass("past");
//     }
//     else if (elementHour === currentHour) {
//         $(this).removeClass(["past", "future"]).addClass("present");
//     }
//     else {
//         $(this).removeClass(["past", "present"]).addClass("future")
//     }

// };


// //savebtn
// var saveTasks = function() {
//     localStorage.setItem(""), JSON.stringify(tasks);
// }




// currentHour();


