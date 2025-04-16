import HandshakeAnalyticsCard from '@/_ui/handshake-analytics-card'

// const userProfile = getUserProfile() 
export default function Page() {
  return (
    <div className="flex items-start justify-between gap-8 p-8">
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
  );
}
 