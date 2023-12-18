"use client";

import { Button } from "@/components/ui/button";

import { deleteUrl } from "@/actions/deleteUrl";

import { useFormStatus, useFormState } from "react-dom";

const initialState = {
  message: "",
};

type DeleteURLFormProps = {
  id: string;
};

const DeleteUrlForm = ({ id }: DeleteURLFormProps) => {
  const [state, formAction] = useFormState(deleteUrl, initialState);
  return (
    <form action={formAction}>
      <input type="hidden" value={id} name="id" />
      <DeleteButton />
    </form>
  );
};

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" disabled={pending}>
      Delete
    </Button>
  );
};

export default DeleteUrlForm;
