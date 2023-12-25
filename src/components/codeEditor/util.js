export function getModel(editor) {
  return editor.getModel();
}

export function getCode(editor) {
  return editor.getModel().getValue();
}

export function getCodeLength(editor) {
  // chars, including \n, \t !!!
  return editor.getModel().getValueLength();
}

export function getCursorPosition(editor) {
  let line = editor.getPosition().lineNumber;
  let column = editor.getPosition().column;
  return { ln: line, col: column };
}

export function setCursorPosition(editor, ln, col) {
  let pos = { lineNumber: ln, column: col };
  editor.setPosition(pos);
}

export function setFocus(editor) {
  editor.focus();
}
