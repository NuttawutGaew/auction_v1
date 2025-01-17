import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import { connectMongoDB } from "../../../utils/mongoDB";

export async function POST(req){
    try {
        const { name, email, password,confirmpassword,phone, } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({ name, email, password,confirmpassword,phone: hashedPassword });

        return NextResponse.json({ message: "User registered successfully." },{ status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "An error occured whit redistrating the user." },{ status: 500 });
    }
}