import { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

import { Input } from 'semantic-ui-react';

import { FieldTypes } from 'components/Fields/util';

import 'components/Fields/styling.css';

function InputField({ id, lable, description }) {
  const field = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = field.current;
    invariant(el);

    const stop = draggable({
      element: el,
      getInitialData: () => ({
        type: FieldTypes.generic,
        fieldType: FieldTypes.input,
        id,
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });

    return () => stop();
  }, []);

  return (
    <div ref={field} className="input-field-container">
      <Input fluid placeholder={lable} />
    </div>
  );
}

export default InputField;
