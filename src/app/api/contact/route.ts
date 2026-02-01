import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const nameTrimmed = name?.trim();
        const emailTrimmed = email?.trim();
        const messageTrimmed = message?.trim();

        if (!nameTrimmed || !emailTrimmed || !messageTrimmed) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailTrimmed)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Email sending logic goes here (Resend / Nodemailer)
        console.log("Contact Form Submission:", {
            name: nameTrimmed,
            email: emailTrimmed,
            message: messageTrimmed,
        });

        return NextResponse.json(
            { message: "Message sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
