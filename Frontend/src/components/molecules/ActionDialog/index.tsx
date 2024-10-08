import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ActionDialogProps = {
  title: string;
  description?: string;
  trigger: string | React.ReactNode;
  actionName: string;
  actionHandler: () => void;
  className?: string;
  disabled?: boolean;
};

export const ActionDialog = ({
  title,
  description,
  trigger,
  actionName,
  actionHandler,
  className,
  disabled = false,
}: ActionDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={className}>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={actionHandler}
            className="hover:bg-destructive hover:text-destructive-foreground disabled:bg-primary/40"
            disabled={disabled}
          >
            {actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
