'use client';

import ProfileCard from '@/_ui/profile-card';
import PageHeader from '@/_ui/page-header';
import {  getUserProfileAxiosRequest } from '@/_lib/dal';
import { useEffect, useState } from 'react';
import HandshakeCreationForm from '@/_ui/handshake-creation-form';


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
        const res = await getUserProfileAxiosRequest();
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
        <p className="text-warning font-bold">Error: {error}</p>
      </div>
    );
  }

  console.log(userData);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <PageHeader title="Dashboard" subTitle />
      <div className="flex flex-col gap-2">
        {userData && (
          <ProfileCard
            username={userData.username}
            userId={userData.id}
            email={userData.email}
          />
        )}
      <HandshakeCreationForm/>
      </div>
    </div>
  );
// }

}