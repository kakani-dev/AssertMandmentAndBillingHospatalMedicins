// Import Dependencies
import PropTypes from "prop-types";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useCallback, useState } from "react";

// Local Imports
import { ConfirmModal } from "components/shared/ConfirmModal";
import { Button } from "components/ui";

// ----------------------------------------------------------------------

const confirmMessages = {
  pending: {
    description:
      "Are you sure you want to delete this user? Once deleted, it cannot be restored.",
  },
  success: {
    title: "User Deleted",
  },
};

export function RowActions({ row, table }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const closeModal = () => {
    setDeleteModalOpen(false);
  };

  const openModal = () => {
    setDeleteModalOpen(true);
    setDeleteError(false);
    setDeleteSuccess(false);
  };

  const handleDeleteRows = useCallback(() => {
    setConfirmDeleteLoading(true);
    setTimeout(() => {
      table.options.meta?.deleteRow(row);
      setDeleteSuccess(true);
      setConfirmDeleteLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const state = deleteError ? "error" : deleteSuccess ? "success" : "pending";

  return (
    <>
      <div className="flex justify-center">
        <Popover className="relative">
          <PopoverButton
            as={Button}
            variant="flat"
            isIcon
            className="size-7 rounded-full"
          >
            <EllipsisHorizontalIcon className="size-4.5" />
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom end"
              className="z-50 mt-1.5 min-w-[10rem] flex flex-col rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 focus:outline-hidden dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
            >
              {({ close }) => (
                <>
                  <button
                    onClick={() => {
                      alert("View action clicked for " + row.id);
                      close();
                    }}
                    className="flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                  >
                    <EyeIcon className="size-4.5 stroke-1" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => {
                      alert("Edit action clicked for " + row.id);
                      close();
                    }}
                    className="flex h-9 w-full items-center space-x-3 px-3 tracking-wide outline-hidden transition-colors hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-dark-600 dark:hover:text-dark-100"
                  >
                    <PencilIcon className="size-4.5 stroke-1" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      openModal();
                      close();
                    }}
                    className="flex h-9 w-full items-center space-x-3 px-3 tracking-wide text-error outline-hidden transition-colors hover:bg-error/10 dark:text-error-light dark:hover:bg-error-light/10"
                  >
                    <TrashIcon className="size-4.5 stroke-1" />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>

      <ConfirmModal
        show={deleteModalOpen}
        onClose={closeModal}
        messages={confirmMessages}
        onOk={handleDeleteRows}
        confirmLoading={confirmDeleteLoading}
        state={state}
      />
    </>
  );
}

RowActions.propTypes = {
  table: PropTypes.object,
  row: PropTypes.object,
};
