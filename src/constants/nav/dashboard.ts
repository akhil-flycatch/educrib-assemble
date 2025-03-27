const DASHBOARD_ROUTE = "/dashboard";

export const DASHBOARD_NAV: Record<
  string,
  Array<{ name: string; url: string }>
> = {
  colleges: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Courses", url: `${DASHBOARD_ROUTE}/courses` },
    { name: "Facilities", url: `${DASHBOARD_ROUTE}/facilities` },
    { name: "Images", url: `${DASHBOARD_ROUTE}/images` },
    { name: "Media", url: `${DASHBOARD_ROUTE}/media` },
    { name: "Hostel", url: `${DASHBOARD_ROUTE}/hostel` },
    { name: "Staff & Management", url: `${DASHBOARD_ROUTE}/staffs` },
  ],
  school: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Curriculum", url: `${DASHBOARD_ROUTE}/curriculum` },
    { name: "Facilities", url: `${DASHBOARD_ROUTE}/facilities` },
    { name: "Images", url: `${DASHBOARD_ROUTE}/images` },
    { name: "Media", url: `${DASHBOARD_ROUTE}/media` },
    { name: "Hostel", url: `${DASHBOARD_ROUTE}/hostel` },
    { name: "Staff & Management", url: `${DASHBOARD_ROUTE}/staffs` },
  ],
  Playschool: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Curriculum", url: `${DASHBOARD_ROUTE}/curriculum` },
    { name: "Facilities", url: `${DASHBOARD_ROUTE}/facilities` },
    { name: "Images", url: `${DASHBOARD_ROUTE}/images` },
    { name: "Media", url: `${DASHBOARD_ROUTE}/media` },
    { name: "Hostel", url: `${DASHBOARD_ROUTE}/hostel` },
    { name: "Staff & Management", url: `${DASHBOARD_ROUTE}/staffs` },
  ],
  Institutes: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Courses", url: `${DASHBOARD_ROUTE}/courses` },
    { name: "Facilities", url: `${DASHBOARD_ROUTE}/facilities` },
    { name: "Images", url: `${DASHBOARD_ROUTE}/images` },
    { name: "Media", url: `${DASHBOARD_ROUTE}/media` },
    { name: "Staff & Management", url: `${DASHBOARD_ROUTE}/staffs` },
  ],
  Consultants: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Services", url: `${DASHBOARD_ROUTE}/services` },
  ],
  Tutors: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Subjects", url: `${DASHBOARD_ROUTE}/subjects` },
    { name: "Services", url: `${DASHBOARD_ROUTE}/services` },
  ],
  Classes: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Skills", url: `${DASHBOARD_ROUTE}/skills` },
    { name: "Services", url: `${DASHBOARD_ROUTE}/services` },
  ],
  Internships: [
    { name: "Introduction", url: DASHBOARD_ROUTE },
    { name: "Internships", url: `${DASHBOARD_ROUTE}/internships` },
  ],
};
