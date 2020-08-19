import Link from "next/link";
import { ColorModeProvider } from "../src/context/ColorMode";
import "../src/assets/app.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <ColorModeProvider>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>index</a>
            </Link>
          </li>
          <li>
            <Link href="/ssr">
              <a>ssr</a>
            </Link>
          </li>
          <li>
            <Link href="/static">
              <a>static</a>
            </Link>
          </li>
        </ul>
      </nav>
      <Component {...pageProps} />
    </ColorModeProvider>
  );
}
