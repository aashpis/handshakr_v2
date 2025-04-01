import  ProfileCard  from '@/ui/profile-card'
import HandshakeAnalyticsCard from '@/ui/handshake-analytics-card'
import HandshakeCreationForm from '@/ui/handshake-creation-form'

const user = {
  username: "jSmith",
  userID: "123456",
  email: "jsmith@gmail.com"
}

// const userProfile = getUserProfile() 
export default function Page() {
  return (
    <div className="flex items-start justify-between gap-8 p-8">
      {/* Left Column with Profile and Analytics Cards */}
      <div className="flex flex-col gap-6 w-1/3">
        <ProfileCard
          username={user.username}
          userId={user.userID}
          email={user.email}
        />
        <div className="flex flex-col gap-4">
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
      {/* Right Column with Handshake Creation Form */}
      <div className="flex-grow w-2/3">
        <HandshakeCreationForm />
      </div>
    </div>
  );
}
 