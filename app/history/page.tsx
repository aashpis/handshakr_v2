'use client';

import { useEffect, useState } from 'react';
import { fetchInitiatedHandshakes, fetchReceivedHandshakes, getUserProfileAxiosRequest } from "@/_lib/dal";
import HandshakeCard from "@/_ui/handshake-card";
import PageHeader from "@/_ui/page-header";
import { Handshake } from '@/_lib/definitions';

export default function Page() {
  const [handshakes, setHandshakes] = useState<Handshake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHandshakes = async () => {

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


        const [initiated, received] = await Promise.all([
          fetchInitiatedHandshakes(username),
          fetchReceivedHandshakes(username),
        ]);

        const initiatedData = initiated.success ? initiated.data : [];
        const receivedData = received.success ? received.data : [];

        setHandshakes([...initiatedData, ...receivedData]);

        setHandshakes(
          [...initiatedData, ...receivedData].sort((a, b) => 
            new Date(b.signedDate).getTime() - new Date(a.signedDate).getTime()
          )
        );
        
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadHandshakes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen">
      <PageHeader
        title="Handshakes History"
        subTitle="All handshakes initiated and received"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-warning">{error}</p>}
      {handshakes.map((handshake) => (
        <HandshakeCard
          key={`${handshake.handshakeName}-${handshake.signedDate}`}
          {...handshake}
        />
      ))}
    </div>
  );
}
