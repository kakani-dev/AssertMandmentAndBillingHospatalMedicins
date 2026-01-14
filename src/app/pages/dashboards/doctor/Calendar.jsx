// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import { DatePicker } from "components/shared/form/Datepicker";
import { Card } from "components/ui";

// ----------------------------------------------------------------------

export function Calendar({ events = [] }) {
  const handleDayCreate = (dObj, dStr, fp, dayElem) => {
    // Format date string to match YYYY-MM-DD
    const date = dayElem.dateObj.toISOString().split("T")[0];

    if (events.includes(date)) {
      dayElem.innerHTML +=
        "<span class='absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary-500'></span>";
    }
  };

  return (
    <Card className="flex items-center justify-center overflow-hidden p-2 [&_.flatpickr-calendar]:min-w-full">
      <DatePicker
        isCalendar
        options={{
          onDayCreate: handleDayCreate,
        }}
      />
    </Card>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.string),
};
