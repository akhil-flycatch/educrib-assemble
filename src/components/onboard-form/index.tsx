"use client";
import { upsertAction, upsertProfileOfUser } from "@/api";
import { ZodValidations } from "@/constants/formFields/institutionOnboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AddressContactForm from "./addressContactForm";
import PrimaryDetailsForm from "./primaryDetailsForm";

const OnboardForm: React.FC = () => {
  const commonFormSchema = z.object({
    website: z.string().url("Invalid website").optional().nullable(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    pincode: z
      .string()
      .min(6, "Pincode must be  atleast 6 characters")
      .optional()
      .nullable(),
    phone: z.string().optional(),
    email: z.string().email("Invalid email address").optional().nullable(),
  });

  const [currentVertical, setCurrentVertical] = useState<{
    id: string;
    name: string;
    slug: string;
  }>(Object(null));

  const dynamicFormSchema =
    ZodValidations[currentVertical.slug as keyof typeof ZodValidations];

  const formSchema = z.object({
    ...commonFormSchema.shape,
    ...dynamicFormSchema?.shape,
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: null,
      establishedYear: null,
      pincode: null,
      email: null,
    },
  });
  const router = useRouter();

  useEffect(() => {
    const fetchVerticals = async () => {
      const response = await fetch("/api/my/vertical");
      const { data } = await response.json();
      console.log("data", data);
      setCurrentVertical(data);
    };
    fetchVerticals();
  }, []);

  const onFormSubmit = async (data: any) => {
    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }
    upsertAction(
      form_data,
      upsertProfileOfUser,
      "Profile saved successfully",
      () => {
        router.push("/");
      }
    );

    // const response = await upsertProfile(data);
    // const response = await fetch("/api/institution/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const responseData = await response.json();
    // console.log(response, "responseData");
  };

  return (
    <>
      <div className="w-full bg-gradient-to-r from-[#5825E7] to-[#F66EFF] h-[114px] px-[120px] flex items-center justify-between mb-12">
        <div className="flex flex-col justify-center gap-2">
          <span className="text-white font-semibold text-2xl">
            Almost There!
          </span>
          <span className="text-white font-medium">
            Complete Your College Profile
          </span>
        </div>
        <div className="flex gap-4">
          <button className="py-3 px-4 rounded-lg border-primary bg-white text-primary hover:bg-light font-medium">
            Skip to Dashboard
          </button>
          <button
            className="py-3 px-4 rounded-lg bg-primary text-white  hover:bg-secondary font-medium"
            onClick={handleSubmit(onFormSubmit)}
          >
            Save and Continue
          </button>
        </div>
      </div>
      {!!Object.entries(currentVertical).length ? (
        <form
          className="w-full px-[120px]"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className="flex justify-between">
            <PrimaryDetailsForm
              register={register}
              errors={errors}
              currentVertical={currentVertical?.slug}
            />
          </div>
          <div className="border border-secondary my-12" />
          <div className="flex justify-between">
            <AddressContactForm register={register} errors={errors} />
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      )}
    </>
  );
};
export default OnboardForm;
