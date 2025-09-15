/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface GenerateRequest {
  profile: string;
  job: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerateResponse {
  provider: "gemini" | "grok";
  text: string;
}
