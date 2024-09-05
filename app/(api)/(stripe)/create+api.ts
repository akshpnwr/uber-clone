import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

export async function POST(request: Request) {
  // Use an existing Customer ID if this is a returning customer.

  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || !email || !amount) {
    return new Response(
      JSON.stringify({ error: 'Please enter valid credentials', status: 400 }),
    );
  }

  let customer;
  const existingCustomer = await stripe.customers.list({ email });

  if (existingCustomer.data.length < 0) {
    const newCustomer = await stripe.customers.create({ email, name });
    customer = newCustomer;
  } else {
    customer = existingCustomer.data[0];
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2024-06-20' },
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: 'usd',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter
    // is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
  });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    }),
  );
}
