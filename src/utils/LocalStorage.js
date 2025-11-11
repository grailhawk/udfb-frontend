function getKnownFormsId(user) {
  return `udfb-${user}-known-forms`;
}

function getCanvasControlsId(user) {
  return `udfb-${user}-canvas-controls`;
}

export function saveDefinedForms(forms, user) {
  const strigifyForms = JSON.stringify(forms);
  localStorage.setItem(getKnownFormsId(user), strigifyForms);
}

export function loadDefinedForms(user) {
  const forms = localStorage.getItem(getKnownFormsId(user));
  return JSON.parse(forms);
}

export function saveCanvasControls(info, user) {
  const stringifyControls = JSON.stringify(info);
  localStorage.setItem(getCanvasControlsId(user), stringifyControls);
}

export function loadCanvasControls(user) {
  const controls = localStorage.getItem(getCanvasControlsId(user));
  return JSON.parse(controls);
}
