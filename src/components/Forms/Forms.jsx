import { useEffect, useRef, useState } from 'react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

import { CanvasItems } from 'components/FormsContainer/FormsContainer';
import Builder from 'components/FormsAndFieldsBuilder/Builder';
import { FieldTypesId, FormTypesId } from 'components/Fields';

import 'components/Forms/styling.css';

const FormFieldsList = ({ id, stagnant, content, onAddField }) => {
  const list = useRef(null);

  //const [fieldsInList, setFieldsInList] = useState({});

  useEffect(() => {
    const el = list.current;
    if (!el) return;

    const stop = dropTargetForElements({
      element: el,
      canDrop: ({ source }) => {
        if (stagnant) return false;
        const test =
          source.data?.type === FieldTypesId ||
          source.data?.type === FormTypesId;
        return test;
      },
      onDrop: ({ source, location }) => {
        if (!stagnant) {
          onAddField(id, source);
        }
      },
    });

    return () => stop();
  }, []);

  return (
    <div ref={list} className="udfb-form-fields">
      <Builder list={content || {}} />
    </div>
  );
};

function Form({
  id,
  stagnant,
  content,
  top,
  left,
  z,
  width,
  height,
  onAddField,
  onResize,
}) {
  const form = useRef(null);
  const handle = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = form.current;
    const hl = handle.current;
    invariant(el);

    const stop = draggable({
      element: el,
      dragHandle: hl,
      getInitialData: () => ({
        type: CanvasItems.forms,
        id,
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });

    return () => stop();
  }, []);

  const handleFormResize = (e, mode) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.currentTarget.setPointerCapture != null) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = width;
    const startH = height;

    const onMovePtr = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      let w = startW;
      let h = startH;
      if (mode === 'right' || mode === 'corner') w = startW + dx;
      if (mode === 'bottom' || mode === 'corner') h = startH + dy;

      const MIN_W = 300;
      const MIN_H = 60;
      w = Math.max(MIN_W, w);
      h = Math.max(MIN_H, h);

      if (onResize) {
        onResize(id, Math.round(w), Math.round(h));
      }
    };

    const onUpPtr = (ev) => {
      document.removeEventListener('pointermove', onMovePtr);
      document.removeEventListener('pointerup', onUpPtr, true);

      if (e.currentTarget?.releasePointerCapture != null) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    };

    document.addEventListener('pointermove', onMovePtr);
    document.addEventListener('pointerup', onUpPtr, true);
  };

  return (
    <div
      ref={form}
      style={
        dragging
          ? {
              top: `${top}px`,
              left: `${left}px`,
              zIndex: z,
              width: `${width}px`,
              height: `${height}px`,
            }
          : {
              top: `${top}px`,
              left: `${left}px`,
              zIndex: z,
              width: `${width}px`,
              height: `${height}px`,
            }
      }
      className="udfb-form"
    >
      <div ref={handle} className="udfb-form-drag-handle"></div>
      <div className="udfb-form-content">
        <div className="udfb-form-info">{id}</div>
        <FormFieldsList
          id={id}
          stagnant={stagnant}
          content={content}
          onAddField={onAddField}
        />
      </div>
      <div
        onPointerDown={(e) => handleFormResize(e, 'right')}
        data-resize-handle="true"
        className="udfb-from-right-edge"
      />
      <div
        onPointerDown={(e) => handleFormResize(e, 'bottom')}
        data-resize-handle="true"
        className="udfb-from-bottom-edge"
      />
      <div
        onPointerDown={(e) => handleFormResize(e, 'corner')}
        data-resize-handle="true"
        className="udfb-from-right-bottom-corner"
      />
    </div>
  );
}

export default Form;
