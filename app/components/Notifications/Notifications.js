import React, { useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import classnames from 'classnames';
import NotificationsDemo from './notifications-demo/Notifications';
import MessagesDemo from './notifications-demo/Messages';
import ProgressDemo from './notifications-demo/Progress';

import s from './Notifications.module.scss';
import OrderProduct from './notifications-demo/OrderProduct';
// import useSocketIO from '../../libs/hooks/partner/socket';

const Notifications = props => {
  // const { ipfs } = useIpfsHttpClient();
  // const { socketIO, isSocketInit } = useSocketIO();
  const [notificationsTabSelected, setNotificationsTabSelected] = useState(0);

  const notificationsTab = useMemo(() => {
    switch (notificationsTabSelected) {
      case 0:
        return <OrderProduct/>;
      case 1:
        return <NotificationsDemo />;
      case 2:
        return <MessagesDemo />;
      case 3:
        return <ProgressDemo />;
      default:
        return <NotificationsDemo />;
    }
  }, [notificationsTabSelected]);

  // useEffect(() => {
  //   console.log('SocketIO', socketIO);
  // }, [isSocketInit]);

  /*
  useEffect(() => {

    async function connectSwarm() {
      try {
        await ipfs.pubsub.subscribe('TOPIC', msg => {
          console.log('Message', msg);
          console.log(new TextDecoder().decode(msg.data));
        });
      } catch (err) {
        console.error('Failed to subscribe', err);
      }

      const peers = await ipfs.pubsub.peers('TOPIC');
      console.log('peers', peers);
      await ipfs.pubsub.publish(
        'TOPIC',
        new TextEncoder().encode(`banana: ${new Date().getTime()}`),
      );
    }

    if (ipfs) {
      connectSwarm().then();
    }
  }, [ipfs]); */

  return (
    <section className={`${s.notifications} navbar-notifications`}>
      <header className={[s.cardHeader, 'card-header'].join(' ')}>
        <div className="text-center mb-sm">
          <strong>You have 13 notifications</strong>
        </div>
        <ButtonGroup className={s.notificationButtons}>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => setNotificationsTabSelected(0)}
            active={notificationsTabSelected === 0}
          >
            Product
          </Button>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => setNotificationsTabSelected(1)}
            active={notificationsTabSelected === 1}
          >
            Notifications
          </Button>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => setNotificationsTabSelected(2)}
            active={notificationsTabSelected === 2}
          >
            Messages
          </Button>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => setNotificationsTabSelected(3)}
            active={notificationsTabSelected === 3}
          >
            Progress
          </Button>
        </ButtonGroup>
      </header>
      {notificationsTab}
      <footer className={[s.cardFooter, 'text-sm', 'card-footer'].join(' ')}>
        <Button
          color="link"
          className={classnames(
            s.btnNotificationsReload,
            'btn-xs',
            'float-right',
            'py-0',
          )}
          id="load-notifications-btn"
        >
          <i className="la la-refresh" />
        </Button>
        <span className="fs-mini">Synced at: 21 Apr 2014 18:36</span>
      </footer>
    </section>
  );
};

Notifications.propTypes = {};

export default Notifications;
