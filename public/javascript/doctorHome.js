function changePage(index) {
    fetch("/doctor/patients?page=" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("result").innerHTML = text;
        });
    });
}

function viewPatients() {
    $(".doctor-action").toggle();
    $("#back-button").toggle();
    fetch("/doctor/patients").then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("result").innerHTML = text;
            $("#result").toggle();
        });
    });
}

function makeRequest() {
    $(".doctor-action").toggle();
    $("#back-button").toggle();
    $("#request-form").toggle();
}

function handleRequest(form) {
    var formData = {
        'content': document.getElementById('ta').value,
    };
    fetch("/doctor/handle-request", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(response => {
        document.getElementById("result").innerHTML = "Send successfully";
        $("#request-form").toggle();
        $("#result").toggle();
    })
    return false;
}

function back() {
    var reqform = document.getElementById("request-form");
    var result = document.getElementById("result");
    result.innerHTML = null;
    $(".doctor-action").toggle();
    $("#back-button").toggle();
    if (result.style.display === "block") {
        $("#result").toggle();
    }
    if (reqform.style.display === "block") {
        $("#request-form").toggle();
    }
}