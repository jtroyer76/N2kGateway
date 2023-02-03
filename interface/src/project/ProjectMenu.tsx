import { FC } from 'react';

import { List } from '@mui/material';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import TvIcon from '@mui/icons-material/Tv';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DashBoardIcon from '@mui/icons-material/Dashboard';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';

import { PROJECT_PATH } from '../api/env';
import LayoutMenuItem from '../components/layout/LayoutMenuItem';

const ProjectMenu: FC = () => (
  <List>
    <LayoutMenuItem icon={DashBoardIcon} label="Dashboard" to={`/${PROJECT_PATH}/dashboard`} />    
    <LayoutMenuItem icon={DeviceHubIcon} label="NMEA2000" to={`/${PROJECT_PATH}/nmea2000`} />
    <LayoutMenuItem icon={SettingsInputCompositeIcon} label="NMEA0183" to={`/${PROJECT_PATH}/nmea0183`} />
    <LayoutMenuItem icon={TvIcon} label="Display" to={`/${PROJECT_PATH}/display`} />    
    {/* <LayoutMenuItem icon={SettingsRemoteIcon} label="Demo Project" to={`/${PROJECT_PATH}/demo`} /> */}
  </List>
);

export default ProjectMenu;

