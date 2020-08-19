import { ColorModeSwitch } from "../src/components/ColorModeSwitch";

export default function SSR({ generated }) {
  return (
    <>
      <ColorModeSwitch />
      <hr />
      <h1>this site was generated at {generated}</h1>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: {
      generated: new Date().toISOString(),
    },
  };
}
