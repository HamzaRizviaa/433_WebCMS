import React from 'react';
import classes from './_sidebar.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as Share } from '../../assets/share.svg';
import { ReactComponent as Media } from '../../assets/media.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';

const Sidebar = () => {
  return (
    <span className={classes.main}>
      <div className={classes.navContainer}>
        <Logo className={classes.logo} />
        <Share className={classes.icon} />
        <Media className={classes.icon} />
      </div>

      <div className={classes.logoutContainer}>
        <Logout className={classes.icon} />
      </div>
    </span>
  );
};

export default Sidebar;

//231.68
