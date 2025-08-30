export interface CourseCategory {
  [key: string]: {
    Stacks?: string[];
    Languages?: string[];
  };
}

export interface MentorFormData {
  fullName: string;
  headline: string;
  bio: string;
  currentRole: string;
  company: string;
  yearsOfExperience?: number;
  email: string;
  phoneNumber: string;
  gender: string;
  linkedin: string;
  github: string;
  portfolio: string;
  education: { degree: string; institution: string; year: string }[];
  certifications: { value: string }[];
  courses: { category: string; courseName: string }[];
  idProof?: FileList;
  qualificationProof?: FileList;
  cv?: FileList;
}

export interface MentorProfileResponse {
  success: boolean;
  data: Omit<MentorFormData, "certifications"> & {
    certifications: string[];
    documents: {
      idProof?: string;
      qualificationProof?: string;
      cv?: string;
    };
  };
}

export interface FormProps {
  register: any;
  control: any;
  errors: any;
  watch?: any;
  existingDocuments?: {
    idProof: string;
    qualificationProof: string;
    cv: string;
  };
  deleteFlags?: {
    idProof: boolean;
    qualificationProof: boolean;
    cv: boolean;
  };
  handleDelete?: (field: "cv" | "idProof" | "qualificationProof") => void;
  courseCategories?: CourseCategory;
  courseNames?: { [key: string]: string[] };
  loadingCategories?: boolean;
  categoryValues?: any;
}

// Add new interfaces for specific components
export interface EducationProps extends FormProps {
  educationFields: any[];
  appendEducation: (value: any) => void;
  removeEducation: (index: number) => void;
}

export interface CertificationsProps extends FormProps {
  certificationFields: any[];
  appendCertification: (value: any) => void;
  removeCertification: (index: number) => void;
}

export interface CoursesProps extends FormProps {
  courseFields: any[];
  appendCourse: (value: any) => void;
  removeCourse: (index: number) => void;
}