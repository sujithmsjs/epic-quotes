import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import MyFloatingInput from "../../my-ui/MyFloatingInput";
import { zodResolver } from "@hookform/resolvers/zod";
import MyDropdwonBox from "../../my-ui/MyDropdwonBox";
import axios from "axios";


const types = ["Electronics", "Clothing", "Home and Kitchen", "Toys", "Beauty"]

const schema = z.object({
    title: z.string().min(6).max(50),
    timeRequired: z.string().refine((value) => {
        // Regular expression htmlFor HH:MM:SS format
        const timeRegex = /^[0-5]\d:[0-5]\d$/;
        return timeRegex.test(value);
    }, { message: "Time must be in HH:MM:SS format" }),

    priority: z.coerce.number().gte(1).lte(5),
});


const AddTodo = ({onSubmit}) => {

    const form = useForm({
        resolver: zodResolver(schema)
    }
    );
    const { register, control, handleSubmit, formState } = form;
    const { errors, isDirty, isValid } = formState;

    

    return (
        <>
            <h3>Add Product</h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <MyFloatingInput register={register} label='Title' errors={errors} />
                <MyFloatingInput register={register} type="time" label='Time Required' errors={errors} />
                <MyDropdwonBox name="priority" options={[1, 2, 3, 4, 5]} register={register} />

                <div className="d-grid gap-2 mt-3">
                    <button
                        className="btn btn-primary"
                        type="submit"
                    >
                        Add Todo
                    </button>
                </div>
            </form>

            <DevTool control={control} />
        </>
    );
};

export default AddTodo;
