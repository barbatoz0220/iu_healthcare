function changePage(index) {
    fetch("/admin/doctor-list/pagination?page=" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
}

function deleteDoctor(index) {
    fetch("/admin/doctor-list/delete/" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
};

function submitAddForm(form) {
    var formData = {
        'name': form.name.value,
        'dob': form.dob.value,
        'gender': form.gender.value,
        'phone': form.phone.value
    };
    fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.text().then((text) => {
            document.getElementById("container").innerHTML = text;
        });
    });
    return false;
};

function submitUpdateForm(form) {
    var formData = {
        'name': form.name.value,
        'dob': form.dob.value,
        'gender': form.gender.value,
        'phone': form.phone.value
    };
    fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then((response) => {
        return response.text().then((text) => {
            document.getElementById("container").innerHTML = text;
        });
    });
    return false;
};