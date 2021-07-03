import React, {
  lazy,
  Suspense
} from 'react';
import Spin from 'antd/lib/spin';
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
faBell as bell,
faEnvelope as message
} from '@fortawesome/free-solid-svg-icons';
import emptyBellIcon from './emptyBell.svg';
import './Navbar.css';

const mapNotification = (p) => {
    const avatarElement = <FontAwesomeIcon icon={message} />;
    return {
      id: p.id,
      avatar: avatarElement,
      link: p.link,
      title: p.text,
      description: p.text,
      type: 'Message',
      clickClose: false,
      read: p.read
   }
}

const Notifications = (props) => {

  const {
    notifications,
    clearFn,
    markRead,
  } = props;

  const onItemClick = (item, tabProps) => {
    const notification = {
      id: item.id,
      type: item.type,
      text: item.title,
      link: item.link,
      read: true
    };
    markRead(notification);
  }

  const mappedNotifications = notifications.map(p => mapNotification(p));
  const notificationsCount = mappedNotifications.filter(p => !p.read).length;

  return (
  <Suspense fallback={<Spin />}>
    <div role="button" aria-label="Notifications">
      <NoticeIcon
        bell={
        <FontAwesomeIcon
          icon={bell}
          size='lg'
          color="rgba(0,0,0,.65)"
        />
        }
        count={notificationsCount}
        onItemClick={onItemClick}
        onClear={clearFn}
        popupAlign={{ offset: [20, -16] }}
      >
        <NoticeIcon.Tab
          list={mappedNotifications}
          title="Notifications"
          emptyImage={emptyBellIcon}
          emptyText="You have no unread notifications."
        />
      </NoticeIcon>
    </div>
  </Suspense>
  );
}

export default Notifications;
