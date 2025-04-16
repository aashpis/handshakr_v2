import  ProfileCard  from '@/_ui/profile-card'
import HandshakeAnalyticsCard from '@/_ui/handshake-analytics-card'
import PageHeader from '@/_ui/page-header'
import { fetchUserProfile } from '@/_lib/dal'


const res = await fetchUserProfile();
const { id, username, email } = res.data;

// const userProfile = getUserProfile() 
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <PageHeader
       title="Dashboard"
       subTitle="Welcome to Handshakr"
      />
      {/* Profile and Analytics Cards */}
      <div className="flex flex-col gap-2">
        <ProfileCard
          username={username}
          userId={id}
          email={email}
        />
          <HandshakeAnalyticsCard
            count="10"
            status="pending"
          />
          <HandshakeAnalyticsCard
            count="10"
            status="completed"
          />
          <HandshakeAnalyticsCard
            count="10"
            status="failed"
          />
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