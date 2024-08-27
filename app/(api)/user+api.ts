import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  console.log('post req');
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId)
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );

    const response = await sql`
    INSERT INTO users (name, email, clerk_id)
    VALUES (${name}, ${email}, ${clerkId})
    `;

    console.log(response);
    return Response.json(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
