import { forwardRef } from "react";
import styles from "./Button.module.css";

function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * Primary outline button — same look as contact CTAs (mono, bordered, hover invert).
 * Use `as="a"` with `href` for links.
 */
const Button = forwardRef(function Button(
  { as: Component = "button", className, children, ...rest },
  ref
) {
  return (
    <Component ref={ref} className={cn(styles.button, className)} {...rest}>
      {children}
    </Component>
  );
});

export default Button;
