import { useColorMode } from "../context/ColorMode";
import { FaSun, FaMoon } from "react-icons/fa";

export function ColorModeSwitch() {
  const { colorMode, toggleColorMode, isLight } = useColorMode();

  return (
    <>
      <button onClick={toggleColorMode} type="button">
        {isLight ? <FaMoon /> : <FaSun />}
      </button>
      <hr />
      <h1>current color mode: {colorMode}</h1>
    </>
  );
}
