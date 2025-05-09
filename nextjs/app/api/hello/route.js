// This file defines an API route handler for the /api/hello endpoint.

// Define an asynchronous function to handle GET requests.
// The function name (GET) corresponds to the HTTP method.
export async function GET(req) {
  // Return a new Response object with the desired data.
  // The Response object is part of the Web Standard API, available in Next.js.
  return new Response("Hello World!");
}

// You can define other functions for different HTTP methods (POST, PUT, DELETE, etc.)
// export async function POST(req) { ... }
// export async function PUT(req) { ... }
// export async function DELETE(req) { ... }
