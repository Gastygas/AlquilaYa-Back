import { format } from "date-fns";
import { IPropertyWithUserId } from "src/modules/property/interface/propertyWithUserId";

export const isDateAvailable = (property: IPropertyWithUserId, date: string): boolean => {
    // Obtener la fecha actual sin la parte de la hora (solo yyyy-MM-dd)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convertir la fecha de 'dd/MM/yyyy' a un objeto Date
    const [day, month, year] = date.split('/').map(Number);
    const bookingDate = new Date(year, month - 1, day); // Meses en JavaScript son de 0 a 11

    // Verificar si la fecha es anterior a hoy
    if (bookingDate < today) {
        return false; // Fecha pasada
    }

    // Verificar si la fecha está en disableDays
    return !property.disableDays.some(disableDate => {
        // Convertir la fecha de disableDays al formato "dd/MM/yyyy"
        const disableDateFormatted = format(new Date(disableDate), "dd/MM/yyyy");
        return disableDateFormatted === date;
    }) && !property.reservedDays.some(reserved => {
        const reservedDaysFormatted = format (new Date(reserved), 'dd/MM/yyyy');
        return reservedDaysFormatted === date
    });
};