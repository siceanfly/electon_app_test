document.getElementById('browseBtn').addEventListener('click', () => {
  window.electronAPI.openFileDialog();
});

window.electronAPI.onSelectedFolder((path) => {
  document.getElementById('scriptPath').value = path;
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const scriptPath = document.getElementById('scriptPath').value;
  window.electronAPI.saveScriptPath(scriptPath);
  alert(`Path saved: ${scriptPath}`);
});
