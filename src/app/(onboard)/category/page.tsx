"use client";
import { redirect } from "next/navigation";

import { Button, Typography } from "@/storybooks/components/atoms";
import { selectCategory } from "../../../api/user";
import { getFoundationVerticals } from "../../../api/vertical";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const page = () => {
  const [categories, setCategories] = useState<
    { title: string; id: string; icon: string }[]
  >([]);
  const [loading, setLoading] = useState<null | "FETCH" | "SUBMIT">(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading("FETCH");
      const data = await getFoundationVerticals({ active: true });
      setCategories(data);
      setLoading(null);
    };

    fetchData();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const data = new FormData();
    const verticalId = formData.get("verticalId") as string;
    if (!verticalId) {
      toast.error("Please select a category before proceeding");
      return;
    }
    setLoading("SUBMIT");
    const categoryId = verticalId.split("-").slice(0, -1).join("-");
    data.append("verticalId", categoryId);
    await selectCategory(data);
    redirect("/choose-institute?verticalId=" + categoryId);
  };
  
  return (
    <div className="bg-white">
      <form
        className="bg-white flex flex-col justify-center items-center gap-[10px]"
        action={handleSubmit}
      >
        <p className=" font-semibold text-[30px] leading-[50.6px] tracking-[0.01em] text-center text-[#354764]">
          Select category
        </p>
        <p className=" font-normal text-[15px] leading-[32px] tracking-[0.01em] text-center text-[#505F79]">
          Please select your institution{" "}
        </p>
        {!categories.length && loading === "FETCH" ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 items-center justify-center max-h-[350px] overflow-y-scroll ">
            {categories.map((category) => (
              <div key={category.id}>
                <input
                  type="radio"
                  name="verticalId"
                  value={`${category.id}-${category.title}`}
                  className="hidden peer"
                  id={category.id}
                />

                <label
                  htmlFor={category?.id}
                  className="px-2  py-2 w-[182px]  justify-center cursor-pointer bg-white  text-dark h-[130px] peer-checked:border-[#6129FE] rounded-[16px] flex flex-col border-[1px] border-[#DFE2E6] items-center"
                >
                  <img src={category?.icon} alt={category?.title} />
                  {category?.title}
                </label>
              </div>
            ))}
          </div>
        )}
        <div>
          <Button
            type="submit"
            intent="primary"
            className="w-[388px] h-[60px] rounded-[10px] bg-[#6129FE] text-white  font-[500] text-[20px] leading-[20px] flex justify-center items-center"
            disabled={Boolean(loading)}
          >
            {loading === "SUBMIT" ? (
              <div className="flex items-center justify-center w-[8ch]">
                <Loader2 className="animate-spin text-white" />
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
