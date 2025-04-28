interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

export default function Button({
  size = "md",
  variant = "default",
  color = "primary",
  startIcon,
  endIcon,
  fullWidth = false,
  loading = false,
  disabled = false,
  tooltip,
  tooltipPosition = "top",
  className = "",
  children,
  ...rest
}: Props) {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const fullWidthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled || loading ? "btn-disabled" : "";
  const loadingClass = loading ? "loading" : "";

  let variantClass = "";

  switch (variant) {
    case "default":
      variantClass = `btn-${color}`;
      break;
    case "soft":
      variantClass = `btn-soft btn-${color}`;
      break;
    case "outline":
      variantClass = `btn-outline btn-${color}`;
      break;
    case "dashed":
      variantClass = `btn-outline btn-${color} border-dashed`;
      break;
    case "ghost":
      variantClass = `btn-ghost btn-${color}`;
      break;
    default:
      variantClass = `btn-${color}`;
  }

  const hasContent = !!children;

  const finalClass = [
    "btn",
    sizeClass,
    variantClass,
    fullWidthClass,
    disabledClass,
    loadingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const tooltipWrapperClass = tooltip
    ? `tooltip tooltip-${tooltipPosition}`
    : "";

  return (
    <div className={tooltipWrapperClass} data-tip={tooltip}>
      <button
        className={finalClass}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <span className="loading loading-spinner mr-2" />}
        {startIcon && (
          <span
            className={
              hasContent
                ? "mr-2"
                : "m-0 flex items-center justify-center"
            }
          >
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    </div>
  );
}
