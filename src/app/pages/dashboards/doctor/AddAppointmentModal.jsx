// Import Dependencies
import { Fragment, useState, useEffect } from "react";
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

export function AddAppointmentModal({ isOpen, onClose, onAdd, initialDate }) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");

    // Update date when initialDate changes
    useEffect(() => {
        if (isOpen && initialDate) {
            setDate(initialDate);
        } else if (isOpen && !initialDate) {
            // Reset date if opened without initialDate
            setDate("");
        }
    }, [initialDate, isOpen]);

    // Reset form when closed
    useEffect(() => {
        if (!isOpen) {
            setName("");
            setDate("");
            setTime("");
            setDescription("");
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && date && time) {
            onAdd({ name, date, time, description });
            onClose();
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
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" />
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
                            <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all dark:bg-dark-800">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-dark-700">
                                    <DialogTitle
                                        as="h3"
                                        className="text-xl font-semibold leading-6 text-gray-900 dark:text-dark-100"
                                    >
                                        Add Appointment
                                    </DialogTitle>
                                    <button
                                        onClick={onClose}
                                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-dark-700 dark:hover:text-dark-200"
                                    >
                                        <XMarkIcon className="size-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                                    <div>
                                        <Input
                                            id="patientName"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Add title (e.g. Consultation with John Doe)"
                                            className="text-lg font-medium border-0 border-b border-gray-200 px-0 focus:ring-0 rounded-none focus:border-primary-500 dark:border-dark-600 dark:bg-transparent placeholder:font-normal"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-300">Date</label>
                                            <DatePicker
                                                value={date}
                                                onChange={(d) => setDate(d)}
                                                placeholder="Select Date"
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="time" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-300">Time</label>
                                            <Input
                                                id="time"
                                                type="time"
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-300">Description</label>
                                        <textarea
                                            id="description"
                                            rows={3}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Add description"
                                            className="block w-full rounded-lg border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-dark-600 dark:bg-dark-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        />
                                    </div>

                                    <div className="mt-8 flex justify-end gap-3">
                                        <Button
                                            type="button"
                                            variant="flat"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" color="primary">
                                            Save
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
    initialDate: PropTypes.string,
};
