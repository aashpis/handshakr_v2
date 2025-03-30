'use client'

import  ProfileCard  from '../ui/profile-card'
import  InitiateHandshake from '../ui/initiate-handshake'
import HandshakeAnalyticsCard from '../ui/handshake-analytics-card'

const user = {
  username: "jSmith",
  userID: "123456",
  email: "jsmith@gmail.com"
}

// const userProfile = getUserProfile() 

export default function Page() {


    return (
    <div>
      <div className='flex row justify-evenly m-auto'>
        <ProfileCard 
        username = {user.username}
        userId = {user.userID}
        email = {user.email}
        />
        <HandshakeAnalyticsCard 
          count = '10'
          type = 'pending'
        />
        <HandshakeAnalyticsCard 
          count = '10'
          type = 'pending'
        />
        <HandshakeAnalyticsCard 
          count = '10'
          type = 'pending'
        />

      </div>

      <div>
        <InitiateHandshake />
      </div>

    </div>  
    );
  }
 

// TODO: implement user vs admin dashboard 
// export default function Dashboard() {
//   const session = await verifySession()
//   const userRole = session?.user?.role // Assuming 'role' is part of the session object
 
//   if (userRole === 'admin') {
//     return <AdminDashboard />
//   } else if (userRole === 'user') {
//     return <UserDashboard />
//   } else {
//     redirect('/login')
//   }
// }