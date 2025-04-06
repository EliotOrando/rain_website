
import {Text} from "@/components/Text"
export default function Home() {
  return (
    <Text children={[
        {
          type: 'paragraph',
          children: [{ text: 'WIPS page' }],
        },
        {
          type: "paragraph",
          children: [{ text: "text within a div"}]
        }
      ]}/>
  );
}
