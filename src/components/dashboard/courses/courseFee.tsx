import { ProfileProgrammeFeesEntity } from "@/types/profileProgramme";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CourseFee: React.FC<{ data: ProfileProgrammeFeesEntity[] }> = ({
  data,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <div className="text-hover text-sm p-0 h-auto font-medium flex gap-2 items-center cursor-pointer">
        <span className="truncate">View All</span>{" "}
        <ChevronDown className="h-4 w-4 ml-1 flex-shrink-0" />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-[350px] p-0" align="end">
      <div className="p-4 space-y-4">
        {data?.map((fee) => (
          <div key={fee.id} className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col gap-3">
                <span className="font-bold text-[#354764]">{fee.title}</span>
                <p className="text-sm text-secondary">{fee.description}</p>
              </div>
              <span className="text-[#6B2EEA] font-bold whitespace-nowrap">
                {`₹${fee.amount}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PopoverContent>
  </Popover>
);

export default CourseFee;
