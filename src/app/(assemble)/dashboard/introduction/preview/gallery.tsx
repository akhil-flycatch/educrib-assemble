
// import Empty from '@ui/empty';
// import { IMAGE_SERVER_COLLEGES } from '@utils/image';
// import { SRLWrapper } from "simple-react-lightbox";

// export default function Gallery({ gallery, title }) {
//     return (
//         gallery && gallery?.length > 0 ?
//             <SRLWrapper>
//                 {
//                     <div className="grid md:grid-cols-8 grid-cols-2 gap-2">
//                         {gallery.map(item => (
//                             <a href={`${IMAGE_SERVER_COLLEGES}/uploads/${item}`} key={item}>
//                                 <img
//                                     src={`${IMAGE_SERVER_COLLEGES}/uploads/${item}`}
//                                     alt={title}
//                                     width={160}
//                                     height={120}
//                                 />
//                             </a>
//                         ))}
//                     </div>
//                 }
//             </SRLWrapper>
//             : <Empty item="gallery" />
//     )
// }
