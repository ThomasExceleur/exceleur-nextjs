import { NextRequest, NextResponse } from 'next/server';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID_TCD;

    if (!apiKey || !formId) {
      console.error('KIT_API_KEY or KIT_FORM_ID_TCD is not configured');
      return NextResponse.json(
        { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
        { status: 500 }
      );
    }

    const kitResponse = await fetch(
      `https://api.kit.com/v4/forms/${formId}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': apiKey,
        },
        body: JSON.stringify({ email_address: email }),
      }
    );

    if (kitResponse.ok) {
      return NextResponse.json({
        success: true,
        message: 'Votre guide est en route ! Vérifiez votre boîte mail.',
      });
    }

    const errorData = await kitResponse.json().catch(() => null);

    if (kitResponse.status === 422) {
      return NextResponse.json({
        success: true,
        message: 'Vous êtes déjà inscrit(e) ! Vérifiez votre boîte mail.',
      });
    }

    console.error('Kit API error:', kitResponse.status, errorData);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Guide TCD signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
