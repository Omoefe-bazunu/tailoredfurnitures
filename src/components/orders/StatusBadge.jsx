import React from "react";

export default function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };

  return (
    <span
      className={`px-2.5 py-1 text-[9px] font-body font-medium uppercase tracking-widest border ${styles[status] || styles.pending}`}
    >
      {status}
    </span>
  );
}
