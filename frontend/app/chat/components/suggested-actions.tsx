"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Message } from "ai";
import { memo } from "react";
import { saveMessages } from "../actions";
interface SuggestedActionsProps {
  chatId: string;
  append: (message: Message) => Promise<string | null | undefined>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
function PureSuggestedActions({
  chatId,
  append,
  handleSubmit,
}: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: "Analyze Recent Detection Logs",
      label: "Analyze recent detection logs",
      action:
        "Analyze the last 100 detection logs and provide insights about object detection and tracking.",
    },
    {
      title: "Disengage Hover Mode",
      label: "Disengage hover mode with key H",
      action:
        "Disengage hover mode with key H and move camera to default position.",
    },
    {
      title: "Plot Recent Detections",
      label: "Plot recent detections",
      action:
        "Plot a chart for recent detections and provide insights about object detection and tracking.",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full pb-2">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: 20,
          }}
          transition={{
            delay: 0.05 * index,
          }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? "hidden sm:block" : "block"}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              const userMessage: Message = {
                id: crypto.randomUUID(),
                role: 'user',
                content: suggestedAction.action,
              };
              await saveMessages([userMessage], chatId);
              await append(userMessage);
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm gap-1 sm:flex-col w-full h-auto justify-start items-start sm:items-stretch"
          >
            <span className="font-medium truncate">{suggestedAction.title}</span>
            <span className="text-muted-foreground truncate">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
export const SuggestedActions = memo(PureSuggestedActions, () => true);
