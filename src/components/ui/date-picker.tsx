import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from "./button";


export const DatePicker = ({
  date,
  setDate,
}: {
  date: Date | undefined,
  setDate: (date: Date | undefined) => void,
}) => {
  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          className="w-[280px] justify-start text-left font-base"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full border-0! p-0"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          required
        />
      </PopoverContent>
    </Popover>
  );
}
