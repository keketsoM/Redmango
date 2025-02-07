import React from 'react'
import withAdminAuth from '../HOC/withAdminAuth'

 function AuthorizationTestAdmin() {
  return (
    <div>This page can be accessed by Admin user</div>
  )
}
 

export default withAdminAuth(AuthorizationTestAdmin);