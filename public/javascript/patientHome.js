function changePage(index) {
    fetch("/patient/visit?page=" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("result").innerHTML = text;
        });
    });
}

function viewDoctor() {
    $(".patient-action").toggle();
    $("#back-button").toggle();
    fetch("/patient/doctor").then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("result").innerHTML = text;
            $("#result").toggle();
        });
    });
}

function viewVisits() {
    $(".patient-action").toggle();
    $("#back-button").toggle();
    fetch("/patient/visit").then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("result").innerHTML = text;
            $("#result").toggle();
        });
    });
}

function makeRequest() {
    $(".patient-action").toggle();
    $("#back-button").toggle();
    $("#request-form").toggle();
}

function handleRequest(form) {
    var formData = {
        'content': form.content.value,
    };
    fetch("/patient/handle-request", {
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
    $(".patient-action").toggle();
    $("#back-button").toggle();
    if (result.style.display === "block") {
        $("#result").toggle();
    }
    if (reqform.style.display === "block") {
        $("#request-form").toggle();
    }
}