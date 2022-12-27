'use client';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../../statics/table.css'

const result = []

const Members = () => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://124.223.196.177:8181/api/allinvoice')
      setData(result.data.data)
      setLoading(false)
      console.log(result.data.data)
    }
    fetchData()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  
  return (

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Invoicename</th>
          <th>Applicant</th>
          <th>Amount</th>
          <th>Remark</th>
          <th>Category</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {
        data.map((item) => (
          <tr key={item.id}>
            <td>{item.invoicename}</td>
            <td>{item.applicant}</td>
            <td>{item.amount}</td>
            <td>{item.remark}</td>
            <td>{item.category}</td>
            <td>{item.time}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Members