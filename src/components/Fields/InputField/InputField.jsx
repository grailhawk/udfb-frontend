import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { Input } from 'semantic-ui-react';

import { FieldTypesId } from 'components/Fields';

import { useDraggableField } from 'utils/hooks/useDraggableField';

import 'components/Fields/styling.css';

function InputField({ id, lable }) {
  const { ref } = useDraggableField({
    id,
    type: FieldTypesId,
    fieldType: 'InputField',
  });

  return (
    <div ref={ref} className="input-field-container">
      <Input fluid placeholder={lable} />
    </div>
  );
}

export default InputField;
