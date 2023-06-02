import React, { useState } from 'react'
import "./Premium.css"
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import { danaLogo, ovoLogo, gopayLogo } from '../../assets'

const Premium = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { user } = useAuthContext()

  const handlePaymentMethodClick = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  // update user menjadi premium
  const upgradeUser = async () => {
    const username = user.username
    try {
      const response = await axios.patch(`http://localhost:8080/api/user/premium/${username}`);

      const updatedUser = response.data;
      // Lakukan sesuatu dengan data user yang sudah diupdate
      console.log(updatedUser);

      // Mendapatkan nilai dari localStorage
      const userData = JSON.parse(localStorage.getItem('user'));

      // Memperbarui nilai isPremium
      userData.isPremium = true;

      // Menyimpan kembali nilai yang sudah diubah ke dalam localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="premium-wrapper">
      <h3>Get Lifetime Access!</h3>
      <p>Only Rp10.000,00</p>
      <div className="payment-method-wrapper">
        <img src={danaLogo} alt="Dana" className={`payment-method ${selectedPaymentMethod === 'dana' ? 'selected' : ''}`} onClick={() => handlePaymentMethodClick('dana')} />
        <img src={gopayLogo} alt="Gopay" className={`payment-method ${selectedPaymentMethod === 'gopay' ? 'selected' : ''}`} onClick={() => handlePaymentMethodClick('gopay')} />
        <img src={ovoLogo} alt="Ovo" className={`payment-method ${selectedPaymentMethod === 'ovo' ? 'selected' : ''}`} onClick={() => handlePaymentMethodClick('ovo')} />
      </div>
      {selectedPaymentMethod && (
        <a onClick={() => upgradeUser()} target="_blank">Get it</a>

      )}
    </div>
  )
}

export default Premium