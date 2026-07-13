import { GenerateInput, GenerateResponse, ApiError } from "./schemas";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api/v1";

export class ApiErrorResponse extends Error {
  public errorData: ApiError;

  constructor(errorData: ApiError) {
    super(errorData.message);
    this.errorData = errorData;
  }
}

export async function generateDiscussion(data: GenerateInput): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorData: ApiError;
    try {
      const json = await response.json();
      errorData = json.error || { code: "INTERNAL_ERROR", message: "An unexpected error occurred" };
    } catch {
      errorData = {
        code: response.status === 504 ? "AI_TIMEOUT" : "INTERNAL_ERROR",
        message: response.status === 504 ? "The request timed out. Please try again." : "An unexpected error occurred",
      };
    }
    throw new ApiErrorResponse(errorData);
  }

  return response.json();
}
