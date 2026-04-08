import PropTypes from "prop-types";

function AlertMessage({ type, message }) {
  const hasMessage = typeof message === "string" && message.trim() !== "";
  if (hasMessage === false) {
    return null;
  }

  const classNameByType = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    error: "border-red-200 bg-red-50 text-red-900",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900"
  };

  return (
    <p className={`rounded-lg border px-3 py-2 text-sm ${classNameByType[type] || classNameByType.info}`}>
      {message}
    </p>
  );
}

AlertMessage.propTypes = {
  type: PropTypes.oneOf(["info", "error", "success"]),
  message: PropTypes.string
};

AlertMessage.defaultProps = {
  type: "info",
  message: ""
};

export default AlertMessage;
