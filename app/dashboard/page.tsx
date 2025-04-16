'use client';

import ProfileCard from '@/_ui/profile-card';
import HandshakeAnalyticsCard from '@/_ui/handshake-analytics-card';
import PageHeader from '@/_ui/page-header';
import { fetchUserProfile } from '@/_lib/dal';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const csrfToken = typeof window !== 'undefined'
  ? sessionStorage.getItem('X-XSRF-TOKEN')
  : null;

useEffect(() => {
  if (!csrfToken) return; // don't fetch if not logged in

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await fetchUserProfile();
      if (res.success) {
        setUserData(res.data);
      } else {
        setError(res.error || 'Failed to load profile');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  loadProfile();
}, [csrfToken]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PageHeader
          title="Dashboard"
          subTitle="Welcome to Handshakr"
        />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PageHeader
          title="Dashboard"
          subTitle="Welcome to Handshakr"
        />
        <p className="text-warning">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <PageHeader
        title="Dashboard"
        subTitle="Welcome to Handshakr"
      />
      {/* Profile and Analytics Cards */}
      <div className="flex flex-col gap-2">
        <ProfileCard
          username={userData.username}
          userId={userData.id}
          email={userData.email}
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