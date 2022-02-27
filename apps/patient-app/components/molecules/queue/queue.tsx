import { useGetPagingBook } from '../../../apis/getPagingBook/hook';
import { Text } from '../../atoms/text/text';
import { useEffect } from 'react';
import Loader from '../../atoms/loader';
import { convertToTime } from '@paziresh24/utils';

interface QueueProps {
    bookId: string;
}

export const Queue: React.FC<QueueProps> = props => {
    const { bookId } = props;
    const { isLoading, isSuccess, data: pagingBookData, mutate } = useGetPagingBook();

    useEffect(() => {
        if (bookId) mutate({ book_id: bookId });
    }, [bookId]);

    if (isLoading)
        return (
            <div className="h-64 flex flex-col justify-center items-center">
                <Loader />
            </div>
        );

    if (isSuccess && pagingBookData.data.status === 2)
        return (
            <div className="h-64 flex flex-col justify-center items-center p-6">
                <div className="bg-[#f3f7fa] h-full w-full flex flex-col justify-center items-center rounded-xl space-y-5">
                    <svg
                        width="43"
                        height="43"
                        viewBox="0 0 43 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M17.1667 1.79169C17.1667 1.37748 17.5025 1.04169 17.9167 1.04169L25.0834 1.04169C25.4976 1.04169 25.8334 1.37748 25.8334 1.79169C25.8334 2.2059 25.4976 2.54169 25.0834 2.54169L17.9167 2.54169C17.5025 2.54169 17.1667 2.2059 17.1667 1.79169ZM6.12504 23.2917C6.12504 14.8003 13.0087 7.91669 21.5 7.91669C29.9914 7.91669 36.875 14.8003 36.875 23.2917C36.875 31.7831 29.9914 38.6667 21.5 38.6667L12.5417 38.6667C12.1275 38.6667 11.7917 39.0025 11.7917 39.4167C11.7917 39.8309 12.1275 40.1667 12.5417 40.1667L21.5 40.1667C30.8198 40.1667 38.375 32.6115 38.375 23.2917C38.375 13.9719 30.8198 6.41669 21.5 6.41669C12.1802 6.41669 4.62504 13.9719 4.62504 23.2917C4.62504 23.7059 4.96082 24.0417 5.37504 24.0417C5.78925 24.0417 6.12504 23.7059 6.12504 23.2917ZM2.83337 28.6667C2.83337 28.2525 3.16916 27.9167 3.58337 27.9167L12.5417 27.9167C12.9559 27.9167 13.2917 28.2525 13.2917 28.6667C13.2917 29.0809 12.9559 29.4167 12.5417 29.4167L3.58337 29.4167C3.16916 29.4167 2.83337 29.0809 2.83337 28.6667ZM6.4167 34.0417C6.4167 33.6275 6.75249 33.2917 7.1667 33.2917L17.9167 33.2917C18.3309 33.2917 18.6667 33.6275 18.6667 34.0417C18.6667 34.4559 18.3309 34.7917 17.9167 34.7917L7.1667 34.7917C6.75249 34.7917 6.4167 34.4559 6.4167 34.0417ZM22.25 17.9167C22.25 17.5025 21.9143 17.1667 21.5 17.1667C21.0858 17.1667 20.75 17.5025 20.75 17.9167L20.75 25.0834C20.75 25.4976 21.0858 25.8334 21.5 25.8334C21.9143 25.8334 22.25 25.4976 22.25 25.0834L22.25 17.9167Z"
                            fill="#22282F"
                        />
                    </svg>
                    <Text
                        fontWeight="medium"
                        className="px-8 text-center line-height-1 flex flex-col"
                    >
                        {pagingBookData.data.message}
                    </Text>
                </div>
            </div>
        );

    if (isSuccess && pagingBookData.data.status != 2 && pagingBookData.data.status != 1)
        return (
            <div className="h-64 flex flex-col justify-center items-center p-6">
                <div className="bg-[#f3f7fa] h-full w-full flex flex-col justify-center items-center rounded-xl space-y-5">
                    <Text
                        fontWeight="medium"
                        className="px-8 text-center line-height-1 flex flex-col"
                    >
                        {pagingBookData.data.message}
                    </Text>
                </div>
            </div>
        );

    if (isSuccess && pagingBookData.data.status == 1)
        return (
            <div className="flex flex-col items-center space-y-3 p-5">
                <Text fontWeight="bold" className="mb-2">
                    شماره نوبت شما
                </Text>
                <div className="flex flex-col w-full space-y-4">
                    <div className="flex flex-col justify-center items-center p-6 border border-primary rounded-lg">
                        {pagingBookData.data.booking_queue.message && (
                            <>
                                <div className="flex justify-center items-center w-14 h-14 rounded-md bg-[#756E6E] mb-4">
                                    <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.72971 0.207278C5.02945 0.493163 5.04068 0.967904 4.75479 1.26764L1.29272 4.89746C1.00684 5.1972 0.532098 5.20843 0.232361 4.92255C-0.0673769 4.63666 -0.0786067 4.16192 0.207278 3.86218L3.66934 0.232361C3.95523 -0.0673769 4.42997 -0.0786067 4.72971 0.207278ZM2.65404 12.8493C2.65404 7.21564 7.00137 2.7099 12.2903 2.7099C17.5792 2.7099 21.9265 7.21564 21.9265 12.8493C21.9265 18.483 17.5792 22.9887 12.2903 22.9887C7.00137 22.9887 2.65404 18.483 2.65404 12.8493ZM12.2903 1.2099C6.10686 1.2099 1.15404 6.45487 1.15404 12.8493C1.15404 19.2437 6.10686 24.4887 12.2903 24.4887C18.4737 24.4887 23.4265 19.2437 23.4265 12.8493C23.4265 6.45487 18.4737 1.2099 12.2903 1.2099ZM13.0403 8.00958C13.0403 7.59537 12.7045 7.25958 12.2903 7.25958C11.8761 7.25958 11.5403 7.59537 11.5403 8.00958V12.8493C11.5403 13.0942 11.6599 13.3237 11.8606 13.464L15.3227 15.8839C15.6622 16.1212 16.1298 16.0383 16.3671 15.6988C16.6044 15.3593 16.5215 14.8917 16.182 14.6544L13.0403 12.4585V8.00958ZM19.8258 1.26764C19.5399 0.967904 19.5511 0.493163 19.8509 0.207278C20.1506 -0.0786067 20.6253 -0.0673769 20.9112 0.232361L24.3733 3.86218C24.6592 4.16192 24.6479 4.63666 24.3482 4.92255C24.0485 5.20843 23.5737 5.1972 23.2878 4.89746L19.8258 1.26764Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <Text>{pagingBookData.data.booking_queue.message}</Text>
                            </>
                        )}
                        {!pagingBookData.data.booking_queue.message && (
                            <>
                                <div className="flex justify-center items-center w-14 h-14 rounded-md bg-primary text-white mb-4">
                                    <Text fontSize="xl" fontWeight="bold">
                                        {pagingBookData.data.booking_queue.no}
                                    </Text>
                                </div>
                                <Text fontSize="base" fontWeight="bold">
                                    شما نفر {pagingBookData.data.booking_queue.no} صف پزشک می باشید
                                </Text>
                                <div className="flex flex-col self-start mt-5 space-y-3">
                                    <div className="flex items-center space-s-1">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M9.41667 1.08334C9.41667 0.66913 9.08088 0.333343 8.66667 0.333344C8.25245 0.333344 7.91667 0.66913 7.91667 1.08334V2.25749C7.57201 2.26363 7.26038 2.27483 6.97807 2.29521C6.33392 2.34172 5.76537 2.43983 5.2304 2.67604C4.09037 3.17941 3.1794 4.09037 2.67603 5.23041C2.43982 5.76538 2.34171 6.33393 2.2952 6.97808C2.24999 7.6043 2.24999 8.3748 2.25 9.33001L2.25 9.36766V14.75L2.25 14.8232C2.24997 16.6466 2.24995 18.1164 2.40537 19.2723C2.56672 20.4725 2.91191 21.483 3.71447 22.2855C4.51702 23.0881 5.52752 23.4333 6.72767 23.5946C7.88362 23.7501 9.35336 23.75 11.1768 23.75H11.25H14.75H14.8232C16.6466 23.75 18.1164 23.7501 19.2723 23.5946C20.4725 23.4333 21.483 23.0881 22.2855 22.2855C23.0881 21.483 23.4333 20.4725 23.5946 19.2723C23.7501 18.1164 23.75 16.6466 23.75 14.8232V14.75V11.25V11.1768C23.75 9.35337 23.7501 7.88362 23.5946 6.72767C23.4333 5.52753 23.0881 4.51703 22.2855 3.71448C21.483 2.91192 20.4725 2.56673 19.2723 2.40537C18.9077 2.35634 18.5117 2.32278 18.0833 2.29981V1.08334C18.0833 0.66913 17.7475 0.333343 17.3333 0.333344C16.9191 0.333344 16.5833 0.66913 16.5833 1.08334V2.25634C16.0375 2.24999 15.4513 2.25 14.8232 2.25001L14.75 2.25001H9.41667V1.08334ZM16.5833 4.33334V4.25671C16.0379 4.25028 15.4306 4.25001 14.75 4.25001H9.41667V4.33334C9.41667 4.74756 9.08088 5.08334 8.66667 5.08334C8.25245 5.08334 7.91667 4.74756 7.91667 4.33334V4.25779C7.61614 4.26343 7.3552 4.27319 7.1221 4.29002C6.58613 4.32871 6.27516 4.40102 6.03824 4.50563C5.35422 4.80765 4.80764 5.35423 4.50562 6.03825C4.40101 6.27517 4.32871 6.58614 4.29001 7.12211C4.25061 7.6678 4.25 8.366 4.25 9.36766V14.75C4.25 16.6639 4.25213 17.9987 4.38753 19.0058C4.51907 19.9842 4.75966 20.5023 5.12868 20.8713C5.4977 21.2403 6.01579 21.4809 6.99416 21.6125C8.0013 21.7479 9.33611 21.75 11.25 21.75H14.75C16.6639 21.75 17.9987 21.7479 19.0058 21.6125C19.9842 21.4809 20.5023 21.2403 20.8713 20.8713C21.2403 20.5023 21.4809 19.9842 21.6125 19.0058C21.7479 17.9987 21.75 16.6639 21.75 14.75V11.25C21.75 9.33612 21.7479 8.0013 21.6125 6.99417C21.4809 6.0158 21.2403 5.49771 20.8713 5.12869C20.5023 4.75967 19.9842 4.51908 19.0058 4.38754C18.7255 4.34985 18.4198 4.32249 18.0833 4.30263V4.33334C18.0833 4.74756 17.7475 5.08334 17.3333 5.08334C16.9191 5.08334 16.5833 4.74756 16.5833 4.33334ZM7.58335 7.91668C7.16913 7.91668 6.83335 8.25246 6.83335 8.66668C6.83335 9.08089 7.16913 9.41668 7.58335 9.41668H18.4167C18.8309 9.41668 19.1667 9.08089 19.1667 8.66668C19.1667 8.25246 18.8309 7.91668 18.4167 7.91668H7.58335ZM9.75001 13C9.75001 13.5983 9.26499 14.0833 8.66668 14.0833C8.06837 14.0833 7.58335 13.5983 7.58335 13C7.58335 12.4017 8.06837 11.9167 8.66668 11.9167C9.26499 11.9167 9.75001 12.4017 9.75001 13ZM8.66668 18.4167C9.26499 18.4167 9.75001 17.9317 9.75001 17.3333C9.75001 16.735 9.26499 16.25 8.66668 16.25C8.06837 16.25 7.58335 16.735 7.58335 17.3333C7.58335 17.9317 8.06837 18.4167 8.66668 18.4167ZM14.0833 17.3333C14.0833 17.9317 13.5983 18.4167 13 18.4167C12.4017 18.4167 11.9167 17.9317 11.9167 17.3333C11.9167 16.735 12.4017 16.25 13 16.25C13.5983 16.25 14.0833 16.735 14.0833 17.3333ZM17.3333 18.4167C17.9317 18.4167 18.4167 17.9317 18.4167 17.3333C18.4167 16.735 17.9317 16.25 17.3333 16.25C16.735 16.25 16.25 16.735 16.25 17.3333C16.25 17.9317 16.735 18.4167 17.3333 18.4167ZM14.0833 13C14.0833 13.5983 13.5983 14.0833 13 14.0833C12.4017 14.0833 11.9167 13.5983 11.9167 13C11.9167 12.4017 12.4017 11.9167 13 11.9167C13.5983 11.9167 14.0833 12.4017 14.0833 13ZM17.3333 14.0833C17.9317 14.0833 18.4167 13.5983 18.4167 13C18.4167 12.4017 17.9317 11.9167 17.3333 11.9167C16.735 11.9167 16.25 12.4017 16.25 13C16.25 13.5983 16.735 14.0833 17.3333 14.0833Z"
                                                fill="#0077DB"
                                            />
                                        </svg>
                                        <Text fontSize="sm">بازه تقریبی حضور شما در مرکز:</Text>
                                        <Text fontSize="sm" fontWeight="bold">
                                            {convertToTime(
                                                pagingBookData.data.booking_queue.attendance_time
                                            )}
                                        </Text>
                                    </div>
                                    <div className="flex items-center space-s-1">
                                        <svg
                                            width="26"
                                            height="26"
                                            viewBox="0 0 26 26"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.66667 0.333344C9.08088 0.333343 9.41667 0.66913 9.41667 1.08334V2.25041C9.62385 2.25001 9.83813 2.25001 10.0598 2.25001H10.0598L10.1111 2.25001H14.75L14.8232 2.25001C15.4513 2.25 16.0375 2.24999 16.5833 2.25634V1.08334C16.5833 0.66913 16.9191 0.333344 17.3333 0.333344C17.7475 0.333343 18.0833 0.66913 18.0833 1.08334V2.29981C18.5117 2.32278 18.9077 2.35634 19.2723 2.40537C20.4725 2.56673 21.483 2.91192 22.2855 3.71448C23.0881 4.51703 23.4333 5.52753 23.5946 6.72767C23.7501 7.88362 23.75 9.35337 23.75 11.1768V11.25V14.75V14.8232C23.75 16.6466 23.7501 18.1164 23.5946 19.2723C23.4333 20.4725 23.0881 21.483 22.2855 22.2855C21.483 23.0881 20.4725 23.4333 19.2723 23.5946C18.1164 23.7501 16.6466 23.75 14.8232 23.75H14.75H11.25H11.1768C9.35336 23.75 7.88362 23.7501 6.72767 23.5946C5.52752 23.4333 4.51702 23.0881 3.71447 22.2855C2.91191 21.483 2.56672 20.4725 2.40537 19.2723C2.24995 18.1164 2.24997 16.6466 2.25 14.8232L2.25 14.75V10.1111L2.25 10.0598V10.0598C2.24999 8.76496 2.24998 7.72075 2.33153 6.88099C2.41566 6.01473 2.59392 5.26103 3.01846 4.58655C3.41719 3.95307 3.95306 3.4172 4.58654 3.01846C5.26102 2.59393 6.01472 2.41567 6.88098 2.33154C7.19653 2.30089 7.54094 2.28177 7.91667 2.26983V1.08334C7.91667 0.66913 8.25245 0.333344 8.66667 0.333344ZM16.5833 4.25671V4.33334C16.5833 4.74756 16.9191 5.08334 17.3333 5.08334C17.7476 5.08334 18.0833 4.74756 18.0833 4.33334V4.30263C18.4198 4.32249 18.7255 4.34985 19.0058 4.38754C19.9842 4.51908 20.5023 4.75967 20.8713 5.12869C21.2403 5.49771 21.4809 6.0158 21.6125 6.99417C21.7479 8.0013 21.75 9.33612 21.75 11.25V14.75C21.75 16.6639 21.7479 17.9987 21.6125 19.0058C21.4809 19.9842 21.2403 20.5023 20.8713 20.8713C20.5023 21.2403 19.9842 21.4809 19.0058 21.6125C17.9987 21.7479 16.6639 21.75 14.75 21.75H11.25C9.33611 21.75 8.0013 21.7479 6.99416 21.6125C6.01579 21.4809 5.4977 21.2403 5.12868 20.8713C4.75966 20.5023 4.51907 19.9842 4.38753 19.0058C4.25213 17.9987 4.25 16.6639 4.25 14.75V10.1111C4.25 8.75292 4.2511 7.80604 4.32216 7.07431C4.39173 6.358 4.52085 5.95416 4.71107 5.65193C4.95031 5.27185 5.27184 4.95032 5.65193 4.71108C5.95415 4.52085 6.35799 4.39174 7.0743 4.32217C7.32679 4.29765 7.60489 4.28146 7.91667 4.27077V4.33334C7.91667 4.74756 8.25246 5.08334 8.66667 5.08334C9.08088 5.08334 9.41667 4.74756 9.41667 4.33334V4.25052C9.63559 4.25005 9.86669 4.25001 10.1111 4.25001H14.75C15.4306 4.25001 16.0379 4.25028 16.5833 4.25671ZM13 8.33334C12.2176 8.33334 11.5833 8.96761 11.5833 9.75001C11.5833 10.5324 12.2176 11.1667 13 11.1667C13.7824 11.1667 14.4167 10.5324 14.4167 9.75001C14.4167 8.96761 13.7824 8.33334 13 8.33334ZM10.0833 9.75001C10.0833 8.13918 11.3892 6.83334 13 6.83334C14.6108 6.83334 15.9167 8.13918 15.9167 9.75001C15.9167 11.3608 14.6108 12.6667 13 12.6667C11.3892 12.6667 10.0833 11.3608 10.0833 9.75001ZM10.8333 14.4167C9.2225 14.4167 7.91667 15.7225 7.91667 17.3333C7.91667 18.3459 8.73748 19.1667 9.75 19.1667H16.25C17.2625 19.1667 18.0833 18.3459 18.0833 17.3333C18.0833 15.7225 16.7775 14.4167 15.1667 14.4167H10.8333ZM9.41667 17.3333C9.41667 16.5509 10.0509 15.9167 10.8333 15.9167H15.1667C15.9491 15.9167 16.5833 16.5509 16.5833 17.3333C16.5833 17.5174 16.4341 17.6667 16.25 17.6667H9.75C9.56591 17.6667 9.41667 17.5174 9.41667 17.3333Z"
                                                fill="#0077DB"
                                            />
                                        </svg>

                                        <Text fontSize="sm">تعداد نفرات قبل از شما:</Text>
                                        <Text fontSize="sm" fontWeight="bold">
                                            {pagingBookData.data.booking_queue.waiting} نفر
                                        </Text>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col justify-center items-center p-6 border border-primary rounded-lg">
                        {pagingBookData.data.acceptance_queue.message && (
                            <>
                                <div className="flex justify-center items-center w-14 h-14 rounded-md bg-[#756E6E] mb-4">
                                    <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.72971 0.207278C5.02945 0.493163 5.04068 0.967904 4.75479 1.26764L1.29272 4.89746C1.00684 5.1972 0.532098 5.20843 0.232361 4.92255C-0.0673769 4.63666 -0.0786067 4.16192 0.207278 3.86218L3.66934 0.232361C3.95523 -0.0673769 4.42997 -0.0786067 4.72971 0.207278ZM2.65404 12.8493C2.65404 7.21564 7.00137 2.7099 12.2903 2.7099C17.5792 2.7099 21.9265 7.21564 21.9265 12.8493C21.9265 18.483 17.5792 22.9887 12.2903 22.9887C7.00137 22.9887 2.65404 18.483 2.65404 12.8493ZM12.2903 1.2099C6.10686 1.2099 1.15404 6.45487 1.15404 12.8493C1.15404 19.2437 6.10686 24.4887 12.2903 24.4887C18.4737 24.4887 23.4265 19.2437 23.4265 12.8493C23.4265 6.45487 18.4737 1.2099 12.2903 1.2099ZM13.0403 8.00958C13.0403 7.59537 12.7045 7.25958 12.2903 7.25958C11.8761 7.25958 11.5403 7.59537 11.5403 8.00958V12.8493C11.5403 13.0942 11.6599 13.3237 11.8606 13.464L15.3227 15.8839C15.6622 16.1212 16.1298 16.0383 16.3671 15.6988C16.6044 15.3593 16.5215 14.8917 16.182 14.6544L13.0403 12.4585V8.00958ZM19.8258 1.26764C19.5399 0.967904 19.5511 0.493163 19.8509 0.207278C20.1506 -0.0786067 20.6253 -0.0673769 20.9112 0.232361L24.3733 3.86218C24.6592 4.16192 24.6479 4.63666 24.3482 4.92255C24.0485 5.20843 23.5737 5.1972 23.2878 4.89746L19.8258 1.26764Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <Text>{pagingBookData.data.acceptance_queue.message}</Text>
                            </>
                        )}
                        {!pagingBookData.data.acceptance_queue.message && (
                            <>
                                <div className="flex justify-center items-center w-14 h-14 rounded-md bg-primary text-white mb-4">
                                    <Text fontSize="xl" fontWeight="bold">
                                        {pagingBookData.data.acceptance_queue.no}
                                    </Text>
                                </div>
                                <Text fontSize="base" fontWeight="bold">
                                    شما نفر {pagingBookData.data.acceptance_queue.no} صف پذیرش می
                                    باشید
                                </Text>
                            </>
                        )}
                    </div>
                </div>
                <div className="bg-gray flex flex-col p-4 rounded-lg space-y-2 text-justify w-full">
                    <Text fontSize="sm">
                        1- لطفا 30 دقیقه زودتر از بازه اعلام شده به شما، جهت انجام امور مربوط به
                        پذیرش در مرکز حضور داشته باشید.
                    </Text>
                    <Text fontSize="sm">
                        2- زمان تقریبی اعلام شده ممکن است به علت عدم حضور بیماران و یا تاخیر پزشک،
                        با زمان نوبت شما متفاوت باشد یا تغییر کند
                    </Text>
                </div>
            </div>
        );

    return null;
};

export default Queue;
