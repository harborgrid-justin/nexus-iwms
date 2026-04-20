import { GoogleGenAI } from "@google/genai";

function safeJsonContext(value: unknown, maxChars = 30_000): string {
  try {
    const json = JSON.stringify(value);
    return json.length > maxChars ? json.slice(0, maxChars) : json;
  } catch {
    return "{}";
  }
}

export async function askNexusAI(
  userQuery: string,
  contextData: unknown
): Promise<string> {
  // FIX: Following @google/genai Guidelines - Always use new GoogleGenAI instance with process.env.API_KEY directly before each request.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  // FIX: Following @google/genai Guidelines - Select gemini-3-flash-preview for basic text and simple Q&A tasks.
  const model = "gemini-3-flash-preview";
  const contextString = safeJsonContext(contextData, 30_000);

  // Keep prompts deterministic and compact; avoid overly-indented template blocks.
  const prompt =
    [
      "You are Nexus AI, an advanced facility and real estate assistant for an enterprise IWMS system.",
      "You have access to the following JSON data representing the current system state (properties, work orders, capital projects, vendors, assets, leases, etc.).",
      "",
      "DATA CONTEXT (JSON):",
      contextString,
      "",
      "USER QUERY:",
      userQuery,
      "",
      "INSTRUCTIONS:",
      "1. Answer directly based only on the provided data.",
      "2. If you analyze data, provide brief actionable insights (e.g., budget variance, risk, priority).",
      "3. When mentioning a module or item, include a navigation link in markdown: [Capital Projects](/projects), [Real Estate](/real-estate), etc.",
      "4. You may perform calculations (sums, averages, variances) if the data supports it.",
      "5. Tone: professional, concise, enterprise software persona.",
      "6. Output: clean text; bullets for lists; bold key items like IDs/names."
    ].join("\n");

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt
    });

    // FIX: Access .text property directly instead of calling .text() method per guidelines.
    const text = response.text?.trim();
    return text && text.length > 0
      ? text
      : "I was unable to process that request based on the current data.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error connecting to the AI service. Verify your network connectivity and API key configuration.";
  }
}