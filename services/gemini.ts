import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askNexusAI = async (
  userQuery: string, 
  contextData: any
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Prepare a compact context string from the provided data
    const contextString = JSON.stringify(contextData).substring(0, 30000); // Limit context size

    const prompt = `
      You are Nexus AI, an advanced facility and real estate assistant for an enterprise IWMS system.
      You have access to the following JSON data representing the current system state (properties, work orders, capital projects, vendors, assets, leases, etc.):
      
      DATA CONTEXT:
      ${contextString}

      USER QUERY:
      "${userQuery}"

      INSTRUCTIONS:
      1. Answer the user's question directly and accurately based *only* on the data provided.
      2. If analyzing data, provide brief, actionable insights (e.g., "Capital Project **CP-02** is over budget by $150,000. This is a major repair on a property with a Warning status, which should be prioritized.").
      3. **Crucially, when you mention a module or specific item (like a project or property), provide a direct navigation link using markdown format.** For example: "You can view this in the [Capital Projects module](/projects)." or "Details for property [Nexus Headquarters](/real-estate) are available."
      4. You can perform calculations like sums, averages, and variances.
      5. Keep the tone professional, concise, and helpful (Enterprise software persona).
      6. Format the output as clean text. Use bullet points for lists. Use bold for key items like property names or project IDs.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "I was unable to process that request based on the current data.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently offline or unable to reach the AI service. Please check your API key configuration.";
  }
};