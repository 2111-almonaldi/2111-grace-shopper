import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "../../../public/cardForm.css";
import { useDispatch } from "react-redux";
import { checkout } from "../../store/order";
import useResponsiveFontSize from "./useResponsiveFontSize";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    try {
      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      alert("Success! Get your popcorn ready!");
      dispatch(checkout);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="/create-checkout-session"
      method="POST"
    >
      <label>
        Card details
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      <button type="submit" id="checkout-button" disabled={!stripe}>
        Pay
      </button>
      ;
    </form>
  );
};

export default CardForm;
