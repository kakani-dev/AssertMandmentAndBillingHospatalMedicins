import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { appointmentsList } from "../AppointmentsTable/fakeData";

const AppointmentsContext = createContext(null);

export function AppointmentsProvider({ children }) {
    const [appointments, setAppointments] = useState(appointmentsList);

    const addAppointment = (request) => {
        const newAppointment = {
            user_id: Date.now(), // Generate a unique ID
            name: request.name,
            avatar: request.avatar || null,
            location: "New Appointment", // Default or derived value
            datetime:
                request.date && request.time
                    ? new Date(`${request.date}T${request.time}`).getTime().toString()
                    : Date.now().toString(),
            status: "pending",
        };
        setAppointments((current) => [newAppointment, ...current]);
    };

    const deleteAppointment = (id) => {
        setAppointments((current) => current.filter((item) => item.user_id !== id));
    };

    const updateAppointments = (newData) => {
        setAppointments(newData);
    };

    const value = useMemo(
        () => ({
            appointments,
            setAppointments: updateAppointments,
            addAppointment,
            deleteAppointment,
        }),
        [appointments]
    );

    return (
        <AppointmentsContext.Provider value={value}>
            {children}
        </AppointmentsContext.Provider>
    );
}

AppointmentsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAppointmentsContext() {
    const context = useContext(AppointmentsContext);
    if (!context) {
        throw new Error(
            "useAppointmentsContext must be used within an AppointmentsProvider"
        );
    }
    return context;
}
