'use client';

import ProfileCard from '@/_ui/profile-card';
import HandshakeAnalyticsCard from '@/_ui/handshake-analytics-card';
import PageHeader from '@/_ui/page-header';
import { fetchUserProfile } from '@/_lib/dal';
import { useEffect, useState } from 'react';


interface UserData {
  id: string;
  username: string;
  email: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    
    const loadProfile = async () => {
      setLoading(true);
      try {
        const res = await fetchUserProfile();
        if (res.success) {
          setUserData(res.data.data);
        } else {
          setError(res.error || 'Failed to load profile');
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PageHeader title="Dashboard" subTitle="Welcome to Handshakr" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PageHeader title="Dashboard" subTitle="Welcome to Handshakr" />
        <p className="text-warning">Error: {error}</p>
      </div>
    );
  }

  console.log(userData);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <PageHeader title="Dashboard" subTitle="Welcome to Handshakr" />
      <div className="flex flex-col gap-2">
        {userData && (
          <ProfileCard
            username={userData.username}
            userId={userData.id}
            email={userData.email}
          />
        )}
        <HandshakeAnalyticsCard count="10" status="pending" />
        <HandshakeAnalyticsCard count="10" status="completed" />
        <HandshakeAnalyticsCard count="10" status="failed" />
      </div>
    </div>
  );
}