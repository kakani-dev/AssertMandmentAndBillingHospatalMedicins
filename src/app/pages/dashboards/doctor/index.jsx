// Import Dependencies
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

// Local Imports
import { Page } from "components/shared/Page";
import { Button } from "components/ui";
import { Welcome } from "./Welcome";
import { AppointmentsRequestsList } from "./AppointmentsRequestsList";
import { NextPatient } from "./NextPatient";
import { PatientsChart } from "./PatientsChart";
import { Calendar } from "./Calendar";
import { AppointmentsTable } from "./AppointmentsTable";
import { AddAppointmentModal } from "./AddAppointmentModal";
import {
  AppointmentsProvider,
  useAppointmentsContext,
} from "./context/AppointmentsContext";

// ----------------------------------------------------------------------

function DoctorContent() {
  const { appointments, setAppointments, addAppointment } =
    useAppointmentsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract dates from appointments for the calendar
  const eventDates = appointments
    .map((app) => {
      // Assuming datetime is a timestamp string
      const date = new Date(parseInt(app.datetime));
      return isNaN(date.getTime())
        ? null
        : date.toISOString().split("T")[0]; // YYYY-MM-DD
    })
    .filter(Boolean);

  return (
    <Page title="Doctor Dashboard">
      <div className="transition-content w-full px-(--margin-x) pb-8">
        <div className="mt-4 flex justify-end px-2 sm:mt-5 sm:px-0 lg:mt-6">
          <Button
            as={Link}
            to="/dashboards/doctor/add-appointment"
            className="flex items-center gap-2"
          >
            <PlusIcon className="size-5" />
            <span>Add Appointment</span>
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="ml-2 flex items-center gap-2"
            variant="flat"
          >
            <PlusIcon className="size-5" />
            <span>Quick Add (Modal)</span>
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          <div className="col-span-12 lg:col-span-8 xl:col-span-9">
            <Welcome />
            <AppointmentsRequestsList onAcceptRequest={addAppointment} />
            <AppointmentsTable data={appointments} setData={setAppointments} />
          </div>
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:sticky lg:top-20 lg:grid-cols-1 lg:gap-6 lg:self-start">
              <NextPatient />
              <PatientsChart />
              <Calendar events={eventDates} />
            </div>
          </div>
        </div>

        <AddAppointmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addAppointment}
        />
      </div>
    </Page>
  );
}

export default function Doctor() {
  return (
    <AppointmentsProvider>
      <DoctorContent />
    </AppointmentsProvider>
  );
}
