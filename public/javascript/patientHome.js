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
    $("#request-form").toggle();
    $("#result").toggle();
    var formData = {
        'content': form.content.value,
    };
    fetch("/patient/handle-request", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(response => {
        document.getElementById("result").innerHTML = "Send successfully";
    })
    return false;
}

function back() {
    $(".patient-action").toggle();
    $("#result").toggle();
    $("#back-button").toggle();
    document.getElementById("result").innerHTML = null;
}