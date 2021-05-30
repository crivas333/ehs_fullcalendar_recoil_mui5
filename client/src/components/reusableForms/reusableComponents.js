import { experimentalStyled as styled } from "@material-ui/core/styles";

export const Span = styled("span", {
  shouldForwardProp: (prop) => prop !== "show",
})(({ theme, show }) => ({
  ...(show && {
    display: "none",
  }),
}));
