import { useEffect, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

import Button from 'components/Button';
import Builder from 'components/FormsAndFieldsBuilder/Builder';
import Header from 'components/Header';
import Form from 'components/Forms';
import { CustomeUserFormTypeId, FormTypesId } from 'components/Fields';

import 'components/FormsContainer/styling.css';

export const CanvasItems = {
  controls: 'controls',
  forms: 'forms',
};

const CanvasControls = ({ top, left, onAddForms, onResetCanvas }) => {
  const controls = useRef(null);
  const handle = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = controls.current;
    const hl = handle.current;
    invariant(el);

    const stop = draggable({
      element: el,
      dragHandle: hl,
      getInitialData: () => ({
        type: CanvasItems.controls,
        id: CanvasItems.controls,
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });

    return () => stop();
  }, []);

  return (
    <div
      ref={controls}
      style={
        dragging
          ? {
              top: `${top}px`,
              left: `${left}px`,
              opacity: 0.0,
            }
          : { top: `${top}px`, left: `${left}px` }
      }
      className="forms-container-canvas-controls"
    >
      <Button
        description="Add New Form"
        icon="plus"
        onClick={() => {
          onAddForms();
        }}
      />
      <Button
        description="Reset Canvas"
        icon="redo"
        onClick={() => {
          onResetCanvas();
        }}
      ></Button>
    </div>
  );
};

const Canvas = ({
  children,
  onAddPredesginedForm,
  onMoveControls,
  onFormMove,
}) => {
  const canvas = useRef(null);
  const offsets = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;

    const stop = dropTargetForElements({
      element: el,
      canDrop: ({ source }) => {
        return (
          source.data?.type === CanvasItems.controls ||
          source.data?.type === CanvasItems.forms ||
          source.data?.type === FormTypesId
        );
      },
      onDragStart: ({ source, location }) => {
        const rect = source.element.getBoundingClientRect();
        const { clientX, clientY } = location.current.input;

        offsets.current = { x: clientX - rect.left, y: clientY - rect.top };
      },
      onDrop: ({ self, source, location }) => {
        // If the canvas is NOT the deepest drop target we can bail.
        if (location.current.dropTargets[0]?.element !== self.element) {
          // A child (e.g., Form) got the drop we don't also need handle it here
          return;
        }

        const rect = el.getBoundingClientRect();
        const { clientX, clientY } = location.current.input;

        // position relative to canvas
        const x = clientX - rect.left - offsets.current.x;
        const y = clientY - rect.top - offsets.current.y;

        const clampedX = Math.max(0, Math.min(x, rect.width - 1));
        const clampedY = Math.max(0, Math.min(y, rect.height - 1));

        if (source.data.id === CanvasItems.controls) {
          onMoveControls({ x: clampedX, y: clampedY });
        }

        if (source.data.type === CanvasItems.forms) {
          onFormMove({ id: source.data.id, x: clampedX, y: clampedY });
        }

        if (source.data.type === FormTypesId) {
          if (source.data.id == null) {
            onAddPredesginedForm(source.data);
          } else {
            onFormMove({ id: source.data.id, x: clampedX, y: clampedY });
          }
        }
      },
    });

    return () => stop();
  }, []);

  return (
    <div ref={canvas} className="forms-container-canvas">
      {children}
    </div>
  );
};

function FormsContainer({
  controls,
  editMode,
  forms,
  onAddForms,
  onEditForms,
  onFormMove,
  onFormResize,
  onMoveControls,
  onResetCanvas,
  onAddPredesginedForm,
  onAddFieldToFrom,
}) {
  const canvasControls = (
    <CanvasControls
      top={controls.y}
      left={controls.x}
      onAddForms={onAddForms}
      onResetCanvas={onResetCanvas}
    />
  );
  let renderControls = null;
  if (editMode) {
    renderControls = canvasControls;
  }

  let formComponents = [];
  Object.keys(forms).forEach((key) => {
    const form = forms[key];

    formComponents.push(
      <Form
        key={form.id}
        id={form.id}
        top={form.y}
        left={form.x}
        z={form.z}
        width={form.w}
        height={form.h}
        content={form.fields}
        stagnant={form.type !== CustomeUserFormTypeId}
        onResize={onFormResize}
        onAddField={onAddFieldToFrom}
      />
    );
  });

  return (
    <div className="form-container-main">
      <div className="forms-container-header">
        <Header
          controls="bottom"
          title="User Defined Form Builder Demo"
          description="This is a demo used to show off skills and understanding of React. It aims to build a drag and drop interface for creating user defined forms."
        >
          <Button
            description="Edit Canvas"
            icon="edit outline"
            onClick={onEditForms}
          />
        </Header>
      </div>
      <Canvas
        onAddPredesginedForm={onAddPredesginedForm}
        onMoveControls={onMoveControls}
        onFormMove={onFormMove}
      >
        {renderControls}
        {...formComponents}
      </Canvas>
    </div>
  );
}

export default FormsContainer;
