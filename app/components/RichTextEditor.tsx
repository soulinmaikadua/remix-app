import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import the Quill theme

interface RichTextEditorProps {
  value: string; // Initial value of the editor
  onChange: (value: string) => void; // Function to update the parent component's state
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const quillRef = useRef<Quill | null>(null); // Ref to store the Quill instance
  const editorRef = useRef<HTMLDivElement | null>(null); // Ref to the DOM element where Quill will mount

  useEffect(() => {
    // Ensure this runs only in the browser and initializes Quill once
    if (typeof window !== "undefined" && editorRef.current && !quillRef.current) {
      // Initialize Quill
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow", // Use the "snow" theme
      });

      // Listen for content changes and update the parent state
      quillRef.current.on("text-change", () => {
        const html = editorRef.current?.querySelector(".ql-editor")?.innerHTML || "";
        onChange(html); // Pass the updated content back to the parent component
      });

      // Set the initial content of the editor
      if (value) {
        quillRef.current.root.innerHTML = value;
      }
    }

    // Cleanup: Destroy the Quill instance if the component unmounts
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [value, onChange]);

  return <div ref={editorRef} />; // Render the editor container
}
