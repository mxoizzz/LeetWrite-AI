"use client";

import React, { useState } from "react";
import { GenerateInput, generateSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-surface border border-border-subtle rounded-lg p-6">
      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        
        {/* Problem URL */}
        <div className="space-y-2">
          <label htmlFor="problemUrl" className="text-sm font-medium text-text-primary">
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
            className={`w-full h-10 px-3 rounded-md bg-background border text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-border-strong focus:border-border-strong disabled:opacity-50 transition-colors ${
              errors.problemUrl ? "border-error focus:ring-error focus:border-error" : "border-border-subtle"
            }`}
          />
          {errors.problemUrl && <p className="text-xs text-error mt-1">{errors.problemUrl}</p>}
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label htmlFor="language" className="text-sm font-medium text-text-primary">
            Language
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full h-10 px-3 rounded-md bg-background border border-border-subtle text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-strong focus:border-border-strong disabled:opacity-50 transition-colors"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Code */}
        <div className="space-y-2 flex flex-col h-full min-h-[300px]">
          <label htmlFor="code" className="text-sm font-medium text-text-primary">
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
            className={`flex-1 w-full p-4 rounded-md bg-background border font-mono text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-border-strong focus:border-border-strong disabled:opacity-50 resize-none transition-colors ${
              errors.code ? "border-error focus:ring-error focus:border-error" : "border-border-subtle"
            }`}
          />
          {errors.code && <p className="text-xs text-error mt-1">{errors.code}</p>}
        </div>

      </div>

      {/* Actions */}
      <div className="pt-6 mt-4 border-t border-border-subtle">
        <Button 
          type="submit" 
          disabled={isLoading || hasErrors || isFormEmpty}
          className="w-full h-12 text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Structuring discussion...
            </>
          ) : (
            "Generate Discussion"
          )}
        </Button>
      </div>
    </form>
  );
}
