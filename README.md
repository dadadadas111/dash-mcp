# dash-mcp

A simple MCP (Model Context Protocol) server with weather checking capability.

## Installation

```bash
bun install
```

## Running the MCP Server

```bash
bun run mcp-server.ts
```

## Using with Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dash-weather": {
      "command": "bun",
      "args": ["run", "D:\\Repos\\dash-mcp\\mcp-server.ts"]
    }
  }
}
```

*(Update the path to match your actual project location)*

After adding the configuration, restart Claude Desktop.

## Available Tools

### get_weather

Get current weather information for a city.

**Parameters:**
- `city` (string, required): The city name

**Supported cities:** new york, london, tokyo, paris, sydney

**Example usage in Claude:**
```
What's the weather in Tokyo?
```

## Development

The original Bun web server example is still available in `index.ts`:

```bash
bun run index.ts
```

Then visit http://localhost:3000

---

This project was created using `bun init` in bun v1.3.8. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
