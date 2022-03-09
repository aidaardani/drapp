import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './sideBar.module.scss';
import { useDrApp } from '@paziresh24/context/drapp';
import NoImage from '@paziresh24/assets/images/drapp/noimage.png';
import Modal from '../../../core/modal';
import Button from '../../../core/button';

import {
    CardIcon,
    PrescriptionIcon,
    InfoIcon,
    ExitIcon,
    ChatIcon,
    MessageIcon,
    PrescriptionMenuIcon,
    HouseIcon,
    UserIcon,
    SettingIcon,
    Statistics
} from '../../../icons';
import { StarIcon } from '../../../icons/public/duotone';
import { isMobile } from 'react-device-detect';
import { useMenu } from '@paziresh24/context/core/menu';
import { useSendMessageTelegram } from '@paziresh24/hooks/core';
import { toast } from 'react-toastify';
import { useGetFeedbacks } from '@paziresh24/hooks/drapp/profile';
import { baseURL } from '@paziresh24/utils/baseUrl';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { MenuItem } from '../menuItem';
import { useSettingTurns } from '@paziresh24/components/doctorApp/turning/statusBar/settingTurns.context';
import { StatusBar } from '../../turning/statusBar';
import { useLevel } from '@paziresh24/context/core/level';
import { getSplunkInstance } from '@paziresh24/components/core/provider';
import { isLessThanExpertDegreeDoctor } from 'apps/drapp/src/functions/isLessThanExpertDegreeDoctor';

