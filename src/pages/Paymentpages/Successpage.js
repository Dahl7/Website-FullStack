import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PaymentSuccess.css'

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
    <div className="success-container">
    {status === 'paid' ? (
      <>
        <div className="success-icon">✅</div>
        <h2 className="success-message">Thank you! Your payment was successful.</h2>
        <p className="success-subtext">You will receive a confirmation email shortly.</p>
      </>
    ) : (
      <>
        <div className="success-icon">❌</div>
        <h2 className="error-message">Payment failed or could not be verified.</h2>
        <p className="success-subtext">Please try again or contact support.</p>
      </>
    )}
  </div>
);
};

export default PaymentSuccess;
