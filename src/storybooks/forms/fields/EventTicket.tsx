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
import { EventTicketJoin } from "@/types";

import { searchCurrencies } from "@/api/index";
import { Error } from ".";

const EventTicket = ({
  defaultValue,
  label = true,
  error,
}: {
  defaultValue: EventTicketJoin[] | undefined;
  label?: boolean;
  error?: string;
}) => {
  const [eventTickets, setEventTickets] = useState<
    Partial<
      Omit<EventTicketJoin, "currencyId"> &
        Partial<{
          currencyId?: string | TOption | null | undefined;
        }>
    >[]
  >(defaultValue || []);

  useEffect(() => {
    const newEventTickets = defaultValue?.map((ticket) => {
      return {
        id: ticket.id,
        title: ticket.title,
        amount: ticket.amount,
        currencyId: {
          label: ticket.currency?.title || "",
          value: ticket.currency?.id || "",
        },
      };
    });
    setEventTickets(newEventTickets || []);
  }, [defaultValue]);

  const addEventTicket = () => {
    setEventTickets((prevEventTickets) => [
      ...prevEventTickets,
      {
        id: uuidv4(),
        title: "",
        amount: 0,
        currencyId: undefined,
      },
    ]);
  };

  const removeEventTicket = (index: string) => {
    setEventTickets((prevEventTickets) => {
      const newEventTicket = prevEventTickets.filter((f, _) => f.id !== index);
      return newEventTicket;
    });
  };

  return (
    <Field>
      {label && <Label htmlFor="event Tickets">Event Tickets</Label>}
      <div className="space-y-2">
        {eventTickets.map((ticket, index) => {
          const key = `${index}-${ticket.id}`;
          return (
            <div className="flex justify-between" key={key}>
              <Input
                type="text"
                required
                name={`tickets[${index}].title`}
                placeholder="Title"
                className="w-32"
                value={ticket.title || ""}
                onChange={(e) => {
                  const newEventTickets = [...eventTickets];
                  newEventTickets[index].title = e.target.value;
                  setEventTickets(newEventTickets);
                }}
              />

              <Input
                type="number"
                name={`tickets[${index}].amount`}
                placeholder="Amount"
                className="w-32"
                value={ticket.amount || ""}
                onChange={(e) => {
                  const newEventTickets = [...eventTickets];
                  newEventTickets[index].amount = parseInt(e.target.value);
                  setEventTickets(newEventTickets);
                }}
              />

              <AutoComplete
                key={ticket?.currency?.title}
                name={`tickets[${index}].currencyId`}
                searchFn={(term) => searchCurrencies(term, { active: true })}
                placeholder="Select Currency"
                value={ticket.currencyId || ""}
                onChange={(e) => {
                  const newEventTickets = [...eventTickets];
                  newEventTickets[index].currencyId = e;
                  setEventTickets(newEventTickets);
                }}
                required
              />

              <Button
                type="button"
                onClick={() => removeEventTicket(ticket.id || "")}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>
      <Button type="button" onClick={() => addEventTicket()}>
        Add Event Ticket
      </Button>
      {error && <Error>{error}</Error>}
    </Field>
  );
};

export default EventTicket;
