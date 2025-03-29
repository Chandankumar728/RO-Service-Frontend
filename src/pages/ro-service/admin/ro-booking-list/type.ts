import { I_WITH_PAGINATION } from '@/types/paginationType'

export type technicianData ={
  _id: string;
  fullName: string;
  roleId: string;
  mobile: string;
  email: string;
  password: string;
  status: number;
  permission: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: string;
  fullImgUrl: string;
  imageUrl: string;
}
export type Service = {
  _id: string;
  serviceTypeName: string;
  
};

export type I_BOOKING_TYPE = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  applicationNo: string;
  email: string;
  address: string;
  serviceType: string;
  preferredDate: string;
  additionalInfo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  assignDate: string;
  createdBy: string;
  aasigntime: string;
  __v: number;
  technicianId: string;
  technician: technicianData
  service: Service
}


export type I_BOOKING_VIEW = {
  success: boolean
  data: I_BOOKING_TYPE
}

export type I_BOOKING_LIST = I_WITH_PAGINATION<I_BOOKING_TYPE>
