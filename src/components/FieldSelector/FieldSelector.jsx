import { Button, Icon, TabPane, Tab } from 'semantic-ui-react';
import Header from 'components/Header';
import {
  CustomeUserFormTypeId,
  registryForFields,
  registryForForms,
} from 'components/Fields';

import 'components/FieldSelector/styling.css';

const FieldSelectorItem = ({ children }) => {
  return <div className="field-selector-item">{children}</div>;
};

const FieldSelectorTab = () => {
  const fields = [];

  Object.keys(registryForFields).forEach((key) => {
    const Component = registryForFields[key];
    if (Component) {
      fields.push(
        <FieldSelectorItem>
          <Component lable={key} />
        </FieldSelectorItem>
      );
    }
  });

  return (
    <TabPane>
      <div className="field-selector-list">{...fields}</div>
    </TabPane>
  );
};

const FormsSelectorTab = () => {
  const forms = [];

  Object.keys(registryForForms).forEach((key) => {
    const Component = registryForForms[key];
    if (Component) {
      forms.push(
        <FieldSelectorItem>
          <Component lable={key} />
        </FieldSelectorItem>
      );
    }
  });

  return (
    <TabPane>
      <div className="field-selector-list">{...forms}</div>
    </TabPane>
  );
};

const panes = [
  { menuItem: 'Forms', render: FormsSelectorTab },
  { menuItem: 'Fields', render: FieldSelectorTab },
];
export default function FieldSelector({ onClose }) {
  return (
    <div className="field-selector-main">
      <Header center title="Field Selector">
        <Button basic icon color="black" size="mini" onClick={onClose}>
          <Icon name="close" />
        </Button>
      </Header>
      <Tab panes={panes} />
    </div>
  );
}
