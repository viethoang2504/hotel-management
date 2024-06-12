import { NextResponse } from "next/server";
import { env } from "process";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
});

export async function POST(req: Request, res: Response) {
    const reqBody = await req.text()
    const sig = req.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret)
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 })
    }

    // Load our event
    switch (event.type) {
        case checkout_session_completed:
            const session = event.data.object;
            console.log(session);


            return NextResponse.json("Booking successfull", {
                status: 200,
                statusText: "Booking Successful"
            })

        default:
            console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json("Event Received", {
        status: 200,
        statusText: "Event Received"
    })
}