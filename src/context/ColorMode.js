import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const ColorModeContext = createContext();

const LIGHT = "light";
const DARK = "dark";

export function useColorMode() {
  const ctx = useContext(ColorModeContext);

  if (!ctx) {
    throw new Error("[useColorMode] used outside of ColorModeProvider");
  }

  return ctx;
}

const STORAGE_KEY = "colorMode";
const BODY_CLASS_DARK = `color-mode-${DARK}`;
const BODY_CLASS_LIGHT = `color-mode-${LIGHT}`;

const changeBodyClass = (mode) => {
  const nextIsLight = mode === LIGHT;
  const classToReplace = nextIsLight ? BODY_CLASS_DARK : BODY_CLASS_LIGHT;
  const newClass = nextIsLight ? BODY_CLASS_LIGHT : BODY_CLASS_DARK;

  document.body.classList.replace(classToReplace, newClass);
};

const securelyPersistColorMode = (mode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    console.error(error);
  }
};

const map = {
  [LIGHT]: {
    "--body-bg-color": "lightgray",
    "--heading-1-color": "purple",
  },
  [DARK]: {
    "--body-bg-color": "cadetblue",
    "--heading-1-color": "pink",
  },
};

const swapCSSVariables = (mode) => {
  const variables = map[mode];

  Object.entries(variables).forEach(([variable, color]) => {
    document.documentElement.style.setProperty(variable, color);
  });
};

export function InitializeColorMode() {
  const script = `
  try {
    const colorMode = localStorage.getItem('${STORAGE_KEY}');

    if(colorMode) {
      document.body.classList.add(colorMode === '${DARK}' ? '${BODY_CLASS_DARK}' : '${BODY_CLASS_LIGHT}')
    }
  } catch {
    document.body.classList.add('${BODY_CLASS_LIGHT}')
  }
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export function ColorModeProvider({ children }) {
  const [colorMode, setColorMode] = useState(() => {
    if (typeof document !== "undefined") {
      return document.body.classList.contains(BODY_CLASS_DARK) ? DARK : LIGHT;
    }

    return LIGHT;
  });

  console.log({ colorMode });

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => (prev === LIGHT ? DARK : LIGHT));
  }, []);

  useEffect(() => {
    securelyPersistColorMode(colorMode);
    changeBodyClass(colorMode);
    swapCSSVariables(colorMode);
  }, [colorMode]);

  const value = {
    toggleColorMode,
    colorMode,
    isLight: colorMode === LIGHT,
    isDark: colorMode === DARK,
  };

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}
