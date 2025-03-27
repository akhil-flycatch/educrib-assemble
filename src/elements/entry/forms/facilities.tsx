
import Form from "@elements/entry/form";
import Accreditation from "@entry/fields/accreditation";

const FacilitiesForm =  ({ register }: any) => {
//   const facilities = await getAllFacilities({ active: true });
  // const {
  // 	register, handleSubmit
  // } = useForm();
//   console.log("the ava", facilities)
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Form name="facilities-form">
      <Accreditation register={register} />
    </Form>
  );
};

export default FacilitiesForm;
