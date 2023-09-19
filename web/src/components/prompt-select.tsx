import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Prompts {
  id: string;
  title: string;
  template: string;
}

interface PromptProps {
  onPromptSelected: (template: string) => void;
}

export function PromptSelect(props: PromptProps) {
  const [prompts, setPrompts] = useState<Prompts[] | null>(null);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      console.log(response.data);

      setPrompts(response.data);
    });
  }, []);

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    props.onPromptSelected(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
