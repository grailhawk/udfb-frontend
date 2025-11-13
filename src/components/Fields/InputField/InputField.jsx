import { Input } from 'semantic-ui-react';

import { FieldTypesId } from 'components/Fields';

import { useDraggableField } from 'utils/hooks/useDraggableField';

import 'components/Fields/styling.css';

function InputField({ id, label }) {
  const { ref } = useDraggableField({
    id,
    type: FieldTypesId,
    fieldType: 'InputField',
  });

  return (
    <div ref={ref} className="input-field-container">
      <Input fluid placeholder={label} />
    </div>
  );
}

export default InputField;
