import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  totalPages,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  patients,
  setDisplayedPatients,
}) {

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setDisplayedPatients(
        patients.length <= itemsPerPage * page
          ? patients.slice((page - 1) * itemsPerPage, patients.length)
          : patients.slice((page - 1) * itemsPerPage, page * itemsPerPage)
      );
    }
  };

  const generatePagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 2 || currentPage >= totalPages - 1) {
        pages.push(2);
        pages.push(3);
        pages.push("...");
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
      } else if (currentPage === 3) {
        pages.push(2);
        pages.push(3);
        pages.push(4);
        pages.push("...");
        pages.push(totalPages - 1);
      } else if (currentPage === 4) {
        pages.push(2);
        pages.push(3);
        pages.push(4);
        pages.push(5);
        pages.push("...");
      } else if (currentPage === totalPages - 2) {
        pages.push(2);
        pages.push("...");
        pages.push(totalPages - 3);
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
      } else {
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium text-[#475467] hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
        >
          <ArrowLeftIcon className="mr-3 size-5 text-[#475467]" />
          Previous
        </button>
      </div>

      <div className="hidden md:-mt-px md:flex md:gap-1">
        {generatePagination().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium ${
              currentPage === page
                ? "bg-[#F9FAFB] text-[#182230]"
                : page !== "..."
                ? "bg-white text-[#475467] hover:bg-[#F9FAFB] hover:text-[#182230]"
                : "bg-white text-[#475467]"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium text-[#475467] hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
        >
          Next
          <ArrowRightIcon className="ml-3 size-5 text-[#475467]" />
        </button>
      </div>
    </nav>
  );
}
