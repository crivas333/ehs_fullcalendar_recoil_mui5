import React, { useContext, useEffect } from 'react'
import { PatientData } from './PatientData'

import { GlobalContext } from '../../context/GlobalState'

export const PatientList = () => {
  // const { transactions, getTransactions } = useContext(GlobalContext);
  const { patientData, getPatientsFETCH } = useContext(GlobalContext)

  useEffect(() => {
    // getTransactions();
    console.log('Transaction List - useEffect')
    // getPatientsAPOLLO()
    getPatientsFETCH()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ul className='list'>
        {patientData.map((patientData) => (
          <PatientData key={patientData.id} patientData={patientData} />
        ))}
      </ul>
    </>
  )
}
