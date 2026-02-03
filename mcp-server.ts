#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Simple weather data simulation
const weatherData: Record<string, { temp: number; condition: string; humidity: number }> = {
  "new york": { temp: 22, condition: "Partly Cloudy", humidity: 65 },
  "london": { temp: 15, condition: "Rainy", humidity: 80 },
  "tokyo": { temp: 28, condition: "Sunny", humidity: 55 },
  "paris": { temp: 18, condition: "Cloudy", humidity: 70 },
  "sydney": { temp: 25, condition: "Sunny", humidity: 60 },
};

// Create server instance
const server = new Server(
  {
    name: "dash-mcp-weather",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_weather",
        description: "Get current weather information for a city",
        inputSchema: {
          type: "object",
          properties: {
            city: {
              type: "string",
              description: "The city name to get weather for",
            },
          },
          required: ["city"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_weather") {
    const city = String(request.params.arguments?.city).toLowerCase();
    
    const weather = weatherData[city];
    
    if (!weather) {
      return {
        content: [
          {
            type: "text",
            text: `Weather data not available for "${city}". Available cities: ${Object.keys(weatherData).join(", ")}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: `Weather in ${city}:\n- Temperature: ${weather.temp}°C\n- Condition: ${weather.condition}\n- Humidity: ${weather.humidity}%`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Dash MCP Weather Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
