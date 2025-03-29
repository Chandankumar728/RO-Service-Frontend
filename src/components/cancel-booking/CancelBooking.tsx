import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { usePostMutation } from '@/hooks/useCustomQuery';
import { useForm } from 'react-hook-form';
import { RHFTextArea, FormProviders } from '@/components/forms';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { getErrorMessage, roApi } from '@/lib';
import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

type DialogDemoProps = {
  id: string;
  children?: React.ReactNode;
  refetch?: () => void;
};

type FormValues = {
  actionMessage: string;
};

export default function CancelBooking({
  children,
  id,
  refetch
}: DialogDemoProps) {
  const [open, setOpen] = useState(false);
  const mutate = usePostMutation({});
  const methods = useForm<FormValues>({
    defaultValues: {
      actionMessage: ''
    },
    resolver: yupResolver(
      yup.object().shape({
        actionMessage: yup.string().required('Action message is required')
      })
    )
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await mutate.mutateAsync({
        api: roApi?.cancelBooking,
        data: {
          id: id,
          actionMessage: data.actionMessage
        }
      });
      if (result?.data?.success) {
        methods.reset();
        toast.success('Booking cancelled successfully');
        setOpen(false); // Close the dialog on success
        refetch && refetch(); // Refetch the booking list if a refetch function is provided
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-lg border-0 shadow-lg">
        <div className="absolute right-4 top-4">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4 text-gray-500 hover:text-gray-900" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <FormProviders
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Cancel Booking
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              Please provide a reason for cancelling this booking.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-1">
              <div className="flex items-center mb-1">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">
                  Cancellation reason
                </span>
              </div>
              <RHFTextArea
                id="actionMessage"
                name="actionMessage"
                placeholder="Enter the reason for cancellation..."
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </FormProviders>
      </DialogContent>
    </Dialog>
  );
}
