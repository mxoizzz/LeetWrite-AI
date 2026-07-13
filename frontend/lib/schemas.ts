import { z } from "zod";

export const generateSchema = z.object({
  problemUrl: z
    .string()
    .min(1, "Problem URL is required")
    .regex(
      /^https:\/\/leetcode\.com\/problems\/[a-zA-Z0-9-]+\/?.*$/,
      "Must be a valid LeetCode problem URL (e.g. https://leetcode.com/problems/two-sum/)"
    ),
  language: z.enum([
    "JAVA",
    "PYTHON",
    "CPP",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "GO",
    "C",
    "CSHARP",
  ], {
    message: "Please select a supported language"
  }),
  code: z
    .string()
    .min(1, "Code cannot be empty")
    .max(20000, "Code must be under 20,000 characters"),
});

export type GenerateInput = z.infer<typeof generateSchema>;

export interface GenerateResponse {
  title: string;
  intuition: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  formattedCode: string;
  keyTakeaways: string[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}
