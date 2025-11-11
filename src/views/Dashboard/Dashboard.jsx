import { useEffect, useState } from 'react';
import {
  Segment,
  Sidebar,
  SidebarPushable,
  SidebarPusher,
} from 'semantic-ui-react';

import FieldSelector from 'components/FieldSelector/FieldSelector';
import FormsContainer from 'components/FormsContainer/FormsContainer';
import Header from 'components/Header';
import {
  loadCanvasControls,
  saveCanvasControls,
  saveDefinedForms,
} from 'utils/LocalStorage';

import 'views/Dashboard/styling.css';
import { loadDefinedForms } from '../../utils/LocalStorage';

function Dashboard() {
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [canvasControls, setCanvasControls] = useState({ x: 5, y: 5 });
  const [formsInCanvas, setFormsInCanvas] = useState({});

  const handleShowFieldSelector = () => setShowFieldSelector(true);
  const handleHideFieldSelector = () => setShowFieldSelector(false);
  const handleMoveCanvasControles = ({ x, y }) => {
    saveCanvasControls({ x, y });
    setCanvasControls({ x, y });
  };
  const handleMoveForm = ({ id, x, y }) => {
    setFormsInCanvas((oldForms) => {
      const form = oldForms[id];
      const newForms = { ...oldForms };

      // We always wont the moved form to be the closet to the user
      Object.keys(newForms).forEach((key) => {
        newForms[key].z = 9;
      });

      newForms[id] = { ...form, x, y, z: 10 };

      saveDefinedForms(newForms);
      return newForms;
    });
  };
  const handleFormResize = (id, w, h) => {
    setFormsInCanvas((oldForms) => {
      const form = oldForms[id];
      const newForms = { ...oldForms };

      // We always wont the moved form to be the closet to the user
      Object.keys(newForms).forEach((key) => {
        newForms[key].z = 9;
      });

      newForms[id] = { ...form, w, h, z: 10 };

      saveDefinedForms(newForms);
      return newForms;
    });
  };
  const handleAddFormToCanvas = () => {
    setFormsInCanvas((oldForms) => {
      const newForms = { ...oldForms };

      // We always wont the new form to be the closet to the user
      Object.keys(newForms).forEach((key) => {
        newForms[key].z = 9;
      });

      const uuid = crypto.randomUUID();
      newForms[uuid] = { id: uuid, x: 0, y: 0, z: 10, w: 400, h: 100 };

      return newForms;
    });
  };

  useEffect(() => {
    const controls = loadCanvasControls();
    if (controls != null) {
      setCanvasControls(controls);
    }

    const forms = loadDefinedForms();
    if (forms != null) {
      setFormsInCanvas(forms);
    }
  }, []);

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
            controls={canvasControls}
            forms={formsInCanvas}
            editMode={showFieldSelector}
            onAddForms={handleAddFormToCanvas}
            onEditForms={handleShowFieldSelector}
            onMoveControls={handleMoveCanvasControles}
            onFormMove={handleMoveForm}
            onFormResize={handleFormResize}
          />
        </SidebarPusher>
      </SidebarPushable>
    </div>
  );
}

export default Dashboard;
