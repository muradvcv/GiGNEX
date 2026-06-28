import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUserForServer } from "@/lib/user/getuser";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await req.formData();

    const amount = Number(formData.get("amount"));
    const productName = formData.get("productName");
    const taskId = formData.get("taskId");

    // NEW
    const proposalId = formData.get("proposalId");
    const freelancerId = formData.get("freelancerId");
    const freelancerEmail = formData.get("freelancerEmail");
    const freelancerName = formData.get("freelancerName");

    const PaymentUser = await getUserForServer();
    const user = PaymentUser.user;

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        // freelancer
        proposalId,
        taskId,
        amount: amount.toString(),
        freelancerId,
        freelancerEmail,
        freelancerName,
        // client 
        clientId: user.id,
        clientName: user.name,
        clientEmail: user.email,
      },

      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}