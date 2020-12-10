function changePage(index) {
    fetch("/admin/request-list/pagination?page=" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
}

function doneRequest(index) {
    fetch("/admin/request-list/done/" + index).then(function (response) {
        return response.text().then(function (text) {
            document.getElementById("container").innerHTML = text;
        });
    });
}