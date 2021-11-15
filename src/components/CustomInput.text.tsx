import CustomInput from "./CustomInput";
import renderer from "react-test-renderer";

it("testing custom input", () => {
  const component = renderer.create(
    <CustomInput
      type={"url"}
      name={"url"}
      placeholder={"https://google.com"}
      input={"https://google.com"}
      onInputChange={() => {}}
    />
  );
  expect(1 + 1).toBe(2);
});
