// Utility function used to save a json object to the users machine with the supplied file name.
export function downloadJSON(obj, filename) {
  let file = filename;
  if (filename === null) {
    file = 'data.json';
  }

  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file;
  link.click();
  URL.revokeObjectURL(url);
}
