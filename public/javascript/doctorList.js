function changePage(index) {
    fetch("/admin/doctor-list/pagination?page=" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
}

function deleteDoctor(index) {
    alertify.confirm('Do you want to delete the patient?', function () {
        fetch("/admin/doctor-list/delete/" + index).then(function (response) {
            return response.text().then(function (text) {
                document.getElementById("container").innerHTML = text;
                alertify.success("Delete successfully!");
            });
        })
    },
        function () {
            alertify.error('Canceled');
        }
    ).set({ title: "Be careful" }).set('closable', false);
};

function submitAddForm() {
    alertify.confirm('Do you want to insert the patient?', function () {
        var formData = {
            'name': document.getElementById("iname").value,
            'dob': document.getElementById("idob").value,
            'gender': document.getElementById("igender").value,
            'phone': document.getElementById("iphone").value,
        }
        fetch("/admin/doctor-list/insert", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.text().then((text) => {
                document.getElementById("container").innerHTML = text;
                alertify.success("Insert successfully!");
            });
        })
    },
        function () {
            alertify.error('Canceled');
        }
    ).set({ title: "Be careful" })
};
function submitUpdateForm(index) {
    alertify.confirm('Do you want to update?', function () {
        var formData = {
            'name': document.getElementById("uname" + index).value,
            'dob': document.getElementById("udob" + index).value,
            'gender': document.getElementById("ugender" + index).value,
            'phone': document.getElementById("uphone" + index).value,
        };
        fetch("/admin/doctor-list/update/" + index, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then((response) => {
            return response.text().then((text) => {
                document.getElementById("container").innerHTML = text;
                alertify.success("Update successfully!");
            });
        })
    },
        function () {
            alertify.error('Canceled');
        }
    ).set({ title: "Be careful" })
};


function submitSearchForm() {
    var formData = {
        'name': document.getElementById("sname").value,
        'dob': document.getElementById("sdob").value,
        'gender': document.getElementById("sgender").value,
        'phone': document.getElementById("sphone").value,
    };
    fetch("/admin/doctor-list/search", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.text().then((text) => {
            document.getElementById("container").innerHTML = text;
        });
    });
};