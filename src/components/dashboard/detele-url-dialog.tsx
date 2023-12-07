import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import DeleteUrlForm from "./delete-url-form";

type DeleteURLModalProps = {
    id: string;
};

const DeleteURLModal = ({ id }: DeleteURLModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data from our servers.
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <DeleteUrlForm id={id} />
                        </DialogClose>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteURLModal;
