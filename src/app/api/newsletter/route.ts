import { NextRequest, NextResponse } from 'next/server';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // TODO: Replace this with your actual email service integration
    // Examples:
    // - Mailchimp: await addToMailchimp(email)
    // - ConvertKit: await addToConvertKit(email)
    // - Sendinblue: await addToSendinblue(email)
    // - Custom database: await saveToDatabase(email)

    // For now, just log the email (remove in production)
    console.log('Newsletter signup:', email);

    // Simulate a successful signup
    // In production, this would be the response from your email service
    return NextResponse.json({
      success: true,
      message: 'Inscription réussie ! Vous recevrez bientôt nos astuces Excel.',
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}
