import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showControls = true,
    className = ''
}) => {
    if (totalPages <= 1) return null;

    // Helper to generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5; // Number of pages to show in the middle range

        if (totalPages <= maxVisible + 4) {
            // If total pages are small enough, show all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first, last, and current range
            pages.push(1);

            if (currentPage > 3) {
                pages.push('...');
            }

            // Calculate range around current page
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if close to start
            if (currentPage <= 3) {
                end = 4;
            }

            // Adjust if close to end
            if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }

            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            {showControls && (
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-slate-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
                    aria-label="Previous Page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
            )}

            <div className="flex items-center gap-2">
                {getPageNumbers().map((page, idx) => (
                    <React.Fragment key={idx}>
                        {page === '...' ? (
                            <span className="w-10 h-10 flex items-center justify-center text-slate-400 font-medium select-none">
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`
                  w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-sm transition-all duration-300 active:scale-95
                  ${currentPage === page
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-600/20'
                                        : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                                    }
                `}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {showControls && (
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-slate-50 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
                    aria-label="Next Page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default Pagination;
