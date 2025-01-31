export default function Button({ label, onClick, color }) {
  return (
    <button
      type="button"
      className={`block rounded-md p-2 text-center text-sm font-semibold text-white shadow-sm min-w[80px]`}
      style={{ background: color || "#009999" }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}