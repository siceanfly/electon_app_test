window.electronAPI.onUpdateScriptPath((path) => {
  document.getElementById('displayPath').textContent = path;
});
