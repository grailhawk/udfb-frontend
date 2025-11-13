import { Dropdown } from 'semantic-ui-react';

import { CountryOptions } from 'components/Fields/CountrySelectField/options';
import { FieldTypesId } from 'components/Fields';

import { useDraggableField } from 'utils/hooks/useDraggableField';

function CountrySelectField({ id, lable }) {
  const { ref } = useDraggableField({
    id,
    type: FieldTypesId,
    fieldType: 'CountrySelectField',
  });

  return (
    <div ref={ref} className="input-field-container">
      <Dropdown fluid selection placeholder={lable} options={CountryOptions} />
    </div>
  );
}

export default CountrySelectField;
