import { useForm } from 'react-hook-form';
import styles from './InputForm.module.css';

const defaultFormState = {
    utterance: ''
};

export function InputForm(props: {setUtterance: any}) {
    const { formState, register, handleSubmit, reset } = useForm<{
        utterance: string;
    }>({
        defaultValues: defaultFormState
    });

    const { errors } = formState;

    const submitTTS = (data: { utterance: string }) => {
        console.log('User typed: ', data.utterance);
        reset(defaultFormState);
        props.setUtterance(data.utterance)
    };

    return (
        <section className={styles['form-container']}>
            <form
                onSubmit={handleSubmit(submitTTS)}
                className={styles['input-form']}
            >
                <textarea
                    className={styles['input-field']}
                    {...register('utterance', {
                        required: 'Please write something.'
                    })}
                ></textarea>

                <p className="--primary-text">{errors?.utterance?.message}</p>

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
