import React, { useState, ChangeEvent } from 'react';
import './TopUpPage.css'; // Import the CSS file

interface TopUpPageProps {
  onTopUp: (amount: number, paymentMethod: string) => void;
}

const TopUpPage: React.FC<TopUpPageProps> = ({ onTopUp }) => {
  const [amount, setAmount] = useState<string>('');  // Use string to handle input
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // To store status messages

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleTopUp = () => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setStatusMessage('Please enter a valid amount.');
      return;
    }
    onTopUp(amountNumber, paymentMethod);
    setStatusMessage('Top-up successful!');
    setAmount('');  // Clear the amount field
    setPaymentMethod('');  // Clear the payment method field
  };

  return (
    <div className="top-up-container">
      <div className="top-up-bubble title-bubble">
        <h2>Top-Up Balance</h2>
      </div>
      <div className="top-up-bubble content-bubble">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="debit-card">Debit Card</option>
            <option value="digital-wallet">Digital Wallet</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
        </div>
        <button onClick={handleTopUp}>Top-Up</button>
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default TopUpPage;
