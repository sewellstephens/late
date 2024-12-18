import { focusEditorEdge, isEditorFocused } from '@sewell_stephens/slate-react';

import type { LateEditor } from '../../editor/LateEditor';

import { createLateEditor } from '../../../react';

// Mock the slate-react functions
jest.mock('@sewell_stephens/slate-react', () => ({
  focusEditorEdge: jest.fn(),
  isEditorFocused: jest.fn(),
}));

describe('ReactPlugin', () => {
  let editor: LateEditor;

  beforeEach(() => {
    editor = createLateEditor();

    // Reset mocks
    (isEditorFocused as jest.Mock).mockReset();
    (focusEditorEdge as jest.Mock).mockReset();
  });

  it('should override reset method', () => {
    // Mock isEditorFocused to return true
    (isEditorFocused as jest.Mock).mockReturnValue(true);

    editor.api.reset();

    expect(focusEditorEdge).toHaveBeenCalledWith(editor, { edge: 'start' });
  });

  it('should not focus editor if it was not focused before reset', () => {
    // Mock isEditorFocused to return false
    (isEditorFocused as jest.Mock).mockReturnValue(false);

    editor.api.reset();

    expect(focusEditorEdge).not.toHaveBeenCalled();
  });
});
