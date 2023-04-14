import { useForm } from 'react-hook-form';

const defaultFormState = {
    userInput: ''
};

export function InputForm() {
    const { register, handleSubmit, reset } = useForm<{ userInput: string }>({
        defaultValues: defaultFormState
    });

    const submitTTS = (data: { userInput: string }) => {
        console.log(data);
        reset(defaultFormState);
    };

    return (
        <form onSubmit={handleSubmit(submitTTS)}>
            <label htmlFor="userInput">
                <input
                    type="text"
                    {...register('userInput', { required: true })}
                ></input>
            </label>

            <button type="submit">To Speech</button>
        </form>
    );
}
