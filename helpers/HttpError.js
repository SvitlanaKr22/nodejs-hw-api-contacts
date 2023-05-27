const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  409: "Email in use",
};

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
