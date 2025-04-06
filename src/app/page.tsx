
import {Text} from "@/components/Text"
export default function Home() {
  return (
    <Text children={[
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
      {
        type: "paragraph",
        children: [{ text: "text within a div"}]
      }
    ]}/>
  );
}
