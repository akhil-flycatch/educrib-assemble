"use client";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  AutoComplete,
  Button,
  Field,
  Input,
  Label,
} from "@/storybooks/components/atoms";
import { TOption } from "@/storybooks/components/atoms/type";
import { HostelFeeJoin } from "@/types";

import { searchCurrencies, searchFrequencies } from "@/api";
import { Error } from ".";

const HostelFees = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: HostelFeeJoin[] | undefined;
  label?: boolean;
  error?: string;
}) => {
  const [hostelFees, setHostelFees] = useState<
    Partial<
      Omit<HostelFeeJoin, "currencyId" | "frequencyId"> &
        Partial<{
          currencyId?: string | TOption | null | undefined;
          frequencyId?: string | TOption | undefined | null;
        }>
    >[]
  >(defaultValue || []);

  useEffect(() => {
    const newHostelFees = defaultValue?.map((hostelFee) => {
      return {
        id: hostelFee.id,
        title: hostelFee.title,
        amount: hostelFee.amount,
        currencyId:
          hostelFee.currency?.id && hostelFee.currency?.title
            ? {
                label: hostelFee.currency?.title,
                value: hostelFee.currency?.id,
              }
            : undefined,
        frequencyId:
          hostelFee.frequency?.id && hostelFee.frequency?.title
            ? {
                label: hostelFee.frequency?.title,
                value: hostelFee.frequency?.id,
              }
            : undefined,
      };
    });
    setHostelFees(newHostelFees || []);
  }, [defaultValue]);

  const addHostelFee = () => {
    setHostelFees((prevHostelFees) => [
      ...prevHostelFees,
      {
        id: uuidv4(),
        title: "",
        amount: 0,
        currencyId: undefined,
        frequencyId: undefined,
      },
    ]);
  };

  const removeHostelFee = (index: string) => {
    setHostelFees((prevHostelFees) => {
      const newHostelFees = prevHostelFees.filter((f, _) => f.id !== index);
      return newHostelFees;
    });
  };

  return (
    <Field>
      {label && <Label htmlFor="hostelFees">Hostel Fees</Label>}
      <div className="space-y-2">
        {hostelFees.map((hostelFee, index) => {
          const key = `${index}-${hostelFee.id}`;
          return (
            <div className="flex justify-between" key={key}>
              <Input
                type="text"
                required
                name={`hostelFees[${index}].title`}
                placeholder="Title"
                className="w-32"
                value={hostelFee.title || ""}
                onChange={(e) => {
                  const newHostelFees = [...hostelFees];
                  newHostelFees[index].title = e.target.value;
                  setHostelFees(newHostelFees);
                }}
              />

              <Input
                type="number"
                name={`hostelFees[${index}].amount`}
                placeholder="Amount"
                className="w-32"
                value={hostelFee.amount || ""}
                onChange={(e) => {
                  const newHostelFees = [...hostelFees];
                  newHostelFees[index].amount = Number(e.target.value);
                  setHostelFees(newHostelFees);
                }}
              />

              <AutoComplete
                key={hostelFee?.currency?.title}
                name={`hostelFees[${index}].currencyId`}
                searchFn={(term) => searchCurrencies(term, { active: true })}
                placeholder="Select Currency"
                value={hostelFee.currencyId || ""}
                onChange={(e) => {
                  const newHostelFees = [...hostelFees];
                  newHostelFees[index].currencyId = e;
                  setHostelFees(newHostelFees);
                }}
              />

              <AutoComplete
                key={hostelFee?.frequency?.title}
                name={`hostelFees[${index}].frequencyId`}
                searchFn={(term) => searchFrequencies(term, { active: true })}
                placeholder="Select Frequency"
                value={hostelFee.frequencyId || ""}
                onChange={(e) => {
                  const newHostelFees = [...hostelFees];
                  newHostelFees[index].frequencyId = e;
                  setHostelFees(newHostelFees);
                }}
              />

              <Button
                type="button"
                onClick={() => removeHostelFee(hostelFee.id || "")}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <Button type="button" onClick={() => addHostelFee()}>
        Add Hostel Fee Item
      </Button>
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default HostelFees;
