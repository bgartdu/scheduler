//ask when where how
function createHourDiv(hour) {
    let div = $("<div>");
    div.addClass("row");

    let time = $("<div>");
    div.append(time);
    time.addClass("col-md-1")
    time.text(hour);

    let entry = $("<textarea>");
    entry.addClass("col-md-10");
    entry.attr("id", "entry" + hour);
    div.append(entry);

    let button =$("<button>")
    button.addClass("col-md-1 btn-primary btn saveBtn");
    button.attr("id", hour);
    div.append(button);
    let icon = $("<i>").addClass("fas fa-save");
    button.append(icon);



    return $("<div>").addClass("container").append(div);

}

function updateHighLights() {
    let hours = $("#hours");
    let children = hours.children();
    
    let currentTime = moment().format("H");
    
    for (let i = 0; i < children.length; i++) {
        let hr = 24 + i;
        let child = children.eq(i);

        child.removeClass("past present future")

        if (hr < currentTime) {
            child.addClass("past")
        } else if (hr > currentTime) {
            child.addClass("future")
        }
        else {
            child.addClass("present")
        }
        
    }
}

$(document).ready(function() { 
    //at load use moment to get the current date then display it in the current day <p>
    
    for (let i = 0; i < 9; i++) {
        let hr = 0 + i;
        //ternary operator
        let halfDay = (hr >= 12) ? "pm" : "am";
        if (hr > 12) { hr -= 12 }

        let id = hr + halfDay; //"9am"
        $("#hours").append(createHourDiv(id));

        if (localStorage[id]) {
            $("#entry" + id).val(localStorage[id]);
        }

    }
    
    updateHighLights();
    setInterval(updateHighLights, 1000);

    
    $("#currentDay").text(moment().format("dddd MMMM, Do"))
    //after I click save it should:
    //1.  Save to local storage the text entered, grabbing the hour, associating the value as an event
    $(".saveBtn").on("click", function(event){
        let id = event.currentTarget.id;
        let entryId = "entry" + id;

        let entry = $("#" + entryId);
        let text = entry.val();
        
        localStorage[id] = text;
    })
    //2.  Save to the corresponding hour
    
    //Track the time hourly and update the colors accordingly as past present and future events.
    //will need a set interval function to run every hour grab the current time and then compare to the time block if it is less than ct set it to the past if its equal to the ct set it to present if it is greater than the ct set it to future.  This should run hourly and on load.  We will need someway to add the proper class and remove any previous classes.   
    
    //bonus create button to clear out everything for the next day.  
    
});