import React from 'react';
import { BaseEditor, createEditor, Descendant, Transforms, Editor } from 'slate'
import { Editable, ReactEditor, RenderLeafProps, Slate, withReact } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { 
    text: string,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean
 }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}


const CustomEditor = {
    isBoldMarkActive(editor: BaseEditor & ReactEditor) {
      const marks = Editor.marks(editor);
      return marks ? marks.bold === true : false
    },
  
    toggleBoldMark(editor: BaseEditor & ReactEditor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      if (isActive) {
        Editor.removeMark(editor, 'bold')
      } else {
        Editor.addMark(editor, 'bold', true)
      }
    },
  }

interface TextProps {
    children: Descendant[];
}

const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  // Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  }
export const Text: React.FC<TextProps> = ({children}) => {
    const [editor] = React.useState(() => withReact(createEditor()))
    const renderLeaf = React.useCallback((props: RenderLeafProps) => {
        return <Leaf {...props} />
      }, []);
    return (
        <Slate editor={editor} initialValue={children}>
            <Editable 
            renderLeaf={renderLeaf}
            onKeyDown={event => {
                if(event.key === "Enter") {
                    event.preventDefault();
                    Transforms.insertNodes(editor, {text: "\n"})
                }
                if (!event.ctrlKey) {
                    return
                  }        
                    // When "B" is pressed, bold the text in the selection.
                    if(event.key==='b') {
                      event.preventDefault()
                      CustomEditor.toggleBoldMark(editor);
                    }
                  }
                }
            />
        </Slate>
    )
}