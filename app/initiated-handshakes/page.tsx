'use client';

import { useEffect, useState } from 'react';
import { fetchInitiatedHandshakes } from "@/_lib/dal";
import HandshakeCard from "@/_ui/handshake-card";
import PageHeader from "@/_ui/page-header";
import { Handshake } from '@/_lib/definitions';

export default function Page() {
  const [handshakes, setHandshakes] = useState<Handshake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHandshakes = async () => {
      const username = sessionStorage.getItem("username");

      if (!username) {
        setError("No username found in session storage.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetchInitiatedHandshakes(username);
        if (response.success) {
          setHandshakes(response.data);
        } else {
          setError(response.error || "Failed to fetch handshakes.");
        }
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
