import { useForm } from 'react-hook-form';
import styles from './InputForm.module.css';

const defaultFormState = {
    userInput: ''
};

export function InputForm() {
    const { formState, register, handleSubmit, reset } = useForm<{
        userInput: string;
    }>({
        defaultValues: defaultFormState
    });

    const { errors } = formState;

    const submitTTS = (data: { userInput: string }) => {
        console.log(data);
        reset(defaultFormState);
    };

    return (
        <section className={styles['form-container']}>
            <form
                onSubmit={handleSubmit(submitTTS)}
                className={styles['input-form']}
            >
                <textarea
                    className={styles['input-field']}
                    {...register('userInput', {
                        required: 'Please write something.'
                    })}
                ></textarea>

                <p className="--primary-text">{errors?.userInput?.message}</p>

                <button
                    type="submit"
                    className={styles['submit-button'] + ' --primary-text'}
                >
                    To Speech
                </button>
            </form>
            <span className={styles['gradient-bar']}></span>
        </section>
    );
}
