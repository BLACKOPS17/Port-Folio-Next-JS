import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validating the request
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Logic to send email to keerthigro123@gmail.com would go here.
        // Example with a service like Resend or Nodemailer:
        /*
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'keerthigro123@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
        */

        // For now, we simulate a successful background transmission.
        // In a real production app, you would connect this to an email provider.
        console.log("Contact Form Submission Received:", { name, email, message });

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
