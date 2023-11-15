"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const CopyButton = ({ shortUrl }: { shortUrl: string }) => {
    const { toast } = useToast();

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/r/${shortUrl}`
        );

        toast({
            title: "Copied to clipboard!",
            variant: "success",
        });
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex gap-2"
                        onClick={copyLinkToClipboard}
                        size="sm"
                    >
                        {shortUrl} <Copy size={16} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to copy link</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default CopyButton;
