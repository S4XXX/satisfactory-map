export function getSlugColor(slugType: "PURPLE" | "GREEN" | "YELLOW") {
  switch (slugType) {
    case "GREEN":
      return "#08D1D8";
    case "YELLOW":
      return "#F9F903";
    case "PURPLE":
      return "#D100ED";
  }
}
