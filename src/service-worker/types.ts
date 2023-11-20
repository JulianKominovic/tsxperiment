export type MessageStruct =
  | {
      type: "patch-ast-req";
      data: string;
    }
  | {
      type: "patch-ast-res";
      data: string;
    };
