export interface StatusRequestBody {
  emails: string[];
  projectId: string;
  includeRaterDetails?: boolean;
}

export interface ProjectIds {
  projectIds: (number | string)[];
}

export interface RaterStatusRequestBody extends ProjectIds {
  email: string;
}

export interface OTPRequestBody {
  email: string;
}
