export interface CoursesProps {
	courses: CourseItemProps[]
}

export interface CourseItemProps {
	course: string;
	speicalization?: string | null;
	courseLevel: string;
	category?: string;
}

export interface FacilitiesProps {
	facilities: string[]
}

export interface StaffItemProps {
	image: string;
}

export interface IntroductionProps {
	title: string;
	university?: string;
	management?: string | null;
	categories?: string[];
	establishmentYear?: string;
	code?: string | null;
	accreditations?: string[];
	type?: string;
	logo?: string;
	cover?: string;
	contacts?:[]
	id?: string;
	published?: boolean
	verified?: boolean;
	profile?:any
}

export interface GeneralProps extends IntroductionProps {}
