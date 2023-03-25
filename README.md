# node-chatgpt-plugin

A simple Node.js plugin for ChatGPT that allows users to create and manage a TODO list.

## Plugin structure

```bash
.
├── src
│   ├── ai-plugin.js
│   ├── openapi.js
│   └── app.js
```

### Manifest [ai-plugin.json](https://github.com/anton10xr/node-chatgpt-plugin/blob/main/src/ai-plugin.js)

Every plugin requires a `ai-plugin.json` file, which needs to be hosted on the API’s domain and accessible via the `/.well-known/ai-plugin.json` path. [Read more](https://platform.openai.com/docs/plugins/getting-started/plugin-manifest):

```json
{
  "schema_version": "v1",
  "name_for_human": "TODO Plugin",
  "name_for_model": "todo",
  "description_for_human": "Plugin for managing a TODO list, you can add, remove and view your TODOs.",
  "description_for_model": "Plugin for managing a TODO list, you can add, remove and view your TODOs.",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "HOSTNAME/openapi.json",
    "is_user_authenticated": false
  },
  "logo_url": "HOSTNAME/logo.png",
  "contact_email": "<YOUR_EMAIL>",
  "legal_info_url": "http://www.example.com/legal"
}
```

### OpenAPI specification [openapi.json](https://github.com/anton10xr/node-chatgpt-plugin/blob/main/src/openapi.js)

```yaml
openapi: 3.0.1
info:
  title: TODO Plugin
  description: A plugin that allows the user to create and manage a TODO list using ChatGPT.
  version: "v1"
servers:
  - url: http://localhost:5002
paths:
  /todos:
    get:
      operationId: getTodos
      summary: Get the list of todos
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/getTodosResponse"
components:
  schemas:
    getTodosResponse:
      type: object
      properties:
        todos:
          type: array
          items:
            type: string
          description: The list of todos.
```

## Prerequisites

- Node.js installed on your machine

## Getting Started

Follow the steps below to set up and run the ChatGPT TODO plugin.

### 1. Clone the repository

Clone the repository to your local machine by running:

```bash
git clone https://github.com/anton10xr/chatgpt-todo-plugin.git
```

### 2. Install dependencies

Navigate to the project folder and run the following command to install the necessary dependencies:

```bash
cd chatgpt-todo-plugin
npm install
```

### 3. Start the server

Start the local server by running:

```bash
npm run start
```

Your ChatGPT TODO plugin is now available at https://localhost:5002.

## Usage

To connect the plugin with ChatGPT, follow these steps:

1. Run your plugin locally or on a remote server.
2. Make sure the [ai-plugin.json](https://github.com/anton10xr/node-chatgpt-plugin/blob/main/src/ai-plugin.js) manifest file is hosted on your API's domain and accessible via the `https://localhost:5002/.well-known/ai-plugin.json` path.
3. Ensure the OpenAPI specification [/openapi.json](https://github.com/anton10xr/node-chatgpt-plugin/blob/main/src/openapi.js) is properly documented and accessible (e.g., at `http://localhost:5002/openapi.json`).
4. Go to the ChatGPT UI, navigate to the plugin store, and select "Install an unverified plugin." Follow the instructions to connect your plugin to ChatGPT.

For detailed information on creating and connecting plugins, refer to the [ChatGPT plugin documentation](https://platform.openai.com/docs/plugins/getting-started).

## License

This project is licensed under the MIT License.
