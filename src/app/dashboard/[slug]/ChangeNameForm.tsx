"use client";

import { changeUrlName } from "@/app/(actions)/changeUrlName";
import { H3 } from "@/components/ui/H3";
import { P } from "@/components/ui/P";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useFormStatus, useFormState } from "react-dom";

const initialState = {
    message: "",
};

const ChangeNameForm = ({ id, name }: { id: string; name?: string }) => {
    const [state, formAction] = useFormState(changeUrlName, initialState);
    return (
        <form className="flex flex-col gap-4" action={formAction}>
            <H3>ChangeNameForm</H3>
            <Input
                name="name"
                placeholder={name || "new url name..."}
                type="text"
            />
            <input type="hidden" name="id" value={id} id="id" />
            <SubmitButton />
            {state && state.message && <P>{state.message}</P>}
        </form>
    );
};

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <Button disabled={pending}>Change</Button>;
};

export default ChangeNameForm;
