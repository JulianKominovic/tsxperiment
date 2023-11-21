export type MessageStruct =
  | {
      type: "patch-ast-req";
      data: string;
    }
  | {
      type: "patch-ast-res";
      data: { code: string; duration: number };
    }
  | {
      type: "patch-ast-infinite-loop-req";
      data?: undefined;
    }
  | {
      type: "patch-ast-infinite-loop-res";
      data?: undefined;
    };
