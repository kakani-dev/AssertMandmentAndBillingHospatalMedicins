// Import Dependencies
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Input } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";

// ----------------------------------------------------------------------

export function AddAppointmentModal({ isOpen, onClose, onAdd }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && date && time) {
            onAdd({ name, date, time });
            onClose();
            // Reset form
            setName("");
            setDate("");
            setTime("");
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-dark-800">
                                <div className="flex items-center justify-between">
                                    <DialogTitle
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 dark:text-dark-100"
                                    >
                                        Add Appointment
                                    </DialogTitle>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-dark-700"
                                    >
                                        <XMarkIcon className="size-5 text-gray-500" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label htmlFor="patientName" className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-dark-200">Patient Name</label>
                                        <Input
                                            id="patientName"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. John Doe"
                                            className="mt-1"
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

                                    <div className="mt-6 flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="flat"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Add Appointment
                                        </Button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

AddAppointmentModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
};
