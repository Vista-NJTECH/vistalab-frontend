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
      const result = await axios.post('http://124.223.196.177:8181/api/member')
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
          <th>Name</th>
          <th>Colleage</th>
          <th>Specialty</th>
          <th>Phonenum</th>
          <th>Research</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
        data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.colleage}</td>
            <td>{item.specialty}</td>
            <td>{item.phonenum}</td>
            <td>{item.research}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Members