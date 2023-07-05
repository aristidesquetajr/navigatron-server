import { ZodError } from "zod";

/**
 * translate ZodError to Message
 */
export function tzem(errors: ZodError) {
  return errors.issues
    .map((error) => {
      let path = error.path.toString();
      path = path.charAt(0).toUpperCase() + path.substring(1);

      return `${path} ${error.message}`;
    })
    .join(" and ");
}
