import "react-hook-form";

declare module "react-hook-form" {
  interface RegisterOptions {
    type?: "custom" | "manual" | "value" | "onBlur" | "onChange" | "required" | "min" | "max" | "maxLength" | "minLength" | "validate" | "pattern" | "valueAsNumber" | "valueAsDate";
  }
}