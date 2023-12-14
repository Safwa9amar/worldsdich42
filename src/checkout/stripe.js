import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { SERVER_URI } from "../helpers/UrlProvider";
import { useContext, useEffect, useState } from "react";
import { Credentiel } from "../context/CredentielContext";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51NIB1DG5waCNLkzTOjvSqTTba8YBge2kQb5Cbf9k4Am0tufEghZ0Q7MZJ4Aj23Wi3UNzmQOuohpK623yyUZNm4un00yuNmPaIt"
);

export default function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

const CheckoutForm = () => {
  const server_url = useContext(SERVER_URI);
  const stripe = useStripe();
  const elements = useElements();
  const credit_cards_available = [
    {
      name: "Visa",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png",
      alt: "Visa",
      value: "visa",
      start: 4,
    },
    {
      name: "MasterCard",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png",
      alt: "MasterCard",
      value: "mastercard",
      start: 5,
    },
    {
      name: "Discover",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Discover_Card_logo.svg/1200px-Discover_Card_logo.svg.png",
      alt: "Discover",
      value: "discover",
      start: 6,
    },
    {
      name: "JCB",
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/JCB_logo.svg/1200px-JCB_logo.svg.png",
      alt: "JCB",
      value: "jcb",
      start: 3,
    },
  ];

  const [credit_card, setCreditCard] = useState();
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await fetch(`${server_url}/charge/${28}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, amount: 1000 }),
        });
        if (response.ok) {
          console.log("Successful payment");
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form
      className="flex flex-col m-10 bg-gray-100 p-10 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <CardNumberElement
        onChange={(e) => {
          console.log(e);

          credit_cards_available.forEach((card) => {
            if (e.brand === card.value) {
              setCreditCard(card);
            }
          });
        }}
        className="border-2 border-gray-300 rounded-lg px-4 py-2 tracking-widest"
      />
      <CardExpiryElement className="border border-gray-300 p-2 rounded-lg" />
      <CardCvcElement className="border border-gray-300 p-2 rounded-lg" />

      <button disabled={!stripe}>Submit</button>
      <p className="text-red-500 text-sm italic">
        Use any email, 4242 4242 4242 4242 as the card number, any 3 digit
        number, and any future date of expiration.
      </p>
    </form>
  );
};
