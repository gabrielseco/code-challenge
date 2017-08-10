export default {
  addEventsToDocument(eventMap) {
    Object.keys(eventMap).forEach(key => {
      document.addEventListener(key, eventMap[key], false);
    });
  },

  getRandom(min, max) {
    return Math.floor(Math.random() * max) + min;
  },

  removeEventsFromDocument(eventMap) {
    Object.keys(eventMap).forEach(key => {
      document.removeEventListener(key, eventMap[key], false);
    });
  },

  targetIsDescendant(event, parent) {
    let node = event.target;
    while (node !== null) {
      if (node === parent) return true;
      node = node.parentNode;
    }
    return false;
  },
};
