import { FC } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import DemoProject from './DemoProject';
import DisplaySettingsForm from './Display/DisplaySettingsForm';

const ProjectRouting: FC = () => {
  return (
    <Routes>
      {
        // Add the default route for your project below
      }
      <Route path="/*" element={<Navigate to="display/*" />} />
      {
        // Add your project page routes below.
      }
      <Route path="display/*" element={<DisplaySettingsForm />} />
      <Route path="demo/*" element={<DemoProject />} />
    </Routes>
  );
};

export default ProjectRouting;
