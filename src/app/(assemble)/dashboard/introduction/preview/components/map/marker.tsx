import { Tooltip } from 'antd';
import { MARKER_IMAGE } from '@utils/map';

export default function marker({ title }) {
    return (
        <Tooltip title={title}>
            <img src={MARKER_IMAGE} width={25} height={25} className="bg-red rounded-md p-1 opacity-90" />
        </Tooltip>
    )
}
