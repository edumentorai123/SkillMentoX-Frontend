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

import { UseFormRegister, Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { UseFieldArrayAppend, UseFieldArrayRemove } from 'react-hook-form';

export type MentorFormType = {
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
};

export interface FormProps {
  register: UseFormRegister<MentorFormType>;
  control: Control<MentorFormType>;
  errors: FieldErrors<MentorFormType>;
  watch?: UseFormWatch<MentorFormType>;
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
  categoryValues?: { category: string; courseName: string }[];
}

// Add new interfaces for specific components
export interface EducationProps extends FormProps {
  educationFields: { id: string; degree: string; institution: string; year: string }[];
  appendEducation: UseFieldArrayAppend<MentorFormType, "education">;
  removeEducation: UseFieldArrayRemove;
}

export interface CertificationsProps extends FormProps {
  certificationFields: { id: string; value: string }[];
  appendCertification: UseFieldArrayAppend<MentorFormType, "certifications">;
  removeCertification: UseFieldArrayRemove;
}

export interface CoursesProps extends FormProps {
  courseFields: { id: string; category: string; courseName: string }[];
  appendCourse: UseFieldArrayAppend<MentorFormType, "courses">;
  removeCourse: UseFieldArrayRemove;
}
