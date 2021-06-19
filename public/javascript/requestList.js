function changePage(index) {
  fetch(`/admin/request-list/pagination?page=${index}`).then(response => {
    return response.text().then(text => {
      document.getElementById("container").innerHTML = text;
    });
  });
}

function doneRequest(index) {
  fetch(`/admin/request-list/done/${index}`).then(response => {
    return response.text().then(text => {
      document.getElementById("container").innerHTML = text;
    });
  });
}
