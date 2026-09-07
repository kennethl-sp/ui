import type { VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { AnimatePresence, type MotionProps, motion } from "motion/react";
import type * as React from "react";
import { useMultiStepForm } from "../hooks/use-multi-step-viewer.js";
import { Button, type buttonVariants } from "../primitives/button.js";
import { Progress } from "../primitives/progress.js";

const NextButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  const { isLastStep, goToNext } = useMultiStepForm();
  if (isLastStep) return null;
  return (
    <Button size="sm" type="button" onClick={() => goToNext()} {...props} />
  );
};

const PreviousButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  const { isFirstStep, goToPrevious } = useMultiStepForm();
  if (isFirstStep) return null;
  return (
    <Button
      size="sm"
      type="button"
      variant="outline"
      onClick={() => goToPrevious()}
      {...props}
    />
  );
};

const SubmitButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  const { isLastStep } = useMultiStepForm();
  if (!isLastStep) return null;
  return <Button size="sm" type="button" {...props} />;
};

const ResetButton = (
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    },
) => {
  return <Button size="sm" type="button" variant="ghost" {...props} />;
};

const FormHeader = (props: React.ComponentProps<"div">) => {
  const { currentStepIndex, steps } = useMultiStepForm();
  return (
    <div
      className="flex flex-col items-start justify-center gap-3 pb-4"
      {...props}
    >
      <StepIndicator />
      <Progress value={(currentStepIndex / steps.length) * 100} />
    </div>
  );
};

const StepIndicator = (props: React.ComponentProps<"div">) => {
  const { currentStepIndex, steps, goToStep } = useMultiStepForm();
  const currentStep = steps[currentStepIndex - 1] as
    | { icon?: typeof Check; title?: string }
    | undefined;

  const StepIcon = currentStep?.icon;

  return (
    <div className="w-full" {...props}>
      {/* Mobile: compact view with dots and current step title */}
      <div className="flex flex-col items-center gap-2 md:hidden">
        <div className="flex items-center gap-2">
          {StepIcon && <StepIcon className="w-4 h-4 text-primary" />}
          <span className="text-sm font-medium text-primary">
            {currentStep?.title || `Step ${currentStepIndex}`}
          </span>
        </div>
      </div>

      {/* Desktop: full horizontal stepper */}
      <div className="hidden md:flex items-center justify-between w-full gap-2 px-1">
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCurrent = stepNum === currentStepIndex;
          const isCompleted = stepNum < currentStepIndex;
          const typedStep = step as { icon?: typeof Check; title?: string };
          const Icon = typedStep.icon;

          return (
            <button
              key={stepNum}
              type="button"
              onClick={() => goToStep(stepNum)}
              className={`flex flex-col items-center gap-1.5 min-w-20 ${
                isCurrent
                  ? "text-primary"
                  : isCompleted
                    ? "text-muted-foreground cursor-pointer"
                    : "text-muted-foreground/50 cursor-pointer"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors shrink-0 ${
                  isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : Icon ? (
                  <Icon className="w-4 h-4" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-xs text-center leading-tight whitespace-nowrap ${
                  isCurrent
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {typedStep.title || `Step ${stepNum}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
const FormFooter = (props: React.ComponentProps<"div">) => {
  return (
    <div
      className="w-full pt-3 flex items-center justify-end gap-3"
      {...props}
    />
  );
};

const StepFields = (props: React.ComponentProps<"div"> & MotionProps) => {
  const { currentStepIndex, steps } = useMultiStepForm();
  const currentFormStep = steps[currentStepIndex - 1];
  if (
    !currentFormStep ||
    currentStepIndex < 1 ||
    currentStepIndex > steps.length
  ) {
    return null;
  }
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -15 }}
        transition={{ duration: 0.4, type: "spring" }}
        {...props}
      >
        {currentFormStep.component}
      </motion.div>
    </AnimatePresence>
  );
};

function MultiStepFormContent(props: React.ComponentProps<"div">) {
  return <div className="flex flex-col gap-2 pt-3" {...props} />;
}

export {
  MultiStepFormContent,
  FormHeader,
  FormFooter,
  StepFields,
  StepIndicator,
  // Form Actions
  NextButton,
  PreviousButton,
  SubmitButton,
  ResetButton,
};
