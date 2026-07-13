"use client";

import React, { useState } from "react";
import { GenerateInput, generateSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputPanelProps {
  onGenerate: (data: GenerateInput) => Promise<void>;
  isLoading: boolean;
}

const SUPPORTED_LANGUAGES = [
  "JAVA", "PYTHON", "CPP", "JAVASCRIPT", "TYPESCRIPT", "GO", "C", "CSHARP"
];

export function InputPanel({ onGenerate, isLoading }: InputPanelProps) {
  const [formData, setFormData] = useState<GenerateInput>({
    problemUrl: "",
    language: "JAVA",
    code: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: keyof GenerateInput, value: string) => {
    try {
      generateSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (error: any) {
      if (error.errors) {
        setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    validateField(e.target.name as keyof GenerateInput, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      generateSchema.parse(formData);
      setErrors({});
      await onGenerate(formData);
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const hasErrors = Object.values(errors).some((e) => e.length > 0);
  const isFormEmpty = !formData.problemUrl || !formData.code;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-background p-6">
      <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Problem URL */}
        <div className="space-y-3">
          <label htmlFor="problemUrl" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Problem URL
          </label>
          <input
            id="problemUrl"
            name="problemUrl"
            type="text"
            placeholder="https://leetcode.com/problems/two-sum/"
            value={formData.problemUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            className={cn(
              "w-full h-12 px-4 bg-accent/5 border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 focus:border-accent disabled:opacity-50 transition-colors rounded-none",
              errors.problemUrl ? "border-destructive focus:border-destructive" : "border-border/40"
            )}
          />
          {errors.problemUrl && <p className="text-xs text-destructive mt-1 font-mono">{errors.problemUrl}</p>}
        </div>

        {/* Language */}
        <div className="space-y-3">
          <label htmlFor="language" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full h-12 px-4 bg-accent/5 border border-border/40 text-sm font-mono text-foreground focus:outline-none focus:ring-0 focus:border-accent disabled:opacity-50 transition-colors rounded-none"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Code */}
        <div className="space-y-3 flex flex-col h-full min-h-[300px]">
          <label htmlFor="code" className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Accepted Solution
          </label>
          <textarea
            id="code"
            name="code"
            placeholder="Paste your accepted solution here..."
            value={formData.code}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            spellCheck={false}
            className={cn(
              "flex-1 w-full p-4 bg-accent/5 border font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 focus:border-accent disabled:opacity-50 resize-none transition-colors rounded-none",
              errors.code ? "border-destructive focus:border-destructive" : "border-border/40"
            )}
          />
          {errors.code && <p className="text-xs text-destructive mt-1 font-mono">{errors.code}</p>}
        </div>

      </div>

      {/* Actions */}
      <div className="pt-6 mt-4 border-t border-border/40">
        <Button 
          type="submit" 
          disabled={isLoading || hasErrors || isFormEmpty}
          className="w-full h-14 text-sm font-mono uppercase tracking-widest bg-foreground text-background hover:bg-accent hover:text-accent-foreground rounded-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-4 w-4 animate-spin" />
              GENERATING...
            </>
          ) : (
            "GENERATE DISCUSSION"
          )}
        </Button>
      </div>
    </form>
  );
}
