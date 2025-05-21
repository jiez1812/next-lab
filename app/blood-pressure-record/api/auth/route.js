import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { password } = await request.json();
    const hashedPassword = process.env.BP_PASSWORD;
    console.log('Stored hash:', hashedPassword);

    if (!hashedPassword) {
      return Response.json({ error: 'Password not configured' }, { status: 500 });
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false });
    }
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
