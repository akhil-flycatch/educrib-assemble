// import _ from 'lodash';
// import { BookOutlined } from '@ant-design/icons';
// import Container from '@ui/container';
// import uuid from 'react-uuid';
// import { useRegion } from '@contexts/region';
// import { useVertical } from '@contexts/vertical';
// import { slugify } from '@utils/string';
// import Info from '@ui/info';
// import Tag from '@ui/tag';
// import Empty from '@ui/empty';

// interface CourseItemProps {
//     category: string,
//     course: string,
//     speicalization: string,
//     courseLevel: string
// }

// export default function Courses({ courses }) {
//     const courseGroup = _.chain(courses).groupBy('courseLevel').map((course) => ({ course })).value();
//     const courseData = [];
//     const { currentRegion } = useRegion();
//     const { currentVertical } = useVertical();

//     courseGroup.map((course) => (
//         course.course.length > 0
//             ? courseData.push(
//                 <Container key={uuid()} title={`${course.course.length} ${course.course[0].courseLevel}`}>
//                     {
//                         course.course.map((courseItem) => (
//                             <div className="flex justify-between md:items-center items-start border-b border-light flex-col md:flex-row" key={uuid()} >
//                                 <Info
//                                     label={courseItem.courseLevel}
//                                     value={courseItem.speicalization
//                                         ? <span>{`${courseItem.course} in ${courseItem.speicalization}`}</span>
//                                         : <span>{courseItem.course}</span>
//                                     }
//                                     icon={<BookOutlined />}
//                                     reverse
//                                 />
//                                 <a className="hidden md:block" href={`/${currentRegion.toLowerCase()}/category/${slugify(courseItem.category)}/${currentVertical.key}`}>
//                                     <Tag text={courseItem.category} theme="GRADIENT_ONE" />
//                                 </a>
//                             </div>
//                         ))
//                     }
//                 </Container>
//             )
//             : null
//     ));
//     return (
//         <div>
//             {courseData.length > 0 ? courseData : <Empty item="courses" />}
//         </div>
//     )
// }
