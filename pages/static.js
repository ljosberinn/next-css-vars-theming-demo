import { ColorModeSwitch } from "../src/components/ColorModeSwitch";

export default function Static({ built }) {
  return (
    <>
      <ColorModeSwitch />
      <hr />
      <h1>this site was built at {built}</h1>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      built: new Date().toISOString(),
    },
  };
}
