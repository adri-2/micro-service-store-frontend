import React from "react";

const statusConfig = {
  Pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800",
  },
  Confirmed: {
    label: "Confirmé",
    className: "bg-green-100 text-green-800",
  },
  Cancelled: {
    label: "Annulé",
    className: "bg-red-100 text-red-800",
  },
  Draft: {
    label: "Brouillon",
    className: "bg-gray-100 text-gray-700",
  },
};

function OrderStatus({ status }) {
  const config = statusConfig[status] || statusConfig["draft"];

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default OrderStatus;
