import TextField from '../../../core/textField';
import styles from './userName.module.scss';
import Button from '../../../core/button/index';
import { useCreateCenter, useSalamtLogin } from '@paziresh24/hooks/drapp/auth';
import { useEffect, useRef, useState } from 'react';
import { digitsFaToEn } from '@paziresh24/utils';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { setToken } from '@paziresh24/utils/localstorage';
import { getSplunkInstance } from '@paziresh24/components/core/provider';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const UserName = ({ step }) => {
    const history = useHistory();
    const salamtLogin = useSalamtLogin();
    const createCenterReq = useCreateCenter();
    const { search } = useLocation();
    const [localStep, setLocalStep] = useState(step);
    const params = queryString.parse(search);
    // form
    const {
        register: salamatLoginRegister,
        handleSubmit: salamatLoginHandleSubmit,
        formState: { errors: salamatLoginErrors }
    } = useForm();
    const {
        register: createCenterRegister,
        handleSubmit: createCenterHandleSubmit,
        formState: { errors: createCenterErrors }
    } = useForm();
    const cellField = useRef();
    const cellRegister = createCenterRegister('cellPhone', {
        required: true
    });
    const nationalCodeField = useRef();
    const nationalCodeRegister = createCenterRegister('nationalCode', {
        required: true
    });
    const usernameField = useRef();
    const usernameRegister = salamatLoginRegister('username', {
        required: true
    });
    const passwordField = useRef();
    const passwordRegister = salamatLoginRegister('password', {
        required: true
    });

    useEffect(() => {
        localStep === 'SALAMATAUTH' && usernameField.current.focus();
    }, []);

    const handleCreateCenter = async ({ cellPhone, nationalCode }) => {
        console.log({
            username: usernameField.current.value,
            password: passwordField.current.value
        });
        try {
            await createCenter({
                cellPhone: digitsFaToEn(cellPhone),
                nationalCode: digitsFaToEn(nationalCode)
            });
            handleLogin({
                username: usernameField.current.value,
                password: passwordField.current.value
            });
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    };

    const createCenter = async ({ cellPhone, nationalCode }) => {
        return createCenterReq.mutateAsync({
            ignore_shahkar: true,
            mobile: digitsFaToEn(cellPhone),
            nationalCode: digitsFaToEn(nationalCode)
        });
    };

    const handleLogin = async ({ username, password }) => {
        salamtLogin.mutate(
            {
                username: digitsFaToEn(username),
                password: digitsFaToEn(password)
            },
            {
                onSuccess: data => {
                    setToken(data.access_token);
                    getSplunkInstance().sendEvent({
                        group: 'login',
                        type: 'successful-salamat',
                        event: {
                            username: digitsFaToEn(username)
                        }
                    });

                    if (params?.url && new URL(params?.url).origin === location.origin) {
                        return location.replace(decodeURIComponent(params.url));
                    }

                    return history.replace({
                        pathname: '/',
                        state: {
                            afterLogin: true
                        }
                    });
                },
                onError: error => {
                    if (error.response.data.message === 'user not found') {
                        return setLocalStep('CREATE_CENTER');
                    }
                    toast.error(error.response.data.message);
                    getSplunkInstance().sendEvent({
                        group: 'login',
                        type: 'unsuccessful-salamat',
                        event: {
                            username: digitsFaToEn(username)
                        }
                    });
                }
            }
        );
    };

    return (
        <>
            <form
                onSubmit={salamatLoginHandleSubmit(handleLogin)}
                className={`${styles.wrapper} ${localStep !== 'SALAMATAUTH' ? '!hidden' : ''}`}
            >
                <TextField
                    type="tel"
                    label="نام کاربری"
                    error={salamatLoginErrors.username}
                    {...usernameRegister}
                    ref={e => {
                        usernameRegister.ref(e);
                        usernameField.current = e;
                    }}
                    testId="salamat-login-username-field"
                />
                <TextField
                    type="tel"
                    label="رمز عبور"
                    error={salamatLoginErrors.password}
                    {...passwordRegister}
                    ref={e => {
                        passwordRegister.ref(e);
                        passwordField.current = e;
                    }}
                    testId="salamat-login-password-field"
                />
                <Button
                    block
                    type="submit"
                    loading={salamtLogin.isLoading}
                    testId="salamat-login-login-button"
                >
                    ورود
                </Button>
            </form>
            {localStep === 'CREATE_CENTER' && (
                <form
                    onSubmit={createCenterHandleSubmit(handleCreateCenter)}
                    className={styles.wrapper}
                >
                    <TextField
                        type="tel"
                        label="شماره موبایل"
                        errorText="شماره موبایل اشتباه است."
                        {...cellRegister}
                        ref={e => {
                            cellRegister.ref(e);
                            cellField.current = e;
                        }}
                    />
                    <TextField
                        type="tel"
                        label="کدملی"
                        error={createCenterErrors.nationalCode}
                        {...nationalCodeRegister}
                        ref={e => {
                            nationalCodeRegister.ref(e);
                            nationalCodeField.current = e;
                        }}
                    />
                    <Button
                        block
                        type="submit"
                        loading={createCenterReq.isLoading || salamtLogin.isLoading}
                    >
                        ثبت نام
                    </Button>
                </form>
            )}
        </>
    );
};

export default UserName;
