import useGetSelectedForm from "./useGetSelectedForm";

export default function useGetAllCurrentId() {
    const selectedForm = useGetSelectedForm();
    const resForm = [];
    selectedForm.forEach(item => {
        resForm.push(item.id);
    });
    return resForm;
}