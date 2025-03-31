// src/app/api/allowedExtensions/route.ts

export async function GET() {
    const allowed = ['.png'];
    return Response.json(allowed);
  }
  