// src/app/api/mock/databases/[slug]/connect/route.ts

export async function POST(req: Request, context: { params: { slug: string } }) {
    const { slug } = context.params
    const body = await req.json()
  
    console.log(`🔌 Connecting to ${slug} with`, body)
  
    return Response.json({ success: true, message: `Connected to ${slug}` })
  }
  