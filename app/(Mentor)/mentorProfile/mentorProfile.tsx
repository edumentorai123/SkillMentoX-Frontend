
"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

interface CourseCategory {
  [key: string]: {
    [subCategory: string]: string[];
  };
}

interface CertificationItem {
  name: string;
}

interface MentorFormData {
  fullName: string;
  headline: string;
  bio: string;
  currentRole: string;
  company: string;
  yearsOfExperience?: number;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  education: { degree: string; institution: string; year: string }[];
  certifications: CertificationItem[];
  courses: { category: string; subCategory: string; courseName: string }[];
  profilePicture?: FileList;
  idProof?: FileList;
  qualificationProof?: FileList;
}

const MentorForm = () => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<MentorFormData>({
    defaultValues: {
      fullName: '',
      headline: '',
      bio: '',
      currentRole: '',
      company: '',
      yearsOfExperience: undefined,
      email: '',
      linkedin: '',
      github: '',
      portfolio: '',
      education: [{ degree: '', institution: '', year: '' }],
      certifications: [{ name: '' }],
      courses: [{ category: '', subCategory: '', courseName: '' }],
    },
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray<MentorFormData, 'certifications'>({
    control,
    name: 'certifications',
  });

  const { fields: courseFields, append: appendCourse, remove: removeCourse } = useFieldArray({
    control,
    name: 'courses',
  });

  const [courseCategories, setCourseCategories] = useState<CourseCategory>({});
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [courseNames, setCourseNames] = useState<string[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch course categories
  useEffect(() => {
    const fetchCourseCategories = async () => {
      try {
        const res = await axios.get('http://localhost:9999/api/mentor/courseCategories');
        setCourseCategories(res.data.data);
      } catch (err) {
        console.error('Error fetching course categories:', err);
      }
    };
    fetchCourseCategories();
  }, []);

  // Fetch mentor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:9999/api/mentor/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Convert certifications from string[] to { name: string }[]
        if (res.data.data.certifications) {
          res.data.data.certifications = res.data.data.certifications.map((c: string) => ({ name: c }));
        }
        reset(res.data.data);
      } catch (err) {
        console.error('No profile found or error fetching profile:', err);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: MentorFormData) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('headline', data.headline);
      formData.append('bio', data.bio || '');
      formData.append('currentRole', data.currentRole || '');
      formData.append('company', data.company || '');
      if (data.yearsOfExperience) formData.append('yearsOfExperience', data.yearsOfExperience.toString());
      formData.append('email', data.email);
      formData.append('linkedin', data.linkedin || '');
      formData.append('github', data.github || '');
      formData.append('portfolio', data.portfolio || '');
      formData.append('education', JSON.stringify(data.education));
      // Convert certifications back to string[]
      formData.append('certifications', JSON.stringify(data.certifications.map(c => c.name)));
      formData.append('courses', JSON.stringify(data.courses));

      if (data.profilePicture?.[0]) formData.append('profilePicture', data.profilePicture[0]);
      if (data.idProof?.[0]) formData.append('idProof', data.idProof[0]);
      if (data.qualificationProof?.[0]) formData.append('qualificationProof', data.qualificationProof[0]);

      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:9999/api/mentor/updateProfile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage({ type: 'success', text: res.data.message });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'An error occurred' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCategoryChange = (index: number, category: string) => {
    setSubCategories(Object.keys(courseCategories[category] || {}));
    setCourseNames([]);
  };

  const handleSubCategoryChange = (index: number, category: string, subCategory: string) => {
    setCourseNames(courseCategories[category]?.[subCategory] || []);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Mentor Profile</h1>
      {message && (
        <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            {...register('fullName', { required: 'Full name is required', minLength: { value: 3, message: 'Minimum 3 characters' }, maxLength: { value: 100, message: 'Maximum 100 characters' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="text"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Headline</label>
          <input
            {...register('headline', { required: 'Headline is required', maxLength: { value: 150, message: 'Maximum 150 characters' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="text"
          />
          {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            {...register('bio', { maxLength: { value: 1000, message: 'Maximum 1000 characters' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
          {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Role</label>
          <input
            {...register('currentRole')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            {...register('company')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input
            {...register('yearsOfExperience', { min: { value: 0, message: 'Must be 0 or more' }, max: { value: 50, message: 'Maximum 50 years' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="number"
          />
          {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input
            {...register('linkedin', { pattern: { value: /^https?:\/\/(www\.)?linkedin\.com\//, message: 'Invalid LinkedIn URL' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="url"
          />
          {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub</label>
          <input
            {...register('github', { pattern: { value: /^https?:\/\/(www\.)?github\.com\//, message: 'Invalid GitHub URL' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="url"
          />
          {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Portfolio</label>
          <input
            {...register('portfolio', { pattern: { value: /^https?:\/\/.*/, message: 'Invalid URL' } })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            type="url"
          />
          {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Education</label>
          {educationFields.map((field, index) => (
            <div key={field.id} className="space-y-2 border p-4 rounded-md mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  {...register(`education.${index}.degree`, { required: 'Degree is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                />
                {errors.education?.[index]?.degree && <p className="text-red-500 text-sm mt-1">{errors.education[index].degree.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution</label>
                <input
                  {...register(`education.${index}.institution`, { required: 'Institution is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                />
                {errors.education?.[index]?.institution && <p className="text-red-500 text-sm mt-1">{errors.education[index].institution.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  {...register(`education.${index}.year`, { required: 'Year is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  type="text"
                />
                {errors.education?.[index]?.year && <p className="text-red-500 text-sm mt-1">{errors.education[index].year.message}</p>}
              </div>
              {educationFields.length > 1 && (
                <button type="button" onClick={() => removeEducation(index)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendEducation({ degree: '', institution: '', year: '' })}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Add Education
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Certifications</label>
          {certificationFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mb-2">
              <input
                {...register(`certifications.${index}.name` as const, { required: 'Certification is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
              />
              {certificationFields.length > 1 && (
                <button type="button" onClick={() => removeCertification(index)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              )}
              {errors.certifications?.[index]?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.certifications[index].name?.message}</p>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendCertification({ name: '' })}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Add Certification
          </button>
        </div>
        


        <div>
          <label className="block text-sm font-medium text-gray-700">Courses</label>
          {courseFields.map((field, index) => (
            <div key={field.id} className="space-y-2 border p-4 rounded-md mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  {...register(`courses.${index}.category`, { required: 'Category is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                >
                  <option value="">Select Category</option>
                  {Object.keys(courseCategories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.courses?.[index]?.category && <p className="text-red-500 text-sm mt-1">{errors.courses[index].category.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sub-Category</label>
                <select
                  {...register(`courses.${index}.subCategory`, { required: 'Sub-Category is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => handleSubCategoryChange(index, courseFields[index].category, e.target.value)}
                >
                  <option value="">Select Sub-Category</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))}
                </select>
                {errors.courses?.[index]?.subCategory && <p className="text-red-500 text-sm mt-1">{errors.courses[index].subCategory.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <select
                  {...register(`courses.${index}.courseName`, { required: 'Course Name is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select Course</option>
                  {courseNames.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
                {errors.courses?.[index]?.courseName && <p className="text-red-500 text-sm mt-1">{errors.courses[index].courseName.message}</p>}
              </div>
              {courseFields.length > 1 && (
                <button type="button" onClick={() => removeCourse(index)} className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendCourse({ category: '', subCategory: '', courseName: '' })}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Add Course
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            {...register('profilePicture')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            type="file"
            accept="image/*"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ID Proof</label>
          <input
            {...register('idProof')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            type="file"
            accept="image/*,application/pdf"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Qualification Proof</label>
          <input
            {...register('qualificationProof')}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            type="file"
            accept="image/*,application/pdf"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default MentorForm;





        




















