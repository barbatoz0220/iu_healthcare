function ValidateEmail(form) {
  var mailformat =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  var email_address = form.email.value;
  var valid = false;
  if (email_address.match(mailformat)) {
    form.email.focus();
    valid = true;
    alertify.success("Sent successfully!");
  } else {
    alertify.error("You have entered an invalid email address!");
    form.email.focus();
    valid = false;
  }
  return valid;
}
