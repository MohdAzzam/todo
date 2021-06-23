import { useEffect, useContext } from "react";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AuthHelper } from "../../api/AuthHelper";
import Auth from "../../context/Auth";
import { useHistory } from "react-router";
export default function Login() {
    const history = useHistory();
    const { handleLogin } = useContext(Auth.Context);
    // validation schema.
    const validation = Yup.object().shape({
        username: Yup.string()
            .required('user Name required'),
        password: Yup.string().required('password is required'),

    });

    //Form hooks
    const { setError, register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(validation)
    });

    useEffect(() => {
        register('username');
        register('password');
    })

    function onSubmit(form, e) {
        if (e.target.username !== '') {
            AuthHelper.login(form.username, form.password)
                .then((response) => {
                    handleLogin(response.data.user, response.data.token);
                    
                    e.target.reset();
                    history.push('/');
                })
                .catch((err) => {
                    setError('password', { message: 'Username or password invalid' });
                })
        }
    }

    return (
        <div className='text-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-4 p-4'>
                    <label className='mr-4'>User Name</label>
                    <input type='text' name='userName' onChange={(e) => {
                        setValue('username', e.target.value)
                    }} />
                    {
                        !!errors?.username?.message &&
                        <label>
                            {errors?.username?.message}
                        </label>
                    }
                </div>
                <div className='mt-2 p-4'>
                    <label className='mr-4'>Password</label>
                    <input type='password' name='password' onChange={(e) => {
                        setValue('password', e.target.value)
                    }} />
                    {
                        !!errors?.password?.message &&
                        <label>
                            {errors?.password?.message}
                        </label>
                    }
                </div>
                <button className='btn btn-primary '>Login</button>
            </form>
        </div>
    )
}