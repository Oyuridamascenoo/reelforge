import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

async function generateVideoWithReplicate(
  productName: string,
  productDescription: string,
  imageUrl: string,
  styleId: string
) {
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    throw new Error('REPLICATE_API_TOKEN not configured');
  }

  // TODO: Implementar chamada real à API do Replicate
  // Por enquanto, retorna URL mock
  const videoUrl = `https://example.com/videos/${Date.now()}.mp4`;

  return {
    videoUrl,
    duration: 30,
    fileSize: 1024 * 500,
  };
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productName, productDescription, imageUrl, styles } = body;

    if (!productName || !imageUrl || !styles || styles.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const videos = await Promise.all(
      styles.map((styleId: string) =>
        generateVideoWithReplicate(productName, productDescription, imageUrl, styleId)
      )
    );

    return NextResponse.json({
      success: true,
      videos,
      userId: session.user?.email,
    });
  } catch (error) {
    console.error('Video generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    );
  }
}
