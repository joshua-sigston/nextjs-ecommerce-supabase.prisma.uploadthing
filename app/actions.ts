"use server"
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export async function MakeOrder(data: any) {
  console.log(data)

  const lineItems = data.map((product: { id: string, name: string, priceInCents: number, quantity: number }) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
      },
      unit_amount: product.priceInCents, // price in cents
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancel'
  })
  return redirect(session.url as string)
}