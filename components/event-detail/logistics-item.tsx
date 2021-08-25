import { NextPage } from 'next';

import classes from './logistics-item.module.css';

const LogisticsItem: NextPage<{ icon }> = ({ icon: Icon, children }) => (
  <li className={classes.item}>
    <span className={classes.icon}>
      <Icon />
    </span>
    <span className={classes.content}>{children}</span>
  </li>
);

export default LogisticsItem;
