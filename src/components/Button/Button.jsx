import { Button, Icon, Popup } from 'semantic-ui-react';

// Simple button component to easily apply tool tips to button
function UDFBButton({ description, icon, onClick }) {
  const triggerButton = (
    <Button
      basic
      icon
      color="blue"
      size="mini"
      onClick={() => {
        onClick();
      }}
    >
      <Icon name={icon} />
    </Button>
  );

  return <Popup content={description} trigger={triggerButton} />;
}

export default UDFBButton;
