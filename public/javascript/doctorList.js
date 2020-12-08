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
    var req = new XMLHttpRequest();
    req.open(form.getAttribute("method"), form.getAttribute("action"), true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            document.getElementById("container").innerHTML = req.responseText;
        }
    }
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(formData));
    return false;
};

function submitUpdateForm(form) {
    var formData = {
        'name': form.name.value,
        'dob': form.dob.value,
        'gender': form.gender.value,
        'phone': form.phone.value
    };
    var req = new XMLHttpRequest();
    req.open(form.getAttribute("method"), form.getAttribute("action"), true);
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            document.getElementById("container").innerHTML = req.responseText;
        }
    }
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(formData));
    return false;
};