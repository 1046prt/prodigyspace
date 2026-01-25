import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

/**
 * Standardized card with icon and title
 */
interface IconCardProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "hover-lift";
}

export function IconCard({
  icon: Icon,
  title,
  description,
  children,
  className = "",
  variant = "default",
}: IconCardProps) {
  const variantClasses = {
    default: "",
    gradient: "gradient-primary text-white",
    "hover-lift": "card-hover-lift",
  };

  return (
    <Card className={`${variantClasses[variant]} ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}

/**
 * Standardized feature card with coming soon badge
 */
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badgeColor?: string;
  badgeText?: string;
  onClick?: () => void;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badgeColor = "blue-badge",
  badgeText = "Coming Soon",
  onClick,
  className = "",
}: FeatureCardProps) {
  const isClickable = !!onClick;

  return (
    <Card
      className={`utilities-tool-card ${isClickable ? "cursor-pointer card-hover-lift" : ""} ${className}`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="icon-badge">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge className={badgeColor} variant="secondary">
                {badgeText}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>
    </Card>
  );
}

/**
 * Standardized button with icon
 */
interface IconButtonProps extends React.ComponentProps<typeof Button> {
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function IconButton({
  icon: Icon,
  children,
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <Button className={`flex items-center gap-2 ${className}`} {...props}>
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  );
}

/**
 * Progress indicator component
 */
interface ProgressIndicatorProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  variant?: "default" | "mood";
}

export function ProgressIndicator({
  value,
  max,
  label,
  showPercentage = true,
  className = "",
  variant = "default",
}: ProgressIndicatorProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const variantClasses = {
    default: "progress-bar-fill",
    mood: "gradient-mood-4",
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">{label}</span>
          {showPercentage && (
            <span className="text-sm text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="progress-bar">
        <div
          className={variantClasses[variant]}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">
        {value} / {max}
      </div>
    </div>
  );
}

/**
 * Quick stats grid component
 */
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend = "neutral",
  className = "",
}: StatCardProps) {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={`text-2xl font-bold ${trendColors[trend]}`}>{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="icon-badge">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * Quick action buttons grid
 */
interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  className?: string;
}

export function QuickAction({
  icon: Icon,
  label,
  onClick,
  variant = "default",
  className = "",
}: QuickActionProps) {
  const variantClasses = {
    default: "bg-muted hover:bg-muted/80",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <Button
      variant="ghost"
      className={`h-auto p-4 flex-col gap-2 ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}

/**
 * Empty state component
 */
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="icon-badge mx-auto mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
        {description}
      </p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

/**
 * Common page header component
 */
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`page-header ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}

/**
 * Loading skeleton component
 */
interface LoadingSkeletonProps {
  variant?: "text" | "card" | "button" | "avatar";
  className?: string;
}

export function LoadingSkeleton({
  variant = "text",
  className = "",
}: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-muted rounded";

  const variantClasses = {
    text: "h-4 w-full",
    card: "h-32 w-full",
    button: "h-10 w-24",
    avatar: "h-10 w-10 rounded-full",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}
