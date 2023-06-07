import { useMutation, useQuery } from 'react-query';
import { workflow } from '../workflow.client';

export interface Params {
    bookId: string;
}

export const establishingSecureCall = async ({ bookId }: Params) => {
    return await workflow.post(`/webhook/483835a3-d567-47e6-adfb-fe698f9eb2c6/safe-call/${bookId}`);
};

export const useEstablishingSecureCall = () => {
    return useMutation(establishingSecureCall);
};
