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
import { ProgrammeFeeJoin } from "@/types";

import { searchCurrencies, searchFrequencies } from "@/api";
import { Error } from ".";

const ProgrammeFees = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: ProgrammeFeeJoin[] | undefined;
  label?: boolean;
  error?: string;
}) => {
  const [programmeFees, setProgrammeFees] = useState<
    Partial<
      Omit<ProgrammeFeeJoin, "currencyId" | "frequencyId"> &
        Partial<{
          currencyId?: string | TOption | null | undefined;
          frequencyId?: string | TOption | undefined | null;
        }>
    >[]
  >(defaultValue || []);

  useEffect(() => {
    const newProgrammeFees = defaultValue?.map((programmeFee) => {
      return {
        id: programmeFee.id,
        title: programmeFee.title,
        amount: programmeFee.amount,
        currencyId: {
          label: programmeFee.currency?.title || "",
          value: programmeFee.currency?.id || "",
        },
        frequencyId: {
          label: programmeFee.frequency?.title || "",
          value: programmeFee.frequency?.id || "",
        },
      };
    });
    setProgrammeFees(newProgrammeFees || []);
  }, [defaultValue]);

  const addProgrammeFee = () => {
    setProgrammeFees((prevProgrammeFees) => [
      ...prevProgrammeFees,
      {
        id: uuidv4(),
        title: "",
        amount: 0,
        currencyId: undefined,
        frequencyId: undefined,
      },
    ]);
  };

  const removeProgrammeFee = (index: string) => {
    setProgrammeFees((prevProgrammeFees) => {
      const newProgrammeFees = prevProgrammeFees.filter(
        (f, _) => f.id !== index
      );
      return newProgrammeFees;
    });
  };

  return (
    <Field>
      {label && <Label htmlFor="programmeFees">Programme Fees</Label>}
      <div className="space-y-2">
        {programmeFees.map((programmeFee, index) => {
          const key = `${index}-${programmeFee.id}`;
          return (
            <div className="flex justify-between" key={key}>
              <Input
                type="text"
                required
                name={`programmeFees[${index}].title`}
                placeholder="Title"
                className="w-32"
                value={programmeFee.title || ""}
                onChange={(e) => {
                  const newProgrammeFees = [...programmeFees];
                  newProgrammeFees[index].title = e.target.value;
                  setProgrammeFees(newProgrammeFees);
                }}
              />

              <Input
                type="number"
                required
                name={`programmeFees[${index}].amount`}
                placeholder="Amount"
                className="w-32"
                value={programmeFee.amount || ""}
                onChange={(e) => {
                  const newProgrammeFees = [...programmeFees];
                  newProgrammeFees[index].amount = Number(e.target.value);
                  setProgrammeFees(newProgrammeFees);
                }}
              />

              <AutoComplete
                key={programmeFee?.currency?.title}
                name={`programmeFees[${index}].currencyId`}
                searchFn={(term) => searchCurrencies(term, { active: true })}
                placeholder="Select Currency"
                value={programmeFee.currencyId || ""}
                onChange={(e) => {
                  const newProgrammeFees = [...programmeFees];
                  newProgrammeFees[index].currencyId = e;
                  setProgrammeFees(newProgrammeFees);
                }}
              />

              <AutoComplete
                key={programmeFee?.frequency?.title}
                name={`programmeFees[${index}].frequencyId`}
                searchFn={(term) => searchFrequencies(term, { active: true })}
                placeholder="Select Frequency"
                value={programmeFee.frequencyId || ""}
                onChange={(e) => {
                  const newProgrammeFees = [...programmeFees];
                  newProgrammeFees[index].frequencyId = e;
                  setProgrammeFees(newProgrammeFees);
                }}
              />

              <Button
                type="button"
                onClick={() => removeProgrammeFee(programmeFee.id || "")}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <Button type="button" onClick={() => addProgrammeFee()}>
        Add Programme Fee Item
      </Button>
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default ProgrammeFees;
