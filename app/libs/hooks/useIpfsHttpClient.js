import { useEffect, useState } from 'react';
import { create } from 'ipfs';

let ipfs = null;

export default function useIpfsHttpClient() {
  const [isIPFSInit, setIsIPFSInit] = useState({
    isInit: false,
    isError: false,
    error: null,
  });

  useEffect(() => {
    async function initIPFS() {
      try {
        console.time('IPFS Started');
        ipfs = await create({
          repo: (() => `repo-${new Date().getTime()}`)(),
          EXPERIMENTAL: {
            pubsub: true,
          },
          config: {
            Addresses: {
              Swarm: [
                '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
              ],
            },
          },
        });
        console.timeEnd('IPFS Started');
        console.log(await ipfs.id());
        setIsIPFSInit({
          isInit: true,
          isError: false,
          error: null,
        });
      } catch (error) {
        console.error('IPFS init error:', error);
        ipfs = null;
        setIsIPFSInit({
          isInit: true,
          isError: true,
          error,
        });
      }
    }

    if (ipfs === null) {
      initIPFS().then();
    }

    return function cleanup() {
      if (ipfs && ipfs.stop) {
        console.log('Stopping IPFS');
        ipfs.stop().catch(err => console.error(err));
        ipfs = null;
        setIsIPFSInit({
          isInit: false,
          isError: false,
          error: null,
        });
      }
    };
  }, []);

  return { ipfs };
}
