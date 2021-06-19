function changePage(index) {
  fetch(`/admin/patient-list/pagination?page=${index}`).then(response => {
    return response.text().then(text => {
      document.getElementById("container").innerHTML = text;
    });
  });
}

function deletePatient(index) {
  alertify
    .confirm(
      "Do you want to delete the patient?",
      () => {
        fetch(`/admin/patient-list/delete/${index}`).then(response => {
          return response.text().then(text => {
            document.getElementById("container").innerHTML = text;
            alertify.success("Delete successfully!");
          });
        });
      },
      () => {
        alertify.error("Cancel");
      }
    )
    .set({ title: "Be careful" });
}

function submitAddForm() {
  if (
    document.getElementById("iname").value == "" ||
    document.getElementById("idob").value == "" ||
    document.getElementById("igender").value == "" ||
    document.getElementById("iphone").value == ""
  ) {
    alertify
      .alert("Please fill in all the fields!", () => {
        alertify.message("OK");
      })
      .set({ title: "Failed" })
      .set("closable", false);
  } else {
    alertify
      .confirm(
        "Do you want to insert the patient?",
        () => {
          var formData = {
            name: document.getElementById("iname").value,
            dob: document.getElementById("idob").value,
            gender: document.getElementById("igender").value,
            phone: document.getElementById("iphone").value,
          };
          fetch("/admin/patient-list/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }).then(response => {
            return response.text().then(text => {
              document.getElementById("container").innerHTML = text;
              alertify.success("Insert successfully!");
            });
          });
        },
        () => {
          alertify.error("Cancel");
        }
      )
      .set({ title: "Be careful" });
  }
}

function submitUpdateForm(index) {
  alertify
    .confirm(
      "Do you want to update?",
      () => {
        var formData = {
          name: document.getElementById(`uname${index}`).value,
          dob: document.getElementById(`udob${index}`).value,
          gender: document.getElementById(`ugender${index}`).value,
          phone: document.getElementById(`uphone${index}`).value,
        };
        fetch(`/admin/patient-list/update/${index}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).then(response => {
          return response.text().then(text => {
            document.getElementById("container").innerHTML = text;
            alertify.success("Update successfully!");
          });
        });
      },
      () => {
        alertify.error("Cancel");
      }
    )
    .set({ title: "Be careful" });
}

function submitSearchForm() {
  var formData = {
    name: document.getElementById("sname").value,
    dob: document.getElementById("sdob").value,
    gender: document.getElementById("sgender").value,
    phone: document.getElementById("sphone").value,
  };
  fetch("/admin/patient-list/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(response => {
    return response.text().then(text => {
      document.getElementById("container").innerHTML = text;
    });
  });
}

function returnPageList() {
  fetch("/admin/patient-list/pagination?page=1").then(response => {
    return response.text().then(text => {
      document.getElementById("container").innerHTML = text;
    });
  });
}
