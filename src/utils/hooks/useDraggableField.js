import { useEffect, useRef, useState, useMemo } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

/**
 * Reusable drag hook for form fields.
 *
 * @param {object} opts
 * @param {string|number} opts.id - Unique instance id of the field.
 * @param {string} opts.fieldType - Stable field type string (e.g., "CountrySelectField").
 * @param {string} [opts.type] - Top-level DnD type/channel (e.g., FieldTypesId).
 * @param {() => object} [opts.getExtraData] - Optional function to add extra data to the drag payload.
 * @param {() => void} [opts.onDragStart] - Optional callback when dragging starts.
 * @param {() => void} [opts.onDrop] - Optional callback when drag ends.
 */

export function useDraggableField({
  id,
  fieldType,
  type,
  getExtraData,
  onDragStart,
  onDrop,
}) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  // Keep a stable payload builder
  const getInitialData = useMemo(() => {
    return () => ({
      ...(type ? { type } : null),
      fieldType,
      id,
      ...(typeof getExtraData === 'function' ? getExtraData() : null),
    });
  }, [id, fieldType, type, getExtraData]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const stop = draggable({
      element: el,
      getInitialData,
      onDragStart: () => {
        setDragging(true);
        if (onDragStart != null) {
          onDragStart();
        }
      },
      onDrop: () => {
        setDragging(false);
        if (onDragStart != null) {
          onDrop();
        }
      },
    });

    return () => stop();
  }, [getInitialData, onDragStart, onDrop]);

  return { ref, dragging };
}
