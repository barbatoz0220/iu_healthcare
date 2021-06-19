function changePage(index) {
  fetch(`/admin/request-list/pagination?page=${index}`).then(response => {
    console.log(response);
    return response.text().then(text => {
      document.getElementById("container").innerHTML = text;
    });
  });
}

function doneRequest(index) {
  alertify.confirm(
    "Confirm update request status?",
    () => {
      fetch(`/admin/request-list/done/${index}`).then(response => {
        return response.text().then(text => {
          document.getElementById("container").innerHTML = text;
        });
      });
    },
    () => {
      alertify.error("Cancel");
    })
    .set({ title: "Be careful" });
}
