import React from 'react'
import "./Premium.css"
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

const Premium = () => {
  const { user } = useAuthContext()

  // update user menjadi premium
  const handleClick = async () => {
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
      <p>Only 500</p>
      <button onClick={() => handleClick()}>Get it</button>
    </div>
  )
}

export default Premium