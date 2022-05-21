function ignoreEvent(e) {
  e.preventDefault();
}

const handleLegacyDrag = {
  // needed on dragOver and dragEnter events to allow drop to work (because legacy web silliness)
  onDragEnter: ignoreEvent,
  onDragOver: ignoreEvent,
};

export default handleLegacyDrag;
