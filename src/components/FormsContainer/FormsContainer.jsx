import { Button, Icon } from 'semantic-ui-react';
import Header from 'components/Header';
import 'components/FormsContainer/styling.css';

function FormsContainer({ editMode, onAddForms, onEditForms }) {
  let canvusControls = null;
  if (editMode) {
    canvusControls = (
      <div className="forms-container-canvus-controls">
        <Button
          basic
          icon
          color="blue"
          size="mini"
          onClick={() => {
            onEditForms();
            onAddForms();
          }}
        >
          <Icon name="plus" />
        </Button>
      </div>
    );
  }
  return (
    <div className="form-container-main">
      <div className="forms-container-header">
        <Header
          controls="bottom"
          title="User Defined From Builder Demo"
          description="This is a demo used to show off skills and understanding of React. It aims to build a drag and drop interface for creating user defined forms."
        >
          <Button basic icon color="blue" size="mini" onClick={onEditForms}>
            <Icon name="edit outline" />
          </Button>
        </Header>
      </div>
      <div className="forms-container-canvus">{canvusControls}</div>
    </div>
  );
}

export default FormsContainer;
