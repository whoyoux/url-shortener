import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

import ChangeNameForm from "./change-name-form";

type ChangeNameDialogProps = {
    id: string;
    name: string;
};

const ChangeNameDialog = ({ id, name }: ChangeNameDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <Pen />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Change name</DialogTitle>
                <ChangeNameForm id={id} name={name} />
            </DialogContent>
        </Dialog>
    );
};

export default ChangeNameDialog;
