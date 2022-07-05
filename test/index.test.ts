import { ESLintUtils } from "@typescript-eslint/utils";
import { rule } from "../src/index";

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("my-rule", rule, {
  valid: [
    {
      code: `/** 属性 */
interface Props {
  /** visible */
  show: boolean
  /** age */
  age: number
  /** other properties */
  [k: string]: any
  /** method call */
  (someArg: number): boolean;
}
/** end */`,
    },
  ],
  invalid: [
    /* ... */
    {
      code: `interface Props {
  show: boolean
  /** tts音频url */
  children: number
}`,
      options: [{
        TSInterfaceDeclaration: false,
      }],
      errors: [
        {
          messageId: "missingTypescriptDocumentComments",
          line: 2,
          column: 3,
        },
      ],
    },
  ],
});
