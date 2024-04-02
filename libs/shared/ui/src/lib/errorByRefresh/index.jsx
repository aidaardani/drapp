import styles from './errorByRefresh.module.scss';
import { CSSTransition } from 'react-transition-group';

const ErrorByRefresh = ({ show, blur, error }) => {
    return (
        <CSSTransition in={show} timeout={300} classNames="fade-loading" unmountOnExit>
            <div className={`${styles['wrapper']} ${blur && styles.blur}`}>
                <div
                    className={styles.reloadButton}
                    onClick={() => window.location.reload()}
                    aria-hidden
                >
                    <svg
                        width="17"
                        height="20"
                        viewBox="0 0 19 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.54418 6.1764C5.27974 6.1764 4.99977 6.08307 4.782 5.89641C4.2998 5.47643 4.25312 4.72979 4.6731 4.24759L7.27078 1.27658C7.69077 0.794375 8.4374 0.732155 8.91961 1.16769C9.40181 1.58768 9.44849 2.33431 9.0285 2.81652L6.43082 5.78753C6.18195 6.03641 5.87083 6.1764 5.54418 6.1764Z"
                            fill="#000"
                        />
                        <path
                            d="M8.56591 8.3851C8.33258 8.3851 8.0837 8.30733 7.88149 8.16733L4.86382 5.95853C4.3505 5.58521 4.22608 4.85412 4.61495 4.32525C4.98827 3.81193 5.71936 3.6875 6.24823 4.07638L9.26588 6.28518C9.77919 6.6585 9.90364 7.38958 9.51476 7.91845C9.28144 8.21399 8.92367 8.3851 8.56591 8.3851Z"
                            fill="#000"
                        />
                        <path
                            d="M9.2488 21.125C4.31787 21.125 0.304688 17.1118 0.304688 12.1809C0.304688 10.4076 0.818004 8.68099 1.81352 7.21882C2.17129 6.68995 2.90236 6.5344 3.43123 6.89217C3.9601 7.24993 4.11566 7.98102 3.7579 8.50989C3.02681 9.59874 2.65348 10.8742 2.65348 12.1809C2.65348 15.8207 5.62448 18.7917 9.26435 18.7917C12.9042 18.7917 15.8752 15.8207 15.8752 12.1809C15.8752 8.541 12.9042 5.57 9.26435 5.57C8.4866 5.57 7.73997 5.67888 7.00888 5.89665C6.40224 6.08331 5.74892 5.7411 5.54671 5.1189C5.36005 4.4967 5.70226 3.84339 6.32446 3.65673C7.27331 3.36118 8.25328 3.22119 9.26435 3.22119C14.1953 3.22119 18.2085 7.23438 18.2085 12.1653C18.2085 17.0962 14.1797 21.125 9.2488 21.125Z"
                            fill="#000"
                        />
                    </svg>

                    <span>تلاش مجدد</span>
                </div>
                <span className={styles.text}>
                    {error?.message
                        ? `یک خطای غیرمنتظره رخ داد: ${error?.message}`
                        : 'در دریافت اطلاعات مشکلی پیش آمده است.'}
                </span>
                <a
                    className={styles['support-wrapper']}
                    href="https://support.paziresh24.com/?utm_source=drpanel&utm_medium=p24&utm_campaign=telblock"
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 1000 1000"
                        enableBackground="new 0 0 1000 1000"
                        className="w-6 h-6"
                    >
                        <g>
                            <path d="M520.1,10c9.2,0.9,18.3,1.7,27.5,2.6c60.9,6.5,118.2,24.8,170.9,56.1c103.4,61.3,171.2,150.1,203,266.1c9.7,35.3,14.1,71.4,14.3,108c0.1,36.9,0,73.8,0,110.7c0,17.7-4.1,34.3-11.7,50.3c-3,6.3-4.3,13.5-6.3,20.3c-45.1,153.2-172.9,270.5-329.8,302.5c-10.8,2.2-21.7,3.9-32.6,5.3c-3.7,0.5-4.9,2.3-6.1,5.4c-12.7,33.5-45,54.4-81,52.6c-34.8-1.7-65.2-26.6-74.2-60.6c-10.8-40.7,11.1-82.8,50.7-97.5c39.4-14.6,83.6,3.2,101.8,41.3c1.9,4.1,4,5,8.2,4.3c131.7-22.1,227.9-92.8,288.8-211.5c0.5-1,1-2.1,1.8-3.8c-4.3,0.4-8,1-11.7,1.2c-62.9,3.5-115.3-45.8-115.5-108.7c-0.1-36.1-0.1-72.3,0-108.4c0.1-63.1,52.1-112.6,115-109c10.4,0.6,20.7,4,31,6.2c1,0.2,1.9,0.6,3.1,1C833,208.2,700.3,69.3,509.7,64.7c-195.5-4.8-339.1,133.3-376.5,279c7.5-1.8,15-4.1,22.7-5.5c56.9-10.5,115.1,30.3,124.5,87.4c1.2,7.3,1.8,14.7,1.8,22.1c0.2,35.4,0.2,70.8,0.1,106.2c-0.2,52.6-35.6,96.2-86.9,107.3c-59.2,12.8-119.1-27.9-129-87.7c-1-6.1-1.7-12.3-1.7-18.5c-0.1-38.1-0.9-76.2,0.1-114.3c3.5-139.5,60.2-253,169.4-339.7C290,56.6,353.8,29.1,424,16.7c16.9-3,34.2-4,51.3-6c1.6-0.2,3.2-0.5,4.9-0.8C493.5,10,506.8,10,520.1,10z M227.9,500.5c0-18,0-36,0-54c-0.1-31.1-24.1-55.4-54.5-55.4c-30.2,0-54.3,24.4-54.3,55.1c-0.1,35.8-0.1,71.7,0,107.5c0,4.2,0.4,8.5,1.3,12.6c6.1,27,31.6,45.4,58.4,42.4c28.2-3.2,48.9-26,49.1-54.2C228,536.4,227.9,518.4,227.9,500.5z M772.4,500c0,17.8-0.1,35.7,0.1,53.5c0,4.3,0.4,8.8,1.4,13c6.3,27,31.9,45.3,58.5,42.1c28.4-3.4,48.8-26.1,48.9-54.5c0.1-36.1,0.1-72.3,0-108.4c0-4.2-0.5-8.5-1.5-12.6c-6.3-26.8-31.6-44.9-58.3-41.9c-28.3,3.2-48.9,26-49.1,54.3C772.3,463.7,772.4,481.9,772.4,500z" />
                        </g>
                    </svg>
                    <div className={styles['support-content']}>
                        <span style={{ fontSize: '1rem', fontWeight: '600' }}>
                            ارتباط با پشتیبانی
                        </span>
                    </div>
                </a>
            </div>
        </CSSTransition>
    );
};

export default ErrorByRefresh;
