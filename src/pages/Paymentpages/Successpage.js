import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/orders/paymentStatus', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId })
        });

        const data = await res.json();
        setStatus(data.status);
      } catch (error) {
        setStatus('error');
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  if (status === 'pending') return <p>Verifying your payment...</p>;

  return (
    <div>
      {status === 'paid' ? (
        <h2>🎉 Thank you! Your payment was successful.</h2>
      ) : (
        <h2>❌ Payment failed or could not be verified.</h2>
      )}
    </div>
  );
};

export default PaymentSuccess;
