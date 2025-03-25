import Form from '@elements/entry/form';
import Accreditation from '@entry/fields/accreditation';
import Code from '@entry/fields/code';
import Type from '@entry/fields/collegetype';
import EstablishedYear from '@entry/fields/establishedYear';
import Management from '@entry/fields/management';
import ShortAddress from '@entry/fields/shortAddress';
import University from '@entry/fields/university';
import {
	useForm
} from 'react-hook-form';

import Title from '../fields/title';

const CourseForm = () => {
	const {
		register, handleSubmit
	} = useForm();
	const onSubmit = (data: any) => console.log(data);
	return (
		<Form name='course-form' onSubmit={handleSubmit(onSubmit)}>
			<Title register={register} />
			<ShortAddress register={register} />
			<University register={register} />
			<Management register={register} />
			<EstablishedYear register={register} />
			<Code register={register} />
			<Accreditation register={register} />
			<Type register={register} />
		</Form>
	);
};

export default CourseForm;