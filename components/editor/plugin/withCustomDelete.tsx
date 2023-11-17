import { Editor, Transforms, Node, Element } from 'slate'
import { ReactEditor } from 'slate-react'

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const WithCustomDelete = (editor: ReactEditor) => {
  const { deleteBackward } = editor

  editor.deleteBackward = () => {
    ReactEditor.focus(editor)
    const { selection } = editor

    const [match] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && Element.isElement(n) &&LIST_TYPES.includes(n.type as string)
    })

    if (!!match && selection?.anchor.offset == 0) {
        // TODO table delete event
        console.log('toggle paragraph');
    } else {
      deleteBackward('character')
    }
  }

  return editor
}
export default WithCustomDelete