const SideBar = () => {
    const [open, setOpen] = useMenu();
    // const doctorInfo = useGetDoctorInfo();
    const [, setSettingIsOpen] = useSettingTurns();
    const [level] = useLevel();

    const history = useHistory();
    const [info, setInfo] = useDrApp();
    const [promoteConsult, setPromoteConsult] = useState(false);

    const getFeedbacks = useGetFeedbacks({ center_id: info.center.id });
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    useEffect(() => {
        if (open && isMobile) return document.body.classList.add(styles['sidebar-open']);
        document.body.classList.remove(styles['sidebar-open']);
    }, [open]);

    useEffect(() => {
        if (info) {
            if (!info.doctor?.image) {
                setUserCompleteProfile(70);
            } else {
                setUserCompleteProfile(100);
            }
        }
    }, [info]);

    const [userCompleteProfile, setUserCompleteProfile] = useState(0);

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if (level === 'DOCTOR') {
            return setMenuItems([
                {
                    id: 'turnning-list-step',
                    name: 'لیست بیماران',
                    icon: <HouseIcon color="#3F3F79" />,
                    link: '/',
                    onClick: () =>
                        getSplunkInstance().sendEvent({
                            group: 'sidebar',
                            type: 'click-turnning-menu'
                        }),
                    tourStep: {
                        key: 2,
                        value: '?learn=true'
                    }
                },
                {
                    id: '50',
                    isShow: window._env_.P24_STATISTICS_API,
                    name: 'گزارش نسخه نویسی',
                    icon: <Statistics color="#3F3F79" />,
                    link: '/dashboard'
                },
                {
                    id: 10,
                    name: 'نسخه های ثبت شده',
                    isShow: !isLessThanExpertDegreeDoctor(info.doctor?.expertises),
                    icon: <PrescriptionMenuIcon color="#3F3F79" />,
                    onClick: () =>
                        getSplunkInstance().sendEvent({
                            group: 'sidebar',
                            type: 'click-prescription-menu'
                        }),
                    link: '/prescription'
                },
                {
                    id: 25,
                    name: 'پراستفاده ها',
                    isShow: !isLessThanExpertDegreeDoctor(info.doctor?.expertises),
                    icon: <StarIcon color="#3F3F79" />,
                    link: '/favorite/templates',
                    subMenu: [
                        { name: 'نسخه پراستفاده', link: '/favorite/templates' },
                        { name: 'اقلام پراستفاده', link: '/favorite/service' }
                    ]
                },
                {
                    id: 4,
                    name: 'چت',
                    isShow: info.center.id === '5532',
                    icon: <ChatIcon color="#3F3F79" />,
                    link: '/consult'
                },
                {
                    id: 7,
                    name: 'قوانین مشاوره',
                    isShow: info.center.id === '5532',
                    icon: <InfoIcon color="#3F3F79" />,
                    link: '/consult-term'
                },
                {
                    id: 'provider-step',
                    name: 'بیمه های من',
                    isShow: !isLessThanExpertDegreeDoctor(info.doctor?.expertises),
                    icon: <PrescriptionIcon color="#3F3F79" />,
                    link: `/providers`,
                    onClick: () =>
                        getSplunkInstance().sendEvent({
                            group: 'sidebar',
                            type: 'click-providers-menu'
                        }),
                    tourStep: {
                        key: 1,
                        value: '?learn=true'
                    }
                },
                {
                    id: 8,
                    name: 'تنظیمات نوبت دهی',
                    isShow: info.center.is_active_booking && info.center.type_id === 1,
                    icon: <SettingIcon color="#3F3F79" />,
                    onClick: () => setSettingIsOpen(true)
                },
                {
                    id: 11,
                    name: 'نظرات بیماران',
                    icon: <MessageIcon color="#3F3F79" />,
                    link: '/feedbacks',
                    badge: true
                },
                {
                    id: 6,
                    name: 'تسویه حساب',
                    isShow: info.center.id === '5532' || info.center.type_id === 1,
                    icon: <CardIcon color="#3F3F79" />,
                    link: '/financial'
                },
                {
                    id: 23,
                    name: 'خروج',
                    icon: <ExitIcon color="#3F3F79" />,
                    link: '/logout'
                }
            ]);
        }
        return setMenuItems([
            {
                id: 'turnning-list-step',
                name: 'گزارش نسخه نویسی',
                icon: <Statistics color="#3F3F79" />,
                link: '/dashboard'
            },
            {
                id: 23,
                name: 'خروج',
                icon: <ExitIcon color="#3F3F79" />,
                link: '/logout'
            }
        ]);
    }, [info.center]);

    const sendMessageTelegram = useSendMessageTelegram();

    const promoteConsultAction = () => {
        sendMessageTelegram.mutate(
            {
                url: 'bot292637075:AAFpgPkcXNeiWr5VR_O6aNBQs4RRiKBJuYE/sendmessage',
                chat_id: '-259185045',
                text: `${info.doctor.name + ' ' + info.doctor.family}\nشماره تماس: 0${
                    info.doctor.cell
                }\nتخصص ها: ${info.doctor.expertises
                    .map(item => item.degree?.name && `${item.degree.name} ${item.expertise.name}`)
                    .join(',')}\n#دکتراپ #ثبت_نام_پزشک_مشاوره`
            },
            {
                onSuccess: () => {
                    setPromoteConsult(false);
                    toast.info('بزودی با شما تماس میگیریم.');
                },
                onError: () => {
                    setPromoteConsult(false);
                    toast.info('بزودی با شما تماس میگیریم.');
                }
            }
        );
    };

    const calculateNoReplyComments = () => {
        if (!getFeedbacks.data.result) return 0;
        const noReplyComment = getFeedbacks.data.result?.filter(feedback => {
            return !feedback.replies.length;
        });
        return noReplyComment.length;
    };

    return (
        <div style={{ display: 'flex' }} onMouseLeave={() => setOpen(false)}>
            <div
                className={styles.menuBar}
                style={{
                    // overflow: 'hidden',
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem 0.5rem',
                    paddingBottom: open ? '2rem' : '1rem',
                    gap: '1rem',
                    alignItems: open ? 'flex-start' : 'center',
                    justifyContent: 'space-between',
                    zIndex: '10',
                    // boxShadow: '-8px 0px 40px 0px #9ba0be21',
                    borderLeft: '1px solid #e5e9f0',
                    width: open ? '27rem' : '6.5rem',
                    transition: 'all 0.3s ease-in-out',
                    height: '100vh'
                    // overflowY: 'auto'
                }}
                onMouseOver={() => setOpen(true)}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: open ? 'flex-start' : 'center',
                        gap: '3rem',
                        width: '100%'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            // flexDirection: 'row',
                            // alignItems: 'center',
                            width: '100%',
                            alignSelf: 'center',
                            transition: 'all 0.3s',
                            marginRight: open ? '2rem' : 0,
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                        onMouseOver={() => open && setIsDropDownOpen(true)}
                        onMouseLeave={() => setIsDropDownOpen(false)}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '5.5rem',
                                height: '5.5rem',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <img
                                src={
                                    info.doctor.image
                                        ? baseURL('UPLOADER') + info.doctor.image
                                        : null ?? NoImage
                                }
                                style={{
                                    minWidth: open ? '5.5rem' : '3.5rem',
                                    width: open ? '5.5rem' : '3.5rem',
                                    height: open ? '5.5rem' : '3.5rem',
                                    // marginTop: open ? '2rem' : '0',
                                    alignSelf: 'center',
                                    overflow: 'hidden',
                                    borderRadius: '100rem',
                                    transition: 'all 0.3s'
                                }}
                                alt="avatar"
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                // alignItems: 'center',
                                // alignSelf: 'center',
                                // marginTop: '1.5rem',
                                // marginRight: '1rem',
                                transition: 'all 0.3s',
                                opacity: open ? '1' : '0',
                                position: 'absolute',
                                right: open ? '7rem' : '0',
                                bottom: '0',
                                transitionDelay: !open ? 'unset' : '0.2s',
                                color: '#3F3F79',
                                width: !open && '0',
                                overflow: !open && 'hidden'
                            }}
                        >
                            <span
                                className={styles.doctorName}
                                style={{ fontSize: '1.7rem', fontWeight: 'bold' }}
                            >
                                {`${info.doctor.name} ${info.doctor.family}`}
                            </span>
                            <span
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '400',
                                    marginTop: '0.5rem'
                                }}
                            >
                                {info.doctor.expertises.length > 0 && (
                                    <span
                                        className={styles.expertises}
                                        style={{ fontSize: '1.4rem' }}
                                    >
                                        {info.doctor.expertises[0].alias_title
                                            ? info.doctor.expertises[0].alias_title
                                            : `${info.doctor.expertises[0].degree?.name ?? ''} ${
                                                  info.doctor.expertises[0].expertise?.name ?? ''
                                              }`}
                                    </span>
                                )}{' '}
                            </span>
                        </div>

                        <CSSTransition
                            in={isDropDownOpen}
                            timeout={300}
                            classNames={{
                                enter: styles.dropdown_enter,
                                enterActive: styles.dropdown_enter_active,
                                enterDone: styles.dropdown_enter_done,
                                exitActive: styles.dropdown_exit_active
                            }}
                            unmountOnExit
                        >
                            <div
                                className={`${styles.items_dropdown} ${
                                    isDropDownOpen === 'open' ? styles.open : ''
                                } ${isDropDownOpen === 'closing' ? styles.closing : ''}`}
                                onMouseOver={() => setIsDropDownOpen(true)}
                            >
                                <ul>
                                    <li onClick={() => history.push('/profile')}>
                                        <UserIcon color="#758599" />
                                        <span>پروفایل من</span>
                                    </li>

                                    <li onClick={() => history.push('/logout')}>
                                        <ExitIcon color="#758599" />
                                        <span>خروج از حساب کاربری</span>
                                    </li>
                                </ul>
                            </div>
                        </CSSTransition>
                    </div>

                    <div>
                        {menuItems.map(
                            item =>
                                (item.isShow === undefined || item.isShow) && (
                                    <MenuItem key={item.id} item={item} />
                                )
                        )}
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%'
                    }}
                >
                    <a
                        className={styles['support-wrapper']}
                        href="tel:02125015555"
                        style={{
                            position: 'absolute',
                            right: open ? '1rem' : '0',
                            bottom: '8.5rem',
                            transition: 'all 0.3s',
                            transitionDelay: !open ? 'unset' : '0.2s',
                            opacity: open ? '1' : '0'
                        }}
                    >
                        <div className={styles['support-content']}>
                            <span style={{ fontSize: '1.4rem', fontWeight: '700', opacity: '0.6' }}>
                                پشتیبانی: 02125015555
                            </span>
                        </div>
                    </a>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            alignItems: 'center',
                            transition: 'all 0.3s',
                            paddingRight: open ? '2rem' : '0',
                            // marginBottom: open ? '6rem' : '0',
                            position: 'relative'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '5.5rem',
                                height: '5.5rem'
                            }}
                        >
                            <svg
                                width="35"
                                height="36"
                                viewBox="0 0 35 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M33.8807 16.0418L33.5926 11.1331C33.5421 10.3963 33.3329 9.68026 32.9802 9.03695C32.6276 8.39365 32.1402 7.83917 31.5536 7.41373L29.0342 5.60346C27.1325 4.23593 25.1082 3.05886 22.9887 2.08833L19.4742 0.480659C18.8657 0.201546 18.2056 0.061934 17.5395 0.0714939C16.8406 0.0510296 16.1464 0.19491 15.5097 0.492189L11.8663 2.19144C9.93322 3.09233 8.08052 4.16568 6.32937 5.3992L3.47515 7.40879C2.87822 7.83321 2.38167 8.39036 2.02223 9.03903C1.66279 9.6877 1.44968 10.4113 1.39865 11.1562L1.11477 16.0391C1.09716 17.3441 1.09716 18.6493 1.11477 19.9542L1.40057 24.8629C1.45139 25.5996 1.6607 26.3156 2.01335 26.9588C2.366 27.6021 2.85318 28.1566 3.43962 28.5823L5.95971 30.3971C7.86184 31.7649 9.88688 32.942 12.0071 33.9123L15.5209 35.5209C16.1298 35.7994 16.7901 35.9384 17.4563 35.9284C18.1551 35.9489 18.8493 35.805 19.4861 35.5078L23.1295 33.8105C25.0626 32.9096 26.9153 31.8362 28.6664 30.6027L31.5206 28.5931C32.1175 28.1687 32.614 27.6116 32.9734 26.963C33.3327 26.3144 33.5458 25.5909 33.5968 24.8461L33.8813 20.0303C33.8929 18.982 33.9133 17.2801 33.8807 16.0418V16.0418Z"
                                    fill="#3F3F79"
                                />
                                <path
                                    d="M17.6661 6.14687L17.6767 6.31752C17.6769 6.33768 17.6841 6.3571 17.697 6.37234C17.7098 6.38759 17.7274 6.39769 17.7468 6.40087C17.772 6.40749 17.7977 6.41244 17.8236 6.41569C18.0772 6.44638 18.3292 6.49037 18.5786 6.54747C18.9715 6.63134 19.36 6.73636 19.7423 6.86209C21.5505 7.44666 23.1939 8.47428 24.5312 9.8567C24.8477 10.1823 25.1442 10.5277 25.419 10.8911C25.5208 11.0256 25.5195 11.0229 25.6789 10.9745C25.8576 10.9207 26.0409 10.8846 26.2262 10.8664C26.4509 10.8461 26.6771 10.8493 26.9012 10.876C27.1249 10.9023 27.3444 10.9583 27.5541 11.0427C28.1502 11.2691 28.6561 11.6934 28.9918 12.2488C29.2653 12.7092 29.4129 13.2371 29.419 13.7767C29.4037 14.5588 29.0872 15.3027 28.5392 15.8447C27.9912 16.3867 27.2565 16.6826 26.4966 16.6672C26.4393 16.6685 26.3819 16.6661 26.3248 16.66C26.1477 16.6479 25.972 16.6202 25.7996 16.5773C25.3239 16.4585 24.8857 16.2164 24.5266 15.874C24.1676 15.5315 23.8997 15.1002 23.7484 14.6211C23.6232 14.2212 23.5882 13.7973 23.6459 13.3814C23.6962 12.9879 23.8252 12.6095 24.0249 12.27C24.2245 11.9305 24.4904 11.6373 24.8058 11.409C24.8301 11.3902 24.8541 11.3721 24.8772 11.352C24.8839 11.3474 24.8858 11.3372 24.8951 11.3191C24.8765 11.2908 24.8573 11.2571 24.8337 11.2268C23.3956 9.39625 21.4404 8.07096 19.2385 7.43432C18.9011 7.33639 18.5593 7.25492 18.2143 7.19021C18.0655 7.16188 17.9154 7.14112 17.7663 7.11839C17.7093 7.1095 17.6821 7.12926 17.6789 7.18428C17.6751 7.26367 17.6789 7.34307 17.6751 7.42213V7.70282C17.6762 7.71062 17.6758 7.71859 17.6739 7.72623C17.6719 7.73387 17.6685 7.74104 17.6639 7.74729C17.6591 7.75355 17.6533 7.75878 17.6465 7.76268C17.6398 7.76658 17.6325 7.76908 17.6248 7.77002H17.6088C17.4446 7.77002 17.2779 7.77002 17.1159 7.76607C17.1079 7.76607 17.1006 7.75882 17.0839 7.74993C17.0781 7.71855 17.074 7.68688 17.0714 7.65505V7.3513C17.0714 7.31607 17.0694 7.28087 17.0654 7.24588C17.0642 7.23024 17.0573 7.21561 17.0462 7.20489C17.0351 7.19416 17.0204 7.1881 17.0052 7.1879C16.9878 7.18657 16.9704 7.18657 16.953 7.1879L16.3821 7.20997C16.2996 7.21056 16.2172 7.21551 16.1353 7.2248C15.95 7.2449 15.7647 7.26433 15.581 7.29069C15.3973 7.31704 15.2132 7.34999 15.0298 7.38293C14.7652 7.43004 14.5046 7.49461 14.2457 7.56709C12.3489 8.09458 10.6346 9.16075 9.29867 10.6437C8.67608 11.3358 8.14745 12.1116 7.72721 12.9498C7.47734 13.4466 7.26753 13.9637 7.09991 14.4959C6.9974 14.8227 6.9113 15.1548 6.84195 15.4908C6.78413 15.7664 6.73719 16.0436 6.70113 16.3223C6.67328 16.5361 6.66016 16.7506 6.64288 16.967C6.6336 17.0807 6.62751 17.195 6.62367 17.31C6.62367 17.3907 6.64032 17.4088 6.71969 17.4154H7.96501C8.01899 17.4076 8.07399 17.4139 8.12504 17.4335C8.13315 17.4519 8.13896 17.4713 8.14232 17.4911C8.15097 17.6649 8.14636 17.839 8.12856 18.012C8.107 18.0194 8.08482 18.0248 8.06231 18.0281H6.8045C6.75313 18.0183 6.70004 18.0265 6.65376 18.0515C6.63652 18.0876 6.63146 18.1285 6.63936 18.1678C6.64313 18.3615 6.65788 18.5548 6.68352 18.7466C6.70209 18.8636 6.71073 18.9825 6.72513 19.1001C6.75297 19.3274 6.7965 19.5518 6.84163 19.7758C6.90788 20.0911 6.98661 20.4018 7.07847 20.7075C7.23962 21.2378 7.44301 21.7536 7.68657 22.2496C8.35907 23.6052 9.30428 24.7979 10.4593 25.7483C11.6144 26.6987 12.9528 27.3851 14.3856 27.7618C14.6707 27.8372 14.9585 27.9015 15.2455 27.9512C15.4971 27.995 15.7509 28.0243 16.005 28.0527C16.3596 28.0909 16.7143 28.0945 17.0695 28.1018C17.1358 28.1018 17.2017 28.1018 17.2648 28.0965C17.3278 28.0912 17.3428 28.0718 17.3416 28.0125C17.3416 27.911 17.3348 27.8109 17.3278 27.7087C17.3012 27.3263 17.3035 26.9431 17.3041 26.5606C17.3052 26.4453 17.3316 26.3317 17.3815 26.2284C17.4314 26.1251 17.5034 26.0348 17.5922 25.9644C17.7408 25.8414 17.9167 25.7584 18.1043 25.7229C18.3283 25.6718 18.5523 25.6214 18.7764 25.5743C18.9457 25.5387 19.1166 25.5084 19.2865 25.4755C19.372 25.4593 19.4565 25.4425 19.5426 25.429C19.6706 25.4076 19.7986 25.3826 19.9266 25.3664C20.1574 25.3269 20.3915 25.3111 20.6253 25.3193C20.7074 25.3253 20.7886 25.3402 20.8676 25.3638C20.9812 25.3963 21.0802 25.4688 21.1473 25.5687C21.2942 25.77 21.4309 25.9789 21.557 26.1946C21.6603 26.3827 21.7752 26.5649 21.8879 26.7491C21.899 26.768 21.9118 26.7858 21.9263 26.8021C21.9366 26.8169 21.9517 26.8273 21.9688 26.8316C21.986 26.8359 22.004 26.8337 22.0198 26.8255C22.0473 26.8128 22.0738 26.798 22.0991 26.781C22.6365 26.4256 23.1684 26.0619 23.6792 25.6665C24.3171 25.1662 24.8819 24.5742 25.3563 23.9086C25.4616 23.7627 25.5701 23.6204 25.6732 23.4731C25.7557 23.3549 25.8332 23.2326 25.9106 23.1107C25.9614 23.0277 25.9816 22.9287 25.9676 22.8317C25.961 22.7476 25.9382 22.6657 25.9006 22.5907C25.863 22.5158 25.8114 22.4492 25.7487 22.3949C25.5511 22.2164 25.3442 22.0492 25.1287 21.8941C24.9335 21.7692 24.7793 21.5867 24.6861 21.3703C24.6015 21.1569 24.5876 20.9207 24.6464 20.6982L24.7786 20.1471L24.9598 19.393C25.0206 19.1457 25.081 18.8981 25.1409 18.6501C25.1693 18.5258 25.2118 18.4053 25.2673 18.291C25.3304 18.1663 25.423 18.06 25.5366 17.9819C25.6501 17.9037 25.781 17.8563 25.917 17.844C26.1187 17.8171 26.3228 17.8143 26.5251 17.8357C26.8401 17.8667 27.1556 17.8914 27.4706 17.9165C27.5829 17.9253 27.6946 17.926 27.8085 17.9293C28.0518 17.9293 28.2948 17.9429 28.5367 17.9698C28.6276 17.9823 28.7164 18.0076 28.8007 18.0449C28.8821 18.0804 28.9546 18.1345 29.0128 18.2029C29.071 18.2714 29.1134 18.3525 29.1368 18.4403C29.1823 18.578 29.1921 18.7257 29.1652 18.8685C29.1368 19.0029 29.13 19.1374 29.1089 19.2718C29.0747 19.4928 29.0427 19.7149 28.9972 19.9346C28.9476 20.1847 28.8887 20.4327 28.8324 20.6814C28.7623 20.9812 28.6769 21.2769 28.5763 21.5673C28.2761 22.489 27.8637 23.3678 27.3489 24.1827C27.0248 24.6942 26.6636 25.1797 26.2685 25.6352C25.6544 26.3457 24.9667 26.9847 24.2176 27.5411C23.5764 28.0235 22.8892 28.4377 22.1667 28.7771C21.7414 28.9753 21.3071 29.1523 20.8653 29.3075C20.5622 29.4129 20.2534 29.4976 19.9391 29.5763C19.6248 29.6551 19.3124 29.714 18.9975 29.7694C18.8356 29.7977 18.6707 29.8083 18.5072 29.83C18.3439 29.8531 18.1791 29.8622 18.0143 29.857C17.9235 29.8565 17.8337 29.8381 17.7496 29.8027C17.6627 29.7623 17.5895 29.6961 17.5394 29.6126C17.4858 29.5272 17.4472 29.4327 17.4254 29.3335C17.4136 29.2825 17.3969 29.2347 17.3819 29.181C17.3502 29.1751 17.3181 29.1712 17.2859 29.1695H16.987C16.6403 29.1714 16.2938 29.1541 15.949 29.1178C15.6946 29.0936 15.4411 29.0607 15.1889 29.0189C14.3331 28.8819 13.4954 28.6439 12.6925 28.3096C10.3176 27.3349 8.32935 25.5678 7.04614 23.2916C6.49152 22.3055 6.08718 21.2377 5.84723 20.1254C5.7685 19.763 5.71505 19.4006 5.66192 19.0336C5.63535 18.8359 5.62351 18.6409 5.61103 18.4406C5.59311 18.1461 5.57006 17.8519 5.57903 17.5567C5.58959 17.2006 5.60815 16.8441 5.64528 16.4893C5.66917 16.2392 5.70118 15.9904 5.74129 15.7431C5.78962 15.4536 5.84787 15.1643 5.92052 14.8787C5.99317 14.5931 6.07062 14.3186 6.15992 14.0432C6.33349 13.5121 6.54587 12.9953 6.79522 12.4972C7.25109 11.585 7.82316 10.7396 8.4963 9.9832C9.87764 8.44129 11.6295 7.30146 13.5752 6.67859C13.9008 6.57161 14.2321 6.48362 14.5674 6.41503C14.7415 6.38209 14.914 6.33564 15.0894 6.30764C15.3243 6.27008 15.5605 6.24175 15.7973 6.21408C16.0083 6.19103 16.2198 6.17356 16.4317 6.1617C16.6739 6.14885 16.9165 6.14424 17.1595 6.13831H17.5365C17.5758 6.13864 17.612 6.14325 17.6661 6.14687V6.14687ZM28.5591 13.9365C28.5913 13.5297 28.5091 13.1219 28.3224 12.7618C28.1357 12.4018 27.8523 12.1046 27.5061 11.9056C27.1598 11.7067 26.7653 11.6145 26.3695 11.64C25.9738 11.6655 25.5935 11.8077 25.2741 12.0495C25.1856 12.1146 25.1021 12.1865 25.0241 12.2646C24.8351 12.4534 24.6845 12.6791 24.5811 12.9284C24.4777 13.1777 24.4236 13.4458 24.4218 13.7169C24.4201 13.988 24.4708 14.2567 24.571 14.5074C24.6713 14.7581 24.819 14.9858 25.0055 15.1772L25.011 15.1831C25.3487 15.5341 25.795 15.7526 26.2726 15.8008C26.6586 15.8484 27.0497 15.7783 27.3973 15.5992C27.7186 15.4557 27.9963 15.2254 28.2008 14.9326C28.4053 14.6399 28.5291 14.2957 28.5591 13.9365V13.9365Z"
                                    fill="white"
                                />
                                <path
                                    d="M16.8366 19.6924C16.8405 19.7487 16.8459 19.7873 16.8459 19.8268V20.8178C16.8459 20.9631 16.8421 20.965 16.7003 20.9677H12.1235C12.0617 20.9757 11.9989 20.9697 11.9395 20.9502C11.9206 20.8973 11.9189 20.8395 11.9347 20.7855C12.019 20.3112 12.1968 19.8598 12.4573 19.4592C12.627 19.2084 12.8152 18.9715 13.0203 18.7505C13.3855 18.3473 13.7785 17.9773 14.1703 17.6031C14.4103 17.3725 14.6439 17.1379 14.8744 16.9001C15.0296 16.7466 15.1618 16.5703 15.2668 16.3769C15.3638 16.1946 15.4256 15.9947 15.4489 15.7882C15.4705 15.59 15.441 15.3895 15.3634 15.2067C15.3191 15.0952 15.2507 14.9955 15.1634 14.9152C15.076 14.8349 14.972 14.7762 14.8593 14.7436C14.5973 14.6561 14.3142 14.6622 14.056 14.761C13.9398 14.8033 13.8346 14.8724 13.7483 14.9629C13.6619 15.0533 13.5967 15.1629 13.5577 15.2832C13.5093 15.4107 13.4803 15.5452 13.4716 15.6818C13.4676 15.7117 13.4617 15.7413 13.4537 15.7704C13.4352 15.7751 13.4163 15.7777 13.3973 15.7783C12.9706 15.7379 12.5439 15.6967 12.1171 15.6548C12.1104 15.6548 12.104 15.6446 12.0886 15.6327C12.0853 15.5962 12.0853 15.5595 12.0886 15.523C12.1302 15.2533 12.2033 14.9897 12.3063 14.738C12.4887 14.321 12.814 13.9879 13.22 13.8023C13.4867 13.674 13.7718 13.5911 14.0643 13.5569C14.2447 13.5333 14.4266 13.5234 14.6084 13.5273C14.9515 13.5296 15.2912 13.5966 15.6108 13.7249C15.8755 13.8286 16.1144 13.9915 16.3105 14.2017C16.5066 14.412 16.6549 14.6645 16.7448 14.9409C16.8428 15.2472 16.8718 15.5724 16.8296 15.892C16.7636 16.3881 16.5745 16.8583 16.2804 17.2572C16.0947 17.5238 15.8825 17.7698 15.6473 17.9912C15.3164 18.3071 14.979 18.6171 14.6449 18.9324C14.4791 19.0806 14.3262 19.2434 14.1879 19.419C14.1408 19.4816 14.096 19.5468 14.0557 19.6133C14.032 19.6502 14.0502 19.6792 14.096 19.6852C14.14 19.6875 14.1842 19.6875 14.2282 19.6852H16.6606C16.7095 19.6871 16.7652 19.6904 16.8366 19.6924V19.6924ZM22.2567 19.4486C22.2004 19.4486 22.1527 19.4545 22.1059 19.4545H21.5106C21.4635 19.4474 21.4154 19.4549 21.3724 19.476C21.3537 19.5255 21.3475 19.5791 21.3545 19.6318V20.7941C21.3545 20.8418 21.3506 20.8896 21.349 20.9331C21.3061 20.9616 21.2543 20.9722 21.204 20.9627H20.121C20.0931 20.9612 20.0653 20.958 20.0378 20.9532C20.0238 20.9378 20.0136 20.9193 20.008 20.899C20.0025 20.8788 20.0017 20.8575 20.0058 20.8369V19.6236C20.0058 19.5758 20.0019 19.5287 19.999 19.477C19.9728 19.468 19.9458 19.4615 19.9184 19.4575H17.1752C17.1171 19.4639 17.0583 19.4579 17.0024 19.4401C16.9945 19.4115 16.9891 19.3823 16.9864 19.3528V18.2834C16.9898 18.2212 17.0131 18.1619 17.0526 18.1147C17.2829 17.7787 17.5125 17.4425 17.7414 17.1063L20.0909 13.6673C20.1988 13.5101 20.1623 13.5276 20.3556 13.5263H21.1957C21.2447 13.5202 21.2944 13.5262 21.3407 13.5437C21.3472 13.568 21.3522 13.5926 21.3554 13.6175V18.0192C21.3554 18.0676 21.3554 18.116 21.3593 18.1645C21.36 18.1779 21.3655 18.1905 21.3748 18.2C21.3841 18.2094 21.3965 18.215 21.4095 18.2155C21.4438 18.2155 21.4758 18.2195 21.5135 18.2195H22.1267C22.1709 18.2186 22.215 18.2202 22.2589 18.2241C22.266 18.2455 22.2708 18.2676 22.2733 18.29V19.3864C22.2694 19.4075 22.2638 19.4283 22.2567 19.4486ZM19.9779 15.6976C19.9459 15.7408 19.9257 15.7635 19.9117 15.7875L18.8993 17.2974L18.37 18.0824C18.3469 18.1154 18.3124 18.1483 18.313 18.1921C18.3249 18.2023 18.3316 18.2122 18.3383 18.2122C18.8674 18.2149 19.3967 18.2166 19.9261 18.2175C19.9476 18.2197 19.9693 18.2149 19.9881 18.2038C20.0069 18.1927 20.0219 18.1758 20.0309 18.1555C20.0399 18.1353 20.0426 18.1126 20.0385 18.0907C20.0344 18.0688 20.0237 18.0487 20.008 18.0333V15.7734C20.0007 15.748 19.9907 15.7234 19.9782 15.7002L19.9779 15.6976ZM28.3466 13.6004C28.369 13.9947 28.2707 14.3863 28.0656 14.7202C27.8606 15.0541 27.559 15.3134 27.2034 15.4617C26.9217 15.5789 26.6168 15.625 26.3143 15.5961C25.9558 15.5666 25.6134 15.43 25.3291 15.2032C25.0449 14.9763 24.8311 14.669 24.714 14.3189C24.6289 14.0731 24.5994 13.8106 24.628 13.5513C24.6583 13.2235 24.773 12.91 24.96 12.6429C25.1471 12.3758 25.3999 12.1648 25.6924 12.0316C25.9732 11.887 26.2873 11.8251 26.6001 11.8527C26.9604 11.8699 27.3079 11.9955 27.5995 12.214C27.8911 12.4326 28.1139 12.7345 28.2404 13.0822C28.3056 13.247 28.3416 13.4225 28.3466 13.6004V13.6004ZM26.475 12.8904C26.2604 12.8869 26.0531 12.9707 25.8982 13.1237C25.7434 13.2766 25.6534 13.4863 25.648 13.7071C25.6516 13.9286 25.7393 14.1398 25.8922 14.2957C26.0451 14.4515 26.2511 14.5397 26.4663 14.5413C26.6819 14.5457 26.8905 14.4618 27.046 14.308C27.2016 14.1543 27.2914 13.9432 27.2959 13.7213C27.297 13.6134 27.2773 13.5064 27.2379 13.4065C27.1984 13.3065 27.14 13.2157 27.0661 13.1392C26.9156 12.9834 26.7115 12.895 26.498 12.8931L26.475 12.8904Z"
                                    fill="white"
                                />
                                <path
                                    d="M26.4836 13.3949C26.5696 13.3925 26.6531 13.425 26.7162 13.4853C26.7792 13.5456 26.8168 13.6289 26.8209 13.7174C26.8223 13.7627 26.815 13.8079 26.7995 13.8504C26.7839 13.8928 26.7604 13.9317 26.7302 13.9647C26.7 13.9978 26.6638 14.0244 26.6236 14.0431C26.5835 14.0618 26.5401 14.0721 26.4961 14.0735H26.4836C26.3974 14.0709 26.3153 14.0348 26.2539 13.9725C26.1925 13.9101 26.1563 13.8262 26.1526 13.7375C26.1498 13.6496 26.181 13.5641 26.2393 13.4998C26.2976 13.4355 26.3783 13.3976 26.4637 13.3945L26.4836 13.3949Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <span
                            style={{
                                fontSize: '1.7rem',
                                fontWeight: '900',
                                position: 'absolute',
                                right: open ? '7.5rem' : '0',
                                transition: 'all 0.3s',
                                transitionDelay: !open ? 'unset' : '0.2s',
                                opacity: open ? '1' : '0',
                                color: '#3F3F79'
                            }}
                        >
                            پذیرش24
                        </span>
                    </div>
                </div>

                {/* <div>
                        <NavLink
                            to="/logout"
                            exact
                            className={styles.menuBarItem}
                            activeClassName={styles['active']}
                            style={{
                                cursor: 'pointer',
                                height: '5.5rem',
                                width: '5.5rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ExitIcon color="#3F3F79" />
                        </NavLink>
                    </div> */}
            </div>
            {info.doctor && (
                <div className={classNames({ [styles['sidebar']]: true })}>
                    <div className={styles['wrapper']}>
                        {/* <div
                            className={classNames({
                                [styles['header']]: true,
                                [styles.close]: !open
                            })}
                        >
                            <div
                                className={classNames({
                                    [styles['user-info-wrapper']]: true
                                })}
                                onClick={() => {
                                    history.push('/profile');
                                    isMobile && setOpen(false);
                                }}
                                aria-hidden
                            >
                                <img
                                    src={
                                        info.doctor.image
                                            ? baseURL('UPLOADER') + info.doctor.image
                                            : null ?? NoImage
                                    }
                                    alt="avatar"
                                />
                                <span className={styles['user-name']}>
                                    <b>{`${info.doctor.name} ${info.doctor.family}`}</b>
                                    <PenIcon data-tip data-for="profileIcon" />
                                    <ReactTooltip
                                        id="profileIcon"
                                        place="top"
                                        type="dark"
                                        effect="solid"
                                    >
                                        از این قسمت اطلاعات فردی و حرفه ای خودرا اصلاح کنید
                                    </ReactTooltip>
                                </span>
                            </div>
                            {userCompleteProfile !== 100 && (
                                <div className={styles['user-profile-complete-score']}>
                                    <div className={styles['status']}>
                                        <span>
                                            درصد تکمیل پروفایل: &nbsp; ٪{userCompleteProfile}
                                        </span>
                                    </div>
                                    <div className={styles['status-bar']}>
                                        <span style={{ width: `${userCompleteProfile}%` }} />
                                    </div>
                                </div>
                            )}
                        </div> */}
                        {/* <SideBarMenu
                            menuItems={menuItems}
                            openSubMenu={openSubMenu}
                            setOpenSubMenu={setOpenSubMenu}
                            noborder
                        >
                            {!getFeedbacks.isLoading && (
                                <span className={styles['badge']} aria-hidden>
                                    <span className={styles['red']}>
                                        {calculateNoReplyComments()}
                                    </span>
                                </span>
                            )}
                        </SideBarMenu> */}
                    </div>

                    {/* {!centersConfig[window.location.hostname]?.hideDownloadBox && (
                        <a className={styles['support-wrapper']} href="tel:02125015555">
                            <svg
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="20"
                                    height="20"
                                    transform="translate(0.805908 0.421875)"
                                />
                                <path
                                    d="M19.1142 15.697C19.1142 15.997 19.0475 16.3053 18.9059 16.6053C18.7642 16.9053 18.5809 17.1886 18.3392 17.4553C17.9309 17.9053 17.4809 18.2303 16.9725 18.4386C16.4725 18.647 15.9309 18.7553 15.3475 18.7553C14.4975 18.7553 13.5892 18.5553 12.6309 18.147C11.6725 17.7386 10.7142 17.1886 9.7642 16.497C8.80587 15.797 7.89753 15.022 7.03087 14.1636C6.17253 13.297 5.39753 12.3886 4.70587 11.4386C4.02253 10.4886 3.47253 9.53862 3.07253 8.59696C2.67253 7.64696 2.47253 6.73862 2.47253 5.87196C2.47253 5.30529 2.57253 4.76362 2.77253 4.26362C2.97253 3.75529 3.2892 3.28862 3.73087 2.87196C4.2642 2.34696 4.84753 2.08862 5.4642 2.08862C5.69753 2.08862 5.93087 2.13862 6.1392 2.23862C6.35587 2.33862 6.54753 2.48862 6.69753 2.70529L8.63087 5.43029C8.78087 5.63862 8.8892 5.83029 8.9642 6.01362C9.0392 6.18862 9.08087 6.36362 9.08087 6.52196C9.08087 6.72196 9.02253 6.92196 8.90587 7.11362C8.79753 7.30529 8.6392 7.50529 8.4392 7.70529L7.80587 8.36362C7.7142 8.45529 7.67253 8.56362 7.67253 8.69696C7.67253 8.76362 7.68087 8.82196 7.69753 8.88862C7.72253 8.95529 7.74753 9.00529 7.7642 9.05529C7.9142 9.33029 8.17253 9.68862 8.5392 10.122C8.9142 10.5553 9.3142 10.997 9.74753 11.4386C10.1975 11.8803 10.6309 12.2886 11.0725 12.6636C11.5059 13.0303 11.8642 13.2803 12.1475 13.4303C12.1892 13.447 12.2392 13.472 12.2975 13.497C12.3642 13.522 12.4309 13.5303 12.5059 13.5303C12.6475 13.5303 12.7559 13.4803 12.8475 13.3886L13.4809 12.7636C13.6892 12.5553 13.8892 12.397 14.0809 12.297C14.2725 12.1803 14.4642 12.122 14.6725 12.122C14.8309 12.122 14.9975 12.1553 15.1809 12.2303C15.3642 12.3053 15.5559 12.4136 15.7642 12.5553L18.5225 14.5136C18.7392 14.6636 18.8892 14.8386 18.9809 15.047C19.0642 15.2553 19.1142 15.4636 19.1142 15.697Z"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeMiterlimit="10"
                                    opacity="0.5"
                                />
                            </svg>
                            <div className={styles['support-content']}>
                                <span style={{ fontSize: '1.4rem', fontWeight: '500' }}>
                                    پشتیبانی: 02125015555
                                </span>
                                <span style={{ fontSize: '1.3rem', fontWeight: '400' }}>
                                    همه روزه 7 الی 24
                                </span>
                            </div>
                        </a>
                    )} */}
                </div>
            )}
            <StatusBar />

            <Modal title="مشاوره آنلاین" isOpen={promoteConsult} onClose={setPromoteConsult}>
                <span>
                    به بیش از 500 پزشک مشاوره آنلاین پذیرش24 بپیوندید و با ویزیت آنلاین، درآمد خود
                    را افزایش دهید
                </span>
                <Button
                    onClick={promoteConsultAction}
                    loading={sendMessageTelegram.isLoading}
                    block
                >
                    درخواست عضویت
                </Button>
            </Modal>
            {/* <Modal
                title="آموزش نسخه نویسی"
                isOpen={learnModal}
                onClose={setLearnModal}
                maxWidth={!isMobile && '50%'}
            >
                <video src="/presc-learn.mp4" autoPlay controls style={{ borderRadius: '1rem' }} />
            </Modal> */}
        </div>
    );
};

export { SideBar };
