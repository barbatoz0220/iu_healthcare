function ValidateEmail(form) {
    var mailformat = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    var email_address = form.email.value;
    var valid;
    if (email_address.match(mailformat)) {
        alert("Valid email address!");
        form.email.focus();
        valid = true;
    }
    else {
        alert("You have entered an invalid email address!");
        form.email.focus();
        valid = false;
    }
    return valid;
}
