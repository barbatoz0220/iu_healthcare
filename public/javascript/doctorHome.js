function changePage(index) {
  fetch(`/doctor/patients?page=${index}`).then(response => {
    return response.text().then(text => {
      document.getElementById("result").innerHTML = text;
    });
  });
}

function changePageVisit(index) {
  fetch(`/doctor/patients/?page=${index}`).then(response => {
    return response.text().then(text => {
      document.getElementById("visitInfor").innerHTML = text;
    });
  });
}

function viewPatients() {
  $(".doctor-action").toggle();
  $("#back-button").toggle();
  fetch("/doctor/patients").then(response => {
    return response.text().then(text => {
      document.getElementById("result").innerHTML = text;
      $("#result").toggle();
    });
  });
}

function makeRequest() {
  $(".doctor-action").toggle();
  $("#back-button").toggle();
  $("#request-form").toggle();
  $("#ta").val("");
}

function handleRequest(form) {
  var formData = {
    content: document.getElementById("ta").value,
  };
  fetch("/doctor/handle-request", {
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
  $(".doctor-action").toggle();
  $("#back-button").toggle();
  if (result.style.display === "block") {
    $("#result").toggle();
  }
  if (reqform.style.display === "block") {
    $("#request-form").toggle();
  }
}

function viewHistory(id) {
  fetch("doctor/patients/" + id).then(response => {
    return response.text().then(text => {
      document.getElementById(`visitInfor${id}`).innerHTML = text;
      $(`#visitInfor${id}`).toggle();
    });
  });
}

function viewVisitDetail(id) {
  fetch(`doctor/patients/visit-detail/${id}`, {
    method: "GET",
  }).then(response => {
    return response.text().then(text => {
      document.getElementById(`visit-detail${id}`).innerHTML = text;
      $(`#visit-detail${id}`).toggle();
    });
  });
}
