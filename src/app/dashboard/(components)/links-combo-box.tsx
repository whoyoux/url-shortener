"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Url } from "@prisma/client";
import { useRouter } from "next/navigation";

type LinksComboBoxProps = {
    urls: Url[];
};

const getNameOrShortUrl = (urls: Url[], currentUrl: string) => {
    const found = urls.find(
        (url) => url.name === currentUrl || url.shortUrl === currentUrl
    );
    if (!found) return null;

    if (found.name) return found.name;
    else return found.shortUrl;
};

const LinksComboBox = ({ urls }: LinksComboBoxProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="min-w-[200px] flex-1 justify-between"
                >
                    {currentUrl
                        ? getNameOrShortUrl(urls, currentUrl)
                        : "Select your url..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search url..." />
                    <CommandEmpty>No url found.</CommandEmpty>
                    <CommandGroup>
                        {urls.map((url) => (
                            <CommandItem
                                key={url.name || url.shortUrl}
                                value={url.name || url.shortUrl}
                                onSelect={(currentValue) => {
                                    setCurrentUrl(
                                        currentValue === currentUrl
                                            ? ""
                                            : currentValue
                                    );
                                    setOpen(false);
                                    router.push(`/dashboard/${url.shortUrl}`);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        currentUrl ===
                                            (url.name || url.shortUrl)
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {url.name || url.shortUrl}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default LinksComboBox;
