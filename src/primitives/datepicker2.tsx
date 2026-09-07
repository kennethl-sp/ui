import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "./button.js";
import { Calendar } from "./calendar.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

type DatePicker2Props = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
};

export function DatePicker2({ value, onChange }: DatePicker2Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mt-1 flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
