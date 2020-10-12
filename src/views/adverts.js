import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import SideBar from '../components/sidebar'
import Content from '../content/advertisement/adHome1'
import Content1 from '../content/advertisement/summary'
import axios from 'axios'

function Adverts() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get(`http://localhost:5000/advert//getAdvertsState`)
        .then(res => {
          console.log(res.data)
          setStatus(res.data.val);
        })

    } catch (error) {

    }
    setLoading(false)

  }, [loading])
  console.log(status);

  return (
    <div>
      <Navbar />
      <SideBar />
      {!status ? <Content /> : <Content1 />}

    </div>
  )
}

export default Adverts
