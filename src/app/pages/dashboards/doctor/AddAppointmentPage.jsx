// Import Dependencies
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Page } from "components/shared/Page";
import { Button, Card, Input } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { useAppointmentsContext } from "./context/AppointmentsContext";

// ----------------------------------------------------------------------

export default function AddAppointmentPage() {
    const navigate = useNavigate();
    const { addAppointment } = useAppointmentsContext();

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && date && time) {
            addAppointment({ name, date, time });
            navigate("/dashboards/doctor");
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <Page title="Add Appointment">
            <div className="w-full max-w-2xl px-(--margin-x) py-8">
                <div className="mb-6 flex items-center gap-3">
                    <Link
                        to="/dashboards/doctor"
                        className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                        <ArrowLeftIcon className="size-4" />
                        Back to Dashboard
                    </Link>
                </div>

                <Card className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-dark-100">
                        Schedule New Appointment
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Enter the patient details below to schedule an appointment.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="patientName" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-dark-200">Patient Name</label>
                            <Input
                                id="patientName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Jane Doe"
                                className="mt-1"
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-dark-200">Date</label>
                            <DatePicker
                                value={date}
                                onChange={(d) => setDate(d)}
                                placeholder="Select Date"
                                className="mt-1 w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-dark-200">Time</label>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                as={Link}
                                to="/dashboards/doctor"
                                variant="flat"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Add Appointment
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Page>
    );
}
