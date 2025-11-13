import { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

import { FormTypesId } from 'components/Fields';

import { useDraggableField } from 'utils/hooks/useDraggableField';

function LoginForm({ id }) {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const { ref } = useDraggableField({
    id,
    type: FormTypesId,
    fieldType: 'LoginForm',
  });

  const handleChange = (e, { name, value }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div ref={ref} className="input-field-container">
      <Form onSubmit={handleSubmit}>
        <Form.Field
          control={Input}
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        <Form.Field
          control={Input}
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
