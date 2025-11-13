import { useEffect, useState } from 'react';
import {
  Segment,
  Sidebar,
  SidebarPushable,
  SidebarPusher,
} from 'semantic-ui-react';

import FieldSelector from 'components/FieldSelector/FieldSelector';
import FormsContainer from 'components/FormsContainer/FormsContainer';
import { CustomeUserFormTypeId } from 'components/Fields';
import Header from 'components/Header';

import {
  loadCanvasControls,
  saveCanvasControls,
  loadDefinedForms,
  saveDefinedForms,
} from 'utils/LocalStorage';

import 'views/Dashboard/styling.css';

function Dashboard() {
  const [showFieldSelector, setShowFieldSelector] = useState(false);
  const [canvasControls, setCanvasControls] = useState({ x: 5, y: 5 });
  const [formsInCanvas, setFormsInCanvas] = useState({});

  // Evernt Hanlers
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

      // We always want the moved form to be the closet to the user
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

      // We always want the moved form to be the closet to the user
      Object.keys(newForms).forEach((key) => {
        newForms[key].z = 9;
      });

      newForms[id] = { ...form, w, h, z: 10 };

      saveDefinedForms(newForms);
      return newForms;
    });
  };
  const handleAddFrom = (oldForms, type, fields) => {
    const newForms = { ...oldForms };

    // We always want the new form to be the closet to the user
    Object.keys(newForms).forEach((key) => {
      newForms[key].z = 9;
    });

    const uuid = crypto.randomUUID();
    const f = fields || {};
    newForms[uuid] = {
      id: uuid,
      fields: f,
      type,
      x: 5,
      y: 45,
      z: 10,
      w: 400,
      h: 100,
    };

    saveDefinedForms(newForms);
    return newForms;
  };
  const handleAddCustomForm = () => {
    setFormsInCanvas((prev) => handleAddFrom(prev, CustomeUserFormTypeId));
  };
  const handleAddPredesginedForm = ({ fieldType }) => {
    const uuid = crypto.randomUUID();
    const fields = { [uuid]: { id: uuid, type: fieldType } };
    setFormsInCanvas((prev) => handleAddFrom(prev, fieldType, fields));
  };
  const handleResetCanvas = () => {
    setFormsInCanvas((oldForms) => {
      saveDefinedForms({});
      return {};
    });
  };
  const handleAddFieldToFrom = (id, info) => {
    setFormsInCanvas((oldForms) => {
      const form = oldForms[id];
      const fields = { ...form.fields };
      const uuid = crypto.randomUUID();
      fields[uuid] = {
        id: uuid,
        type: info.data.fieldType,
      };

      const newForms = { ...oldForms };

      // We always want the last touched form to be the closet to the user
      Object.keys(newForms).forEach((key) => {
        newForms[key].z = 9;
      });

      newForms[id].fields = fields;

      saveDefinedForms(newForms);
      return newForms;
    });
  };

  /**
   * This effect is used to load the configuration stored in local storage, that saves the state of the canvas for the user.
   */
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
          width={'wide'}
          visible={showFieldSelector}
        >
          <FieldSelector onClose={handleHideFieldSelector} />
        </Sidebar>
        <SidebarPusher className="dashboard-pusher">
          <FormsContainer
            controls={canvasControls}
            forms={formsInCanvas}
            editMode={showFieldSelector}
            onAddForms={handleAddCustomForm}
            onEditForms={handleShowFieldSelector}
            onMoveControls={handleMoveCanvasControles}
            onFormMove={handleMoveForm}
            onFormResize={handleFormResize}
            onResetCanvas={handleResetCanvas}
            onAddPredesginedForm={handleAddPredesginedForm}
            onAddFieldToFrom={handleAddFieldToFrom}
          />
        </SidebarPusher>
      </SidebarPushable>
    </div>
  );
}

export default Dashboard;
