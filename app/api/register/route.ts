import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, college } = body;

        // Basic validation
        if (!name || !email || !phone || !college) {
            return NextResponse.json(
                { success: false, message: "All fields are required." },
                { status: 400 }
            );
        }

        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email address." },
                { status: 400 }
            );
        }

        // Phone format check (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
            return NextResponse.json(
                { success: false, message: "Enter a valid 10-digit phone number." },
                { status: 400 }
            );
        }

        // Check for duplicate email
        const existingEmail = await prisma.registration.findUnique({
            where: { email },
        });
        if (existingEmail) {
            return NextResponse.json(
                { success: false, message: "This email is already registered." },
                { status: 409 }
            );
        }

        // Check for duplicate phone
        const existingPhone = await prisma.registration.findUnique({
            where: { phone },
        });
        if (existingPhone) {
            return NextResponse.json(
                { success: false, message: "This phone number is already registered." },
                { status: 409 }
            );
        }

        // Insert registration
        await prisma.registration.create({
            data: { name, email, phone, college },
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
