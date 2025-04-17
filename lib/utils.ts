import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSessionId(): string {
  if (typeof window === "undefined") {
    return ""
  }

  let sessionId = localStorage.getItem("kharchon-session-id")

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("kharchon-session-id", sessionId)
  }

  return sessionId
}
