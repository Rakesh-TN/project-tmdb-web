import React from 'react'
import { Bars } from 'react-loader-spinner'

export default function Loading() {
  return (
    <main className='d-flex justify-content-center align-items-center min-vh-100'>
      <Bars
        height="100"
        width="100"
        color="#ffb703"
        ariaLabel="bars-loading"
        visible={true}
      />
    </main>
  )
}
