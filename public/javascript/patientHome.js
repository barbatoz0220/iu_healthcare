function changePage(index) {
  fetch(`/patient/visit?page=${index}`).then(response => {
    return response.text().then(text => {
      document.getElementById("result").innerHTML = text;
    });
  });
}

function viewDoctor() {
  $(".patient-action").toggle();
  $("#back-button").toggle();
  fetch("/patient/doctor").then(response => {
    return response.text().then(text => {
      document.getElementById("result").innerHTML = text;
      $("#result").toggle();
    });
  });
}

function viewVisits() {
  $(".patient-action").toggle();
  $("#back-button").toggle();
  fetch("/patient/visit").then(response => {
    return response.text().then(text => {
      document.getElementById("result").innerHTML = text;
      $("#result").toggle();
    });
  });
}

function makeRequest() {
  $(".patient-action").toggle();
  $("#back-button").toggle();
  $("#request-form").toggle();
  $("#ta").val("");
}

function handleRequest() {
  var formData = {
    content: document.getElementById("ta").value,
  };
  fetch("/patient/handle-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(response => {
    document.getElementById("result").innerHTML = "Sent successfully";
    $("#request-form").toggle();
    $("#result").toggle();
  });
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

function viewVisitDetail(id) {
  fetch(`patient/visit-detail/${id}`, {
    method: "GET",
  }).then(response => {
    return response.text().then(text => {
      document.getElementById(`visit-detail${id}`).innerHTML = text;
      $(`#visit-detail${id}`).toggle();
    });
  });
}

function viewSearch() {
  $(".patient-action").toggle();
  $("#back-button").toggle();
  fetch("/patient/search").then(response => {
    return response.text().then(text => {
      document.getElementById("result").innerHTML = text;
      $("#result").toggle();
    });
  });
}

function search() {
  var formData = {
    content: document.getElementById("symptoms").value,
  };
  fetch("/patient/search-symptom", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(response => {
    return response.text().then(text => {
    document.getElementById("result").innerHTML = text;
    })
  });
  return false;
}
