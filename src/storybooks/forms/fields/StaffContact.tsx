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
import { StaffContactJoin } from "@/types";

import { searchContactTypes } from "@/api";
import { Error } from ".";

const StaffContacts = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: StaffContactJoin[] | undefined;
  label?: boolean;
  error?: string;
}) => {
  const [staffContacts, setStaffContacts] = useState<
    Partial<
      Omit<StaffContactJoin, "contactTypeId"> &
        Partial<{
          contactTypeId?: string | TOption | undefined | null;
        }>
    >[]
  >(defaultValue || []);

  useEffect(() => {
    const newStaffContacts = defaultValue?.map((staffContact) => {
      return {
        id: staffContact.id,
        title: staffContact.title,
        phone: staffContact.phone,
        email: staffContact.email,
        website: staffContact.website,
        contactTypeId: staffContact.contactType && {
          label: staffContact.contactType.title,
          value: staffContact.contactType.id,
        },
      };
    });
    setStaffContacts(newStaffContacts || []);
  }, [defaultValue]);

  const addStaffContact = () => {
    setStaffContacts((prevStaffContacts) => [
      ...prevStaffContacts,
      {
        id: uuidv4(),
        title: "",
        amount: 0,
        currencyId: undefined,
        frequencyId: undefined,
      },
    ]);
  };

  const removeStaffContact = (index: string) => {
    setStaffContacts((prevStaffContacts) => {
      const newStaffContacts = prevStaffContacts.filter(
        (f, _) => f.id !== index
      );
      return newStaffContacts;
    });
  };

  return (
    <Field>
      {label && <Label htmlFor="staffContacts">Staff Contacts</Label>}
      <div className="space-y-2">
        {staffContacts.map((staffContact, index) => {
          const key = `${index}-${staffContact.id}`;
          return (
            <div className="flex justify-between" key={key}>
              <Input
                type="text"
                required
                name={`staffContacts[${index}].title`}
                placeholder="Title"
                className="w-32"
                value={staffContact.title || ""}
                onChange={(e) => {
                  const newStaffContacts = [...staffContacts];
                  newStaffContacts[index].title = e.target.value;
                  setStaffContacts(newStaffContacts);
                }}
              />

              <Input
                type="tel"
                name={`staffContacts[${index}].phone`}
                placeholder="Phone"
                className="w-32"
                value={staffContact.phone || ""}
                onChange={(e) => {
                  const newStaffContacts = [...staffContacts];
                  newStaffContacts[index].phone = e.target.value;
                  setStaffContacts(newStaffContacts);
                }}
              />

              <Input
                type="email"
                name={`staffContacts[${index}].email`}
                placeholder="Email"
                className="w-32"
                value={staffContact.email || ""}
                onChange={(e) => {
                  const newStaffContacts = [...staffContacts];
                  newStaffContacts[index].email = e.target.value;
                  setStaffContacts(newStaffContacts);
                }}
              />

              <Input
                type="url"
                name={`staffContacts[${index}].website`}
                placeholder="Website"
                className="w-32"
                value={staffContact.website || ""}
                onChange={(e) => {
                  const newStaffContacts = [...staffContacts];
                  newStaffContacts[index].website = e.target.value;
                  setStaffContacts(newStaffContacts);
                }}
              />

              <AutoComplete
                key={staffContact?.contactType?.title}
                name={`staffContacts[${index}].contactTypeId`}
                searchFn={(term) => searchContactTypes(term, { active: true })}
                placeholder="Select Contact Type"
                value={staffContact.contactTypeId || ""}
                onChange={(e) => {
                  const newStaffContacts = [...staffContacts];
                  newStaffContacts[index].contactTypeId = e;
                  setStaffContacts(newStaffContacts);
                }}
              />

              <Button
                type="button"
                onClick={() => removeStaffContact(staffContact.id || "")}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <Button type="button" onClick={() => addStaffContact()}>
        Add Staff Contact Item
      </Button>
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default StaffContacts;
