import { useState } from 'react';
import {
  Button,
  Icon,
  Segment,
  Sidebar,
  SidebarPushable,
  SidebarPusher,
} from 'semantic-ui-react';

import FieldSelector from 'components/FieldSelector/FieldSelector';
import FormsContainer from 'components/FormsContainer/FormsContainer';
import Header from 'components/Header';

import 'views/Dashboard/styling.css';

function Dashboard() {
  const [showFieldSelector, setShowFieldSelector] = useState(false);

  const handleShowFieldSelector = () => setShowFieldSelector(true);
  const handleHideFieldSelector = () => setShowFieldSelector(false);

  return (
    <div className="dashboard-main-content">
      <Header branded />
      <SidebarPushable className="dashboard-sidbar-container" as={Segment}>
        <Sidebar
          className="dashboard-sidebar"
          as={Segment}
          animation="uncover"
          visible={showFieldSelector}
        >
          <FieldSelector onClose={handleHideFieldSelector} />
        </Sidebar>
        <SidebarPusher className="dashboard-pusher">
          <FormsContainer
            editMode={showFieldSelector}
            onEditForms={handleShowFieldSelector}
          />
        </SidebarPusher>
      </SidebarPushable>
    </div>
  );
}

const VerticalSpaceTesting = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Dashboard;
