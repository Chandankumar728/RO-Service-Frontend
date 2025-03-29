import React from "react";
import moment from "moment";
import EditDialogBox from "@/components/edit-dialog-box";
import { useApi } from "@/hooks/useCustomQuery";
import { roApi } from "@/lib";
import type { I_BOOKING_VIEW } from "./type";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  WrenchIcon,
  PhoneIcon,
  MailIcon,
  InfoIcon,
} from "lucide-react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  id?: string;
  edit?: boolean;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
  techId?: string;
};

export default function AssignTechnician({
  open,
  setOpen,
  title,
  id,
  refetch,
}: Readonly<Props>) {
  const [selectedTech, setSelectedTech] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("details");

  const getBookingByIdData = useApi<I_BOOKING_VIEW>({
    api: `${roApi?.findBookingRoService}/${id}`,
    value: [id],
    options: {
      enabled: !!id,
    },
  });

  const booking = getBookingByIdData?.data?.data;

  const isLoading = getBookingByIdData.isLoading;

  // Format dates using moment.js
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Not specified";
    return moment(dateString).format("MMM DD, YYYY");
  };

  // Format time using moment.js
  const formatTime = (timeString: string | undefined) => {
    if (!timeString) return "Not specified";
    return moment(timeString, "HH:mm").format("h:mm A");
  };

  return (
    <EditDialogBox
      open={open}
      setOpen={setOpen}
      title={title || "Assign Technician"}
      setEdit={() => null}
      edit={false}
      isLoading={isLoading}
    >
      <ScrollArea className="h-[80vh] w-full pr-4">
        <div className="space-y-6 py-4 px-2">
          {isLoading ? (
            <div className="grid gap-4">
              <div className="w-full h-12 bg-muted animate-pulse rounded-md"></div>
              <div className="w-full h-64 bg-muted animate-pulse rounded-md"></div>
              <div className="w-full h-64 bg-muted animate-pulse rounded-md"></div>
            </div>
          ) : getBookingByIdData?.data ? (
            <Tabs
              defaultValue="details"
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="details" className="text-sm sm:text-base">
                  Booking Details
                </TabsTrigger>
                <TabsTrigger
                  value="technicians"
                  className="text-sm sm:text-base"
                >
                  Assign Technician
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                {/* Booking Overview Card */}
                <Card className="border border-border shadow-sm overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <CardTitle className="text-xl font-semibold">
                          Booking #{booking?.applicationNo}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mt-1">
                          Applied By: {booking?.createdBy || "N/A"}
                        </p>
                      </div>
                      <Badge
                        className="mt-2 md:mt-0"
                        variant={
                          booking?.status === "Confirmed"
                            ? "default"
                            : booking?.status === "Pending"
                            ? "secondary"
                            : booking?.status === "Cancelled"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {booking?.status || "Status Unknown"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {/* Appointment Information */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-primary flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5" /> Appointment
                        </h4>

                        <div className="bg-muted/20 p-4 rounded-lg space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Assigned Date
                              </p>
                              <p className="font-medium text-base">
                                {formatDate(booking?.assignDate)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking?.assignDate &&
                                  moment(booking.assignDate).fromNow()}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Time Slot
                              </p>
                              <p className="font-medium text-base">
                                {formatTime(booking?.aasigntime)}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Technician Name
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar className="h-8 w-8 bg-primary/10">
                                <UserIcon className="h-4 w-4 text-primary" />
                              </Avatar>
                              <p className="font-medium">
                                {booking?.technician?.fullName ||
                                  "Not assigned"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Location
                            </p>
                            <div className="flex items-start gap-2 mt-1">
                              <MapPinIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <p className="font-medium">
                                {booking?.address || "Main Service Center"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-primary flex items-center gap-2">
                          <UserIcon className="h-5 w-5" /> Customer
                        </h4>

                        <div className="bg-muted/20 p-4 rounded-lg space-y-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Name
                            </p>
                            <p className="font-medium text-base">
                              {booking?.fullName || "Not specified"}
                            </p>
                          </div>

                          <Separator />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Phone
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                                <p className="font-medium">
                                  {booking?.phoneNumber || "Not specified"}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Customer ID
                              </p>
                              <p className="font-medium">
                                {booking?.applicationNo || "Not specified"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Email
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <MailIcon className="h-4 w-4 text-muted-foreground" />
                              <p className="font-medium text-wrap break-words">
                                {booking?.email || "Not specified"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Service Information */}
                      <div className="space-y-4 md:col-span-2">
                        <h4 className="text-lg font-medium text-primary flex items-center gap-2">
                          <WrenchIcon className="h-5 w-5" /> Service Details
                        </h4>

                        <div className="bg-muted/20 p-4 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Service Type
                              </p>
                              <p className="font-medium">
                                {booking?.service?.serviceTypeName ||
                                  "Not specified"}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Preferred Date
                              </p>
                              <p className="font-medium">
                                {formatDate(booking?.preferredDate)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking?.preferredDate &&
                                  moment(booking.preferredDate).fromNow()}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Assigned Time
                              </p>
                              <p className="font-medium">
                                {formatTime(booking?.aasigntime)}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Current Technician
                              </p>
                              <p className="font-medium">
                                {booking?.technician?.fullName ||
                                  "Not assigned"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Booking Information */}
                      <div className="space-y-4 md:col-span-2">
                        <h4 className="text-lg font-medium text-primary flex items-center gap-2">
                          <InfoIcon className="h-5 w-5" /> Booking Timeline
                        </h4>

                        <div className="bg-muted/20 p-4 rounded-lg">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Created On
                              </p>
                              <p className="font-medium">
                                {booking?.createdAt
                                  ? moment(booking.createdAt).format(
                                      "MMM DD, YYYY [at] h:mm A"
                                    )
                                  : "Not specified"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking?.createdAt &&
                                  moment(booking.createdAt).fromNow()}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Last Updated
                              </p>
                              <p className="font-medium">
                                {booking?.updatedAt
                                  ? moment(booking.updatedAt).format(
                                      "MMM DD, YYYY [at] h:mm A"
                                    )
                                  : "Not updated"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking?.updatedAt &&
                                  moment(booking.updatedAt).fromNow()}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                                Time Since Booking
                              </p>
                              <p className="font-medium">
                                {booking?.createdAt
                                  ? moment(booking.createdAt).fromNow(true)
                                  : "Unknown"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technicians" className="space-y-6">
                {booking?.technician ? (
                  <Card className="border border-border shadow-sm overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle className="text-lg font-semibold">
                          Booking Summary
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className="px-3 py-1 flex items-center gap-1"
                        >
                          <WrenchIcon className="h-3.5 w-3.5" />
                          {booking?.service?.serviceTypeName || "Service"}
                        </Badge>
                      </div>
                      <CardDescription className="mt-2">
                        Booking #{booking?.applicationNo} for{" "}
                        {booking?.fullName || "Customer"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg">
                          <CalendarIcon className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Preferred Date
                            </p>
                            <p className="font-medium">
                              {formatDate(booking?.preferredDate)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking?.preferredDate &&
                                moment(booking.preferredDate).fromNow()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg">
                          <ClockIcon className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Assigned Time
                            </p>
                            <p className="font-medium">
                              {formatTime(booking?.aasigntime)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg">
                          <WrenchIcon className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Service Type
                            </p>
                            <p className="font-medium">
                              {booking?.service?.serviceTypeName ||
                                "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-muted/20 p-3 rounded-lg">
                          <UserIcon className="h-5 w-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                              Current Technician
                            </p>
                            <p className="font-medium">
                              {booking?.technician?.fullName || "Not assigned"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border border-border shadow-sm">
                    <div className="p-6 text-center">
                      <InfoIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        NOT ASSIGNED YET
                      </h3>
                    </div>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="p-6 text-center">
              <InfoIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Booking Data</h3>
              <p className="text-muted-foreground">
                Unable to load booking information for ID: {id}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </EditDialogBox>
  );
}
