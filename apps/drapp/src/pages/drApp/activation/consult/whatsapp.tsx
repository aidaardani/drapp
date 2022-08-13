import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FixedWrapBottom from '@paziresh24/shared/ui/fixedWrapBottom';
import { getSplunkInstance } from '@paziresh24/shared/ui/provider';
import { useConsultActivationStore } from 'apps/drapp/src/store/consultActivation.store';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useActivationStore } from '../activation.store';

const WhatsappConsultActivation = () => {
    const router = useHistory();
    const setWhatsappNumber = useConsultActivationStore(state => state.setWhatsapp);
    const whatsappNumber = useConsultActivationStore(state => state.whatsapp);
    const [fieldError, setFieldError] = useState(false);
    const setSelectedService = useActivationStore(state => state.setSelectedService);

    useEffect(() => {
        setSelectedService(prev => prev.filter(service => service !== 'consult'));
    }, []);

    const handleSubmit = () => {
        if (whatsappNumber.length === 0 || whatsappNumber.length < 10) {
            setFieldError(true);
            return;
        }
        getSplunkInstance().sendEvent({
            group: 'activation-consult-whatsapp',
            type: 'click-whatsapp-num',
            event: {
                action: 'done'
            }
        });
        router.push(`/activation/consult/cost/`);
    };

    return (
        <Container
            maxWidth="sm"
            className="h-full md:h-auto md:p-5 rounded-md pt-4 bg-white md:mt-8 md:shadow-2xl md:shadow-slate-300 flex flex-col space-y-5"
        >
            <Typography>
                ویزیت آنلاین در بستر whatsapp business به هر یک از طرق text، video call، call که
                پزشک و بیمار به توافق برسند برقرار می گردد.
            </Typography>
            <TextField
                fullWidth
                label="شماره whatsapp business"
                inputProps={{
                    inputMode: 'tel',
                    style: { textAlign: 'left', direction: 'ltr' }
                }}
                error={fieldError}
                placeholder="09123456789"
                onFocus={() => setFieldError(false)}
                value={whatsappNumber}
                helperText={fieldError ? 'شماره whatsapp business را به درستی وارد کنید.' : ''}
                onChange={e => setWhatsappNumber(e.target.value)}
                onClick={() => {
                    getSplunkInstance().sendEvent({
                        group: 'activation-consult-whatsapp',
                        type: 'click-whatsapp-num'
                    });
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.9803 11.4104C21.6403 5.61044 16.3703 1.14045 10.3003 2.14045C6.12029 2.83045 2.77029 6.22043 2.12029 10.4004C1.74029 12.8204 2.24031 15.1104 3.33031 17.0004L2.4403 20.3104C2.2403 21.0604 2.93028 21.7404 3.67028 21.5304L6.93029 20.6304C8.41029 21.5004 10.1403 22.0004 11.9903 22.0004C17.6303 22.0004 22.3103 17.0304 21.9803 11.4104ZM16.8803 15.7204C16.7903 15.9004 16.6803 16.0704 16.5403 16.2304C16.2903 16.5004 16.0203 16.7004 15.7203 16.8204C15.4203 16.9504 15.0903 17.0104 14.7403 17.0104C14.2303 17.0104 13.6803 16.8905 13.1103 16.6405C12.5303 16.3905 11.9603 16.0604 11.3903 15.6504C10.8103 15.2304 10.2703 14.7604 9.7503 14.2504C9.2303 13.7304 8.77027 13.1804 8.35027 12.6104C7.94027 12.0404 7.61029 11.4704 7.37029 10.9004C7.13029 10.3304 7.01031 9.78045 7.01031 9.26045C7.01031 8.92044 7.0703 8.59044 7.1903 8.29044C7.3103 7.98044 7.50032 7.70045 7.77032 7.45045C8.09032 7.13045 8.4403 6.98045 8.8103 6.98045C8.95029 6.98045 9.09027 7.01044 9.22027 7.07044C9.35027 7.13044 9.47029 7.22044 9.5603 7.35044L10.7203 8.99043C10.8103 9.12043 10.8803 9.23043 10.9203 9.34043C10.9703 9.45043 10.9903 9.55043 10.9903 9.65043C10.9903 9.77043 10.9503 9.89045 10.8803 10.0104C10.8103 10.1304 10.7203 10.2504 10.6003 10.3704L10.2203 10.7704C10.1603 10.8304 10.1403 10.8904 10.1403 10.9704C10.1403 11.0104 10.1503 11.0504 10.1603 11.0904C10.1803 11.1304 10.1903 11.1604 10.2003 11.1904C10.2903 11.3604 10.4503 11.5704 10.6703 11.8304C10.9003 12.0904 11.1403 12.3604 11.4003 12.6204C11.6703 12.8904 11.9303 13.1304 12.2003 13.3604C12.4603 13.5804 12.6803 13.7304 12.8503 13.8204C12.8803 13.8304 12.9103 13.8504 12.9403 13.8604C12.9803 13.8804 13.0203 13.8804 13.0703 13.8804C13.1603 13.8804 13.2203 13.8504 13.2803 13.7904L13.6603 13.4104C13.7903 13.2804 13.9103 13.1904 14.0203 13.1304C14.1403 13.0604 14.2503 13.0204 14.3803 13.0204C14.4803 13.0204 14.5803 13.0404 14.6903 13.0904C14.8003 13.1404 14.9203 13.2004 15.0403 13.2904L16.7003 14.4704C16.8303 14.5604 16.9203 14.6704 16.9803 14.7904C17.0303 14.9204 17.0603 15.0404 17.0603 15.1804C17.0003 15.3504 16.9603 15.5404 16.8803 15.7204Z"
                                    fill="black"
                                />
                            </svg>
                        </InputAdornment>
                    )
                }}
            />
            <FixedWrapBottom className="border-t border-solid !bottom-0 border-[#e8ecf0]">
                <Button fullWidth variant="contained" size="large" onClick={handleSubmit}>
                    ادامه
                </Button>
            </FixedWrapBottom>
        </Container>
    );
};

export default WhatsappConsultActivation;
