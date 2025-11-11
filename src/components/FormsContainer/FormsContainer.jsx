import { useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

import Header from 'components/Header';
import Form from 'components/Forms';
import 'components/FormsContainer/styling.css';

export const CanvasItems = {
  controls: 'controls',
  forms: 'forms',
};

const CanvasControls = ({ top, left, onAddForms, onEditForms }) => {
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
          ? { top: `${top}px`, left: `${left}px`, opacity: 0.0 }
          : { top: `${top}px`, left: `${left}px` }
      }
      className="forms-container-canvas-controls"
    >
      <Button
        basic
        icon
        color="blue"
        size="mini"
        onClick={() => {
          onEditForms();
          onAddForms();
        }}
      >
        <Icon name="plus" />
      </Button>
    </div>
  );
};

const Canvas = ({ children, onMoveControls, onFormMove }) => {
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
          source.data?.type === CanvasItems.forms
        );
      },
      onDragStart: ({ source, location }) => {
        const rect = source.element.getBoundingClientRect();
        const { clientX, clientY } = location.current.input;

        offsets.current = { x: clientX - rect.left, y: clientY - rect.top };
      },
      onDrop: ({ source, location }) => {
        const rect = el.getBoundingClientRect();
        const { clientX, clientY } = location.current.input;

        // position relative to canvas, minus the "grab point" offset
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
}) {
  const canvasControls = (
    <CanvasControls
      top={controls.y}
      left={controls.x}
      onAddForms={onAddForms}
      onEditForms={onEditForms}
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
        onResize={onFormResize}
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
          <Button basic icon color="blue" size="mini" onClick={onEditForms}>
            <Icon name="edit outline" />
          </Button>
        </Header>
      </div>
      <Canvas onMoveControls={onMoveControls} onFormMove={onFormMove}>
        {renderControls}
        {...formComponents}
      </Canvas>
    </div>
  );
}

export default FormsContainer;
