import { AppError } from "@/types/types";

export class AppApiError extends Error implements AppError {
    code: string;
    details?: unknown;
  
    constructor(message: string, code: string, details?: unknown) {
      super(message);
      this.code = code;
      this.details = details;
    }
  }
  