"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { coursesData } from "./courseMock";
import Image from "next/image";
import { ProfileProgramme } from "@/types/profileProgramme";

export default function CourseTable({
  deleteCourse,
  data,
}: {
  deleteCourse: (id: string) => void;
  data: ProfileProgramme[];
}) {
  // State for sorting
  const [sortField, setSortField] = useState<keyof Course>("courseName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Function to handle sorting
  const handleSort = (field: keyof Course) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Function to sort data
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue === null) return sortDirection === "asc" ? 1 : -1;
    if (bValue === null) return sortDirection === "asc" ? -1 : 1;

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Function to render sort indicator
  const renderSortIndicator = (field: keyof Course) => {
    if (sortField !== field)
      return <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />;
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Function to format currency
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "";
    return `₹${amount.toLocaleString()}`;
  };

  // Update the getCategoryColor function to handle more categories
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Engineering":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Science":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "Management":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Commerce":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Architecture":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Humanities":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100";
      case "Education":
        return "bg-teal-100 text-teal-800 hover:bg-teal-100";
      case "Design":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="w-full overflow-auto">
      <div className="min-w-[1000px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <button
                  className="flex items-center w-full font-bold text-xs sm:text-sm text-labels"
                  onClick={() => handleSort("courseName")}
                >
                  <span className="uppercase">COURSE NAME</span>
                  {renderSortIndicator("courseName")}
                </button>
              </TableHead>
              <TableHead className="w-[200px]">
                <button
                  className="flex items-center w-full font-bold text-xs sm:text-sm text-label"
                  onClick={() => handleSort("programmeType")}
                >
                  <span className="truncate">PROGRAMME TYPE</span>
                  {renderSortIndicator("programmeType")}
                </button>
              </TableHead>
              <TableHead className="w-[120px]">
                <button
                  className="flex items-center w-full font-bold text-xs sm:text-sm text-label"
                  onClick={() => handleSort("category")}
                >
                  <span className="truncate">CATEGORY</span>
                  {renderSortIndicator("category")}
                </button>
              </TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center w-full font-bold text-xs sm:text-sm text-label">
                  <span className="truncate">DURATION</span>
                </div>
              </TableHead>
              <TableHead className="w-[100px]">
                <div className="flex items-center w-full font-bold text-xs sm:text-sm text-label">
                  <span className="truncate">SEATS</span>
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center w-full font-bold text-xs sm:text-sm text-label">
                  <span className="truncate">MODE OF STUDY</span>
                </div>
              </TableHead>
              <TableHead className="w-[120px]">
                <div className="flex items-center w-full font-bold text-xs sm:text-sm text-label">
                  <span className="truncate">ANNUAL FEE (₹)</span>
                </div>
              </TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((course) => (
              <TableRow key={course.id} className="hover:bg-light">
                <TableCell className="font-normal py-4 text-base text-[#42526D]">
                  <div className="truncate max-w-[250px]">
                    {course.course.title}
                  </div>
                </TableCell>
                <TableCell className="font-normal py-4 text-base text-[#42526D]">
                  <div className="truncate max-w-[200px]">
                    {course.level.title}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="truncate max-w-[120px]">
                    <div
                      className={`rounded-[4px] py-0.5 px-2.5 text-sm font-medium w-fit max-w-full ${getCategoryColor(
                        course.specialization.title
                      )}`}
                    >
                      {course.specialization.title}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-normal py-4 text-base text-[#42526D]">
                  <div className="truncate max-w-[100px]">
                    {`${course.duration} ${course.durationType.title}`}
                  </div>
                </TableCell>
                <TableCell className="font-normal py-4 text-base text-[#42526D]">
                  <div className="truncate max-w-[100px]">
                    {course.capacity} Seats
                  </div>
                </TableCell>
                <TableCell className="font-normal py-4 text-base text-[#42526D]">
                  <div className="truncate max-w-[120px]">
                    {course.programmeStudyMode.title}
                  </div>
                </TableCell>
                <TableCell>
                  {course.annualFee ? (
                    <div className="truncate max-w-[120px] font-medium text-[#42526D] text-base py-4">
                      {formatCurrency(course.annualFee)}
                    </div>
                  ) : (
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="text-hover text-sm p-0 h-auto font-medium flex gap-2 items-center cursor-pointer">
                          <span className="truncate">View All</span>{" "}
                          <ChevronDown className="h-4 w-4 ml-1 flex-shrink-0" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0" align="end">
                        <div className="p-4 space-y-4">
                          {course.fees?.map((fee, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between items-start gap-2">
                                <div className="flex flex-col gap-3">
                                  <span className="font-bold text-[#354764]">
                                    {fee.name}
                                  </span>
                                  <p className="text-sm text-secondary">
                                    {fee.description}
                                  </p>
                                </div>
                                <span className="text-[#6B2EEA] font-bold whitespace-nowrap">
                                  {formatCurrency(fee.amount)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Image
                        src="/images/menu.svg"
                        alt="menu"
                        width={28}
                        height={28}
                        className="cursor-pointer"
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-[160px] p-0" align="end">
                      <div className="px-4 py-3">
                        <div className="w-full rounded-lg flex items-center h-9 gap-3 text-[#354764] p-3 cursor-pointer hover:bg-light">
                          <Image
                            src="/images/edit-gray.svg"
                            alt="edit"
                            width={20}
                            height={20}
                          />
                          <span>Edit</span>
                        </div>
                        <div
                          className="w-full rounded-lg flex items-center gap-3 h-9 text-[#E9755D] p-3 cursor-pointer hover:bg-light"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Image
                            src="/images/delete.svg"
                            alt="delete"
                            width={20}
                            height={20}
                          />
                          <span>Delete</span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center cursor-pointer gap-4 px-4 py-2.5 rounded-lg border border-[#D0D5DD] text-[#42526D] font-medium text-sm hover:bg-light hover:border-[#B3B9C4]">
                {`${itemsPerPage} Per Page`}
                <ChevronDown className="h-4 w-4 flex-shrink-0" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[140px] p-0" align="center">
              <div className="p-2 flex flex-col gap-1">
                {[5, 10, 20, 50].map((item) => (
                  <div
                    key={item}
                    className={`w-full rounded flex items-center h-8 gap-3 text-[#354764] p-3 cursor-pointer ${
                      itemsPerPage === item
                        ? "bg-light-200"
                        : "hover:bg-light-100"
                    }`}
                    onClick={() => {
                      setItemsPerPage(item);
                      setCurrentPage(1);
                    }}
                  >
                    <span>{item} Per Page</span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="mr-5 flex items-center gap-2 py-2 px-3.5 rounded-lg border border-[#D0D5DD] cursor-pointer hover:bg-light hover:border-[#B3B9C4]"
          >
            <Image
              src="/images/arrow.svg"
              alt="previous"
              width={20}
              height={20}
            />
            <span className="font-medium text-[#42526D] text-sm">Previous</span>
          </button>
          <div className="flex items-center gap-0.5">
            {pageNumbers.length <= 7 ? (
              // Show all page numbers if there are 7 or fewer
              pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`h-8 w-8 p-3 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                    currentPage === number
                      ? "bg-[#F9F5FF] text-[#7F56D9]"
                      : "text-[#667085] hover:bg-[#F9F5FF] hover:text-[#7F56D9]"
                  }`}
                >
                  {number}
                </button>
              ))
            ) : (
              // Show limited page numbers with ellipsis for many pages
              <>
                {/* First page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`h-8 w-8 p-3 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                    currentPage === 1
                      ? "bg-[#F9F5FF] text-[#7F56D9]"
                      : "text-[#667085] hover:bg-[#F9F5FF] hover:text-[#7F56D9]"
                  }`}
                >
                  1
                </button>

                {/* Ellipsis or second page */}
                {currentPage > 3 && <span className="mx-1">...</span>}

                {/* Pages around current page */}
                {pageNumbers
                  .filter(
                    (number) =>
                      number !== 1 &&
                      number !== totalPages &&
                      (Math.abs(number - currentPage) < 2 ||
                        (currentPage <= 3 && number <= 4) ||
                        (currentPage >= totalPages - 2 &&
                          number >= totalPages - 3))
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`h-8 w-8 p-3 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                        currentPage === number
                          ? "bg-[#F9F5FF] text-[#7F56D9]"
                          : "text-[#667085] hover:bg-[#F9F5FF] hover:text-[#7F56D9]"
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                {/* Ellipsis or second-to-last page */}
                {currentPage < totalPages - 2 && (
                  <span className="mx-1">...</span>
                )}

                {/* Last page */}
                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`h-8 w-8 p-3 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                      currentPage === totalPages
                        ? "bg-[#F9F5FF] text-[#7F56D9]"
                        : "text-[#667085] hover:bg-[#F9F5FF] hover:text-[#7F56D9]"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
              </>
            )}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="ml-5 flex items-center gap-2 py-2 px-3.5 rounded-lg border border-[#D0D5DD] cursor-pointer hover:bg-light hover:border-[#B3B9C4]"
          >
            <span className="font-medium text-[#42526D] text-sm">Next</span>
            <Image
              src="/images/arrow.svg"
              alt="next"
              width={20}
              height={20}
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
