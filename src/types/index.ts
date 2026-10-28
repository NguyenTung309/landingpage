export interface RegistrationData {
  fullName: string
  phoneNumber: string
  email?: string
}

export interface RegistrationResponse {
  success: boolean
  message: string
  zaloLink?: string
  zaloGroupName?: string
}

export interface ZaloLinkResponse {
  groupLink: string
  groupName: string
}

export interface ApiError {
  error: string
  details?: string
}
