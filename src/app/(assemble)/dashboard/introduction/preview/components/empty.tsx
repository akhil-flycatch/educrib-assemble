import { Result } from 'antd';

export default function Empty({ item }) {
    return (
        <Result
            status="404"
            title="Sorry"
            subTitle={`We are in the process of adding ${item}`}
        />
    )
}
