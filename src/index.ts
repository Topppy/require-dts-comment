import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

const createRule = ESLintUtils.RuleCreator(
  (name) => `https://example.com/rule/${name}`
);

type MessageIds = "missingTypescriptDocumentComments";

type Options = {
  TSInterfaceDeclaration?: boolean;
  TSPropertySignature?: boolean;
  TSCallSignatureDeclaration?: boolean;
  TSTypeAliasDeclaration?: boolean;
  TSDeclareKeyword?: boolean;
  TSIndexSignature?: boolean;
  TSMethodSignature?: boolean;
  TSConstructSignatureDeclaration?: boolean;
};

type CheckNode =
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSPropertySignature
  | TSESTree.TSCallSignatureDeclaration
  | TSESTree.TSDeclareKeyword
  | TSESTree.TSIndexSignature
  | TSESTree.TSMethodSignature
  | TSESTree.TSConstructSignatureDeclaration
  | TSESTree.TSTypeAliasDeclaration;

// Type: RuleModule<"uppercase", ...>
export const rule = createRule<[Options], MessageIds>({
  create(context, [options]) {
    const sourceCode = context.getSourceCode();

    const checkComments = (node: CheckNode) => {
      const beforeComment = sourceCode.getCommentsBefore(node);
      // console.log(beforeComment.length, "=====beforeComment", node.type);
      if (!beforeComment.length) {
        context.report({
          messageId: "missingTypescriptDocumentComments",
          node,
        });
      }
    };

    const optKeys: (keyof Options)[] = [
      "TSInterfaceDeclaration",
      "TSPropertySignature",
      "TSCallSignatureDeclaration",
      "TSTypeAliasDeclaration",
      "TSDeclareKeyword",
      "TSIndexSignature",
      "TSMethodSignature",
      "TSConstructSignatureDeclaration",
    ];

    const rulesHandler: { [k in keyof Options]: (n: CheckNode) => void } = {};
    // console.log(options, "====options");
    optKeys.forEach((ruleKey) => {
      if (options[ruleKey] === true) {
        rulesHandler[ruleKey] = checkComments;
      }
    });

    return rulesHandler;
  },
  name: "require-dts-comment",
  meta: {
    docs: {
      description: "Typescript types should have document comments.",
      recommended: "warn",
    },
    messages: {
      missingTypescriptDocumentComments:
        "Missing Typescript types document comments. ",
    },
    type: "suggestion",
    schema: [
      {
        type: "object",
        properties: {
          TSInterfaceDeclaration: {
            type: "boolean",
          },
          TSPropertySignature: {
            type: "boolean",
          },
          TSCallSignatureDeclaration: {
            type: "boolean",
          },
          TSTypeAliasDeclaration: {
            type: "boolean",
          },
          TSDeclareKeyword: {
            type: "boolean",
          },
          TSIndexSignature: {
            type: "boolean",
          },
          TSMethodSignature: {
            type: "boolean",
          },
          TSConstructSignatureDeclaration: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [
    {
      TSInterfaceDeclaration: true,
      TSPropertySignature: true,
      TSCallSignatureDeclaration: true,
      TSTypeAliasDeclaration: true,
      TSDeclareKeyword: true,
      TSIndexSignature: true,
      TSMethodSignature: true,
      TSConstructSignatureDeclaration: true,
    },
  ],
});

// export declare type Node =
//   | TSAbstractKeyword
//   | TSAbstractMethodDefinition
//   | TSAbstractPropertyDefinition
//   | TSAnyKeyword
//   | TSArrayType
//   | TSAsExpression
//   | TSAsyncKeyword
//   | TSBigIntKeyword
//   | TSBooleanKeyword
//   | TSCallSignatureDeclaration
//   | TSClassImplements
//   | TSConditionalType
//   | TSConstructorType
//   | TSConstructSignatureDeclaration
//   | TSDeclareFunction
//   | TSDeclareKeyword
//   | TSEmptyBodyFunctionExpression
//   | TSEnumDeclaration
//   | TSEnumMember
//   | TSExportAssignment
//   | TSExportKeyword
//   | TSExternalModuleReference
//   | TSFunctionType
//   | TSImportEqualsDeclaration
//   | TSImportType
//   | TSIndexedAccessType
//   | TSIndexSignature
//   | TSInferType
//   | TSInstantiationExpression
//   | TSInterfaceBody
//   | TSInterfaceDeclaration
//   | TSInterfaceHeritage
//   | TSIntersectionType
//   | TSIntrinsicKeyword
//   | TSLiteralType
//   | TSMappedType
//   | TSMethodSignature
//   | TSModuleBlock
//   | TSModuleDeclaration
//   | TSNamedTupleMember
//   | TSNamespaceExportDeclaration
//   | TSNeverKeyword
//   | TSNonNullExpression
//   | TSNullKeyword
//   | TSNumberKeyword
//   | TSObjectKeyword
//   | TSOptionalType
//   | TSParameterProperty
//   | TSPrivateKeyword
//   | TSPropertySignature
//   | TSProtectedKeyword
//   | TSPublicKeyword
//   | TSQualifiedName
//   | TSReadonlyKeyword
//   | TSRestType
//   | TSStaticKeyword
//   | TSStringKeyword
//   | TSSymbolKeyword
//   | TSTemplateLiteralType
//   | TSThisType
//   | TSTupleType
//   | TSTypeAliasDeclaration
//   | TSTypeAnnotation
//   | TSTypeAssertion
//   | TSTypeLiteral
//   | TSTypeOperator
//   | TSTypeParameter
//   | TSTypeParameterDeclaration
//   | TSTypeParameterInstantiation
//   | TSTypePredicate
//   | TSTypeQuery
//   | TSTypeReference
//   | TSUndefinedKeyword
//   | TSUnionType
//   | TSUnknownKeyword
//   | TSVoidKeyword
//   | UnaryExpression
//   | UpdateExpression
//   | VariableDeclaration
//   | VariableDeclarator
//   | WhileStatement
//   | WithStatement
//   | YieldExpression;
