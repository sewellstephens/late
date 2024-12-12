import { focusEditorEdge, isEditorFocused } from '@sewellstephens/slate-react';

import type { PlateEditor } from '../../editor/PlateEditor';

import { createPlateEditor } from '../../../react';

// Mock the slate-react functions
jest.mock('@sewellstephens/slate-react', () => ({
  focusEditorEdge: jest.fn(),
  isEditorFocused: jest.fn(),
}));

describe('ReactPlugin', () => {
  let editor: PlateEditor;

  beforeEach(() => {
    editor = createPlateEditor();

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
