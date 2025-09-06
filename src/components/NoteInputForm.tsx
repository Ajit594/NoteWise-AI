"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Sparkles, LoaderCircle, Upload, FileText } from "lucide-react";

const formSchema = z.object({
  notes: z.string().optional(),
  file: z.instanceof(File).optional(),
})
.refine(data => data.notes || data.file, {
  message: "Please either paste notes or upload a file.",
  path: ['notes'],
})
.refine(data => !data.notes || data.notes.length >= 50, {
  message: "Please enter at least 50 characters of notes.",
  path: ['notes'],
});

interface NoteInputFormProps {
  onGenerate: (notes: string | null, file?: File) => void;
  isLoading: boolean;
}

export default function NoteInputForm({ onGenerate, isLoading }: NoteInputFormProps) {
  const [activeTab, setActiveTab] = useState("text");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  });

  const { register } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    const notesToSubmit = activeTab === 'text' ? values.notes : null;
    const fileToSubmit = activeTab === 'file' ? values.file : undefined;
    onGenerate(notesToSubmit ?? null, fileToSubmit);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Generate Your Study Aids
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="text" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text"><FileText className="mr-2" />Paste Text</TabsTrigger>
                <TabsTrigger value="file"><Upload className="mr-2" />Upload File</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-6">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your notes here..."
                          className="min-h-[250px] resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Paste your study notes to generate study aids.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="file" className="mt-6">
                 <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                      <FormLabel>Document File</FormLabel>
                      <FormControl>
                        <Input 
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => onChange(e.target.files?.[0])}
                          onBlur={onBlur}
                          name={name}
                          ref={ref}
                         />
                      </FormControl>
                      <FormDescription>
                        Upload a PDF, DOC, DOCX, or TXT file.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2" />
                  Generate
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
