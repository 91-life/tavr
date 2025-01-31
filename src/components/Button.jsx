export default function Button({ label, onClick, color }) {
  return (
    <button
      type="button"
      className={`block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm min-w[100px]`}
      style={{ background: color || "#009999" }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
