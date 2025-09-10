"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { User, Mail, Calendar } from "lucide-react";

const MentorDetailsPage = () => {
  const [mentor, setMentor] = useState<any>(null);
  const router = useRouter();
  const { id } = useParams(); // URL parameter (id)

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:9999/api/mentor/admin/mentor/${id}`, // Correct API path
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMentor(data.data);
      } catch (error) {
        console.error("Error fetching mentor details:", error);
      }
    };

    fetchMentorDetails();
  }, [id]);

  if (!mentor) return <p>Loading mentor details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#0D4C5B] mb-4">
        {mentor.fullName}
      </h1>

      <div className="mb-4">
        <p>
          <strong>Headline:</strong> {mentor.headline}
        </p>
        <p>
          <strong>Bio:</strong> {mentor.bio}
        </p>
        <p>
          <strong>Current Role:</strong> {mentor.currentRole}
        </p>
        <p>
          <strong>Company:</strong> {mentor.company}
        </p>
        <p>
          <strong>Years of Experience:</strong> {mentor.yearsOfExperience}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Contact Info</h2>
        <p>
          <Mail size={16} /> {mentor.email}
        </p>
        <p>
          <User size={16} /> {mentor.phoneNumber}
        </p>
        {mentor.linkedin && (
          <p>
            <a href={mentor.linkedin} target="_blank">
              LinkedIn
            </a>
          </p>
        )}
        {mentor.github && (
          <p>
            <a href={mentor.github} target="_blank">
              GitHub
            </a>
          </p>
        )}
        {mentor.portfolio && (
          <p>
            <a href={mentor.portfolio} target="_blank">
              Portfolio
            </a>
          </p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Education</h2>
        {mentor.education.map((edu: any, index: number) => (
          <div key={index}>
            <p>
              {edu.degree} - {edu.institution} ({edu.year})
            </p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Certifications</h2>
        {mentor.certifications.map((cert: string, index: number) => (
          <p key={index}>{cert}</p>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Courses</h2>
        {mentor.courses.map((course: any, index: number) => (
          <p key={index}>
            {course.category} - {course.courseName}
          </p>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Documents</h2>
        {mentor.documents.idProof.map((doc: string, index: number) => (
          <a
            key={index}
            href={doc}
            target="_blank"
            className="block text-blue-500"
          >
            ID Proof {index + 1}
          </a>
        ))}
        {mentor.documents.qualificationProof.map(
          (doc: string, index: number) => (
            <a
              key={index}
              href={doc}
              target="_blank"
              className="block text-blue-500"
            >
              Qualification Proof {index + 1}
            </a>
          )
        )}
        {mentor.documents.cv.map((doc: string, index: number) => (
          <a
            key={index}
            href={doc}
            target="_blank"
            className="block text-blue-500"
          >
            CV {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MentorDetailsPage;
