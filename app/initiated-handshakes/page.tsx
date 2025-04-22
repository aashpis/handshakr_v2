'use client';

import { useEffect, useState } from 'react';
import { fetchInitiatedHandshakes, getUserProfileAxiosRequest } from "@/_lib/dal";
import HandshakeCard from "@/_ui/handshake-card";
import PageHeader from "@/_ui/page-header";
import { Handshake } from '@/_lib/definitions';


export default function Page() {
  const [handshakes, setHandshakes] = useState<Handshake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
  
      try {
        const userRes = await getUserProfileAxiosRequest();
        if (!userRes.success) {
          setError(userRes.error || "Failed to load profile");
          return;
        }
  
        const username = userRes.data.data.username;
  
        if (!username) {
          setError("Failed to get user profile");
          return;
        }
  
        const hsRes = await fetchInitiatedHandshakes(username);
        if (hsRes.success) {
          setHandshakes(hsRes.data);
        } else {
          setError(hsRes.error || "Failed to fetch handshakes.");
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <PageHeader
        title="My Initiated Handshakes"
        subTitle="All Handshakes you have initiated"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-warning">{error}</p>}
      {handshakes.map((handshake) => (
        <HandshakeCard key={handshake.signedDate} {...handshake} />
      ))}
    </div>
  );
}
