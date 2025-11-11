import { Button, Icon } from 'semantic-ui-react';
import Header from 'components/Header';
import InputField from 'components/Fields/InputField';

import 'components/FieldSelector/styling.css';

const FieldSelectorItem = ({ children }) => {
  return <div className="field-selector-item">{children}</div>;
};

export default function FieldSelector({ onClose }) {
  return (
    <div className="field-selector-main">
      <Header center title="Field Selector">
        <Button basic icon color="black" size="mini" onClick={onClose}>
          <Icon name="close" />
        </Button>
      </Header>
      <div className="field-selector-list">
        <FieldSelectorItem>
          <InputField lable={'input field'} />
        </FieldSelectorItem>
      </div>
    </div>
  );
}
