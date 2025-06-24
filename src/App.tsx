import { AutoLinkNode } from "@lexical/link";
import { AutoLinkPlugin, createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

const MATCHERS = [
  createLinkMatcherWithRegExp(/#\d{4,}/, (text: string) => `/#/segment1/segment2/${text.replace("#", "")}`),
];

function App() {
  const initialConfig = {
    editable: false,
    editorState: () => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      paragraph.append(
        $createTextNode("Check this out! #1234.Another thing..."),
      );
      root.append(paragraph);
    },
    namespace: "autolink-plugin-issue",
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [AutoLinkNode],
  };

  return (
    <div style={{ maxWidth: "400px", padding: "8px" }}>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable style={{ border: "1px solid gray", minHeight: "200px", padding: "0px 8px" }}
              aria-placeholder="Enter some text..."
              placeholder={<div>Enter some text...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoLinkPlugin matchers={MATCHERS} />
      </LexicalComposer>
    </div>
  );
}

export default App;
