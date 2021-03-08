import { useEffect, useState } from 'react';
import IpfsHttpClient from 'ipfs-http-client';

export default function useIpfsHttpClient() {
  const [ipfs, setIpfs] = useState(null);
  useEffect(() => {
    if (ipfs === null) {
      setIpfs(new IpfsHttpClient('/ip4/127.0.0.1/tcp/4003'));
    }
  }, []);

  return { ipfs };
}
