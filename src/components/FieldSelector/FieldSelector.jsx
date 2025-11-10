import { Button, Icon } from 'semantic-ui-react';
import Header from 'components/Header';

import 'components/FieldSelector/styling.css';

export default function FieldSelector({ onClose }) {
  return (
    <div className="field-selector-main">
      <Header center title="Field Selector">
        <Button basic icon color="black" size="mini" onClick={onClose}>
          <Icon name="close" />
        </Button>
      </Header>
      <div className="field-selector-list"></div>
    </div>
  );
}
