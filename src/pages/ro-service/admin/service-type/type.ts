import { I_WITH_PAGINATION } from '@/types/paginationType'
export type I_SERVICE_TYPE = {
  _id: string
  serviceTypeName: string
  description: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_SERVICE_TYPE_VIEW = {
  success: boolean
  data: I_SERVICE_TYPE
}

export type I_SERVICE_TYPE_LIST = I_WITH_PAGINATION<I_SERVICE_TYPE>
