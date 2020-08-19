import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { InitializeColorMode } from "../src/context/ColorMode";

export default function Document() {
  return (
    <Html dir="auto">
      <Head />
      <body>
        <InitializeColorMode />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.renderDocument = NextDocument.renderDocument;
Document.getInitialProps = NextDocument.getInitialProps;
