"use client";

import { useFormStatus, useFormState } from "react-dom";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { createShortUrl } from "../../../actions/createShortUrl";
import { DialogClose } from "@/components/ui/dialog";

const initialState = {
  message: "",
};

//TODO: Add validation etc.

const CreateNewURLForm = () => {
  const [state, formAction] = useFormState(createShortUrl, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input type="url" placeholder="Your full URL" name="originalUrl" />
      <DialogClose>
        <SubmitButton />
      </DialogClose>
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending} aria-disabled={pending}>
      {pending ? "Pending..." : "Shorten!"}
    </Button>
  );
};

export default CreateNewURLForm;
