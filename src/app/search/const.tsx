export const oneWayStepItems = [
  {
    title: "Chọn vé đi",
    status: "process" as const,
  },
  {
    title: "Thanh toán",
    status: "wait" as const,
  },
];

export const returnStepItems = [
  {
    title: "Chọn vé đi",
    status: "process" as const,
  },
  {
    title: "Chọn vé về",
    status: "wait" as const,
  },
  {
    title: "Thanh toán",
    status: "wait" as const,
  },
];
