import { isPast, subMinutes, isBefore } from "date-fns";

export const isPastAfterMins = (datetime, duration) => {
    duration = duration || 0;
    return isPast(subMinutes(datetime, duration));
};

export { isPast, isBefore };
