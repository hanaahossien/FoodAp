import React from 'react'
import Header from '../../../shared/components/Header/Header'

export default function DashBoard({loginData}) {
  return (
    <>
    <Header title={`${loginData?.userName}`}  desc={"You can now add your items that any user can order it from the Application and you can edit"}/>
    </>
  )
}
