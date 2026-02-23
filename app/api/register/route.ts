import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { teamName, name, email, phone, college, member2Name, member2Email, member2Phone, member2College } = body;

        // Required fields
        if (!teamName || !name || !email || !phone || !college) {
            return NextResponse.json(
                { success: false, message: "Team name, leader details, and college are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Team leader email is invalid." },
                { status: 400 }
            );
        }
        if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
            return NextResponse.json(
                { success: false, message: "Team leader phone must be 10 digits." },
                { status: 400 }
            );
        }

        if (member2Email && !emailRegex.test(member2Email)) {
            return NextResponse.json(
                { success: false, message: "Member 2 email is invalid." },
                { status: 400 }
            );
        }
        if (member2Phone && !phoneRegex.test(member2Phone.replace(/\s/g, ""))) {
            return NextResponse.json(
                { success: false, message: "Member 2 phone must be 10 digits." },
                { status: 400 }
            );
        }

        const existingEmail = await prisma.registration.findUnique({ where: { email } });
        if (existingEmail) {
            return NextResponse.json(
                { success: false, message: "Team leader email is already registered." },
                { status: 409 }
            );
        }

        const existingPhone = await prisma.registration.findUnique({ where: { phone } });
        if (existingPhone) {
            return NextResponse.json(
                { success: false, message: "Team leader phone number is already registered." },
                { status: 409 }
            );
        }

        if (member2Email) {
            const existingM2Email = await prisma.registration.findUnique({ where: { member2Email } });
            if (existingM2Email) {
                return NextResponse.json(
                    { success: false, message: "Member 2 email is already registered." },
                    { status: 409 }
                );
            }
        }

        if (member2Phone) {
            const existingM2Phone = await prisma.registration.findUnique({ where: { member2Phone } });
            if (existingM2Phone) {
                return NextResponse.json(
                    { success: false, message: "Member 2 phone number is already registered." },
                    { status: 409 }
                );
            }
        }

        await prisma.registration.create({
            data: {
                teamName,
                name,
                email,
                phone,
                college,
                member2Name: member2Name || null,
                member2Email: member2Email || null,
                member2Phone: member2Phone || null,
                member2College: member2College || null,
            },
        });

        return NextResponse.json(
            { success: true, message: "Registration successful!" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error. Please try again." },
            { status: 500 }
        );
    }
}
