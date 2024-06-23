import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { cart, totalCost } = await req.json();
    // console.log(cart, totalCost)

    const lineItems = cart.map((product: { id: string, name: string, priceInCents: number, quantity: number }) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: product.priceInCents // price in cents
      },
      quantity: product.quantity,
    }));
    // console.log(lineItems)
    
    const orderId = uuidv4()
    const userOrder = await db.order.create({
      data: {
        id: orderId,
        totalInCents: totalCost,
        mailingAddress: 'asdfasdfasd',
        userId: '3f70af0c-9445-4110-9063-e9a522d2419e',
        orderItems: {
          create: cart.map((product: { id: number; quantity: number }) => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.id },
            },
          })),
        }
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `http://localhost:3000/payment/success?orderID=${orderId}`,
      cancel_url: 'http://localhost:3000/payment/cancel',
      // metadata: {
      //   orderId: userOrder.id
      // }
    })

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
