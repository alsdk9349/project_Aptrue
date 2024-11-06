interface CCTVItem {
  cctvRequestId: number;
  status: string;
  address: string;
  name: string;
  createdAt: string;
}

interface requestDetailInfo {
  cctvRequestId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  startDate: string;
  endDate: string;
  sections: string[];
  isPhoto: boolean;
  password: string;
  photoUploadUrl: string;
  cctvVideo: string;
}
