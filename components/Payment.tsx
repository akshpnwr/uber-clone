import React, { useState } from 'react';
import { Alert } from 'react-native';
import CustomButton from './CustomButton';
import { useStripe } from '@stripe/stripe-react-native';
import { fetchAPI } from '@/lib/fetch';
import { PaymentProps } from '@/types/type';

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const [success, setSuccess] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: 'USD',
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  const confirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback,
  ) => {
    // Make a request to your own server.
    const { paymentIntent, customer } = await fetchAPI(
      '/(api)/(stripe)/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          name: fullName || email.split('@')[0],
          email,
          paymentMethodId: paymentMethod.id,
        }),
      },
    );

    // Call the `intentCreationCallback` with your server response's client secret or error
    // const { clientSecret, error } = await response.json();
    if (paymentIntent.client_secret) {
      // intentCreationCallback({ clientSecret });
    } else {
      // intentCreationCallback({ error });
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm ride"
        className="my-5"
        onPress={openPaymentSheet}
      />
    </>
  );
};

export default Payment;
