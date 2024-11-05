"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";


type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmationHandler: () => void;
  cancelHandler: () => void;
};

const RemoveRecordDialog = ({ open, setOpen, confirmationHandler, cancelHandler }: Props) => {
  return (<>
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Record will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel aria-label='Cancel record delete' onClick={cancelHandler}>Cancel</AlertDialogCancel>
          <AlertDialogAction aria-label='Confirm record delete' className="bg-destructive" onClick={confirmationHandler}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </>
  );
};

export default RemoveRecordDialog;
