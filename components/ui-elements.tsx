import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import "@/styles/ui-elements.css";

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
        <CardTitle className="icon-card-title">
          <Icon className="icon-md" />
          {title}
        </CardTitle>
        {description && <p className="icon-card-desc">{description}</p>}
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
      data-accent={badgeColor}
      onClick={onClick}
    >
      <CardHeader className="utilities-tool-card-header">
        <div className="utilities-tool-top">
          <div className="utilities-tool-icon">
            <Icon className="icon-md" />
          </div>
          <Badge className={`utilities-tool-badge ${badgeColor}`} variant="secondary">
            {badgeText}
          </Badge>
        </div>
        <CardTitle className="utilities-tool-title">{title}</CardTitle>
        <p className="utilities-tool-description">{description}</p>
      </CardHeader>
    </Card>
  );
}


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
    <Button className={`icon-button ${className}`} {...props}>
      <Icon className="icon-sm" />
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
    <div className={`progress-indicator ${className}`}>
      {label && (
        <div className="progress-header">
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
    <Card className={`stat-card ${className}`}>
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
            <Icon className="icon-md" />
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
    default: "variant-default",
    primary: "variant-primary",
    success: "variant-success",
    warning: "variant-warning",
    danger: "variant-danger",
  };

  return (
    <Button
      variant="ghost"
      className={`quick-action ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      <Icon className="icon-lg" />
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
    <div className={`empty-state ${className}`}>
      <div className="icon-badge mx-auto mb-4">
        <Icon className="icon-lg" />
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
      <div className="page-header-row">
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
