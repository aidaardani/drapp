const CalendarIcon = ({ color = '27BDA0', ...rest }) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <rect
                x="2.63989"
                y="3.49097"
                width="15"
                height="14"
                rx="4"
                fill={color}
                fillOpacity="0"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.41668 1.59094C7.41668 1.17673 7.08089 0.840942 6.66668 0.840942C6.25247 0.840942 5.91668 1.17673 5.91668 1.59094V2.54303C5.89207 2.54591 5.86779 2.54901 5.84377 2.55236C3.7414 2.84563 2.08883 4.49821 1.79556 6.60057C1.7499 6.92787 1.74994 7.30407 1.75 7.89547L1.75001 7.96269V10.7568L1.75001 10.8057C1.75 12.408 1.74999 13.6773 1.86869 14.6816C1.99055 15.7125 2.24639 16.5612 2.82821 17.2702C3.02559 17.5107 3.24613 17.7312 3.48664 17.9286C4.19559 18.5104 5.04429 18.7663 6.07526 18.8881C7.07948 19.0068 8.34883 19.0068 9.9511 19.0068H10H10.0489C11.6512 19.0068 12.9205 19.0068 13.9248 18.8881C14.9557 18.7663 15.8044 18.5104 16.5134 17.9286C16.7539 17.7312 16.9744 17.5107 17.1718 17.2702C17.7536 16.5612 18.0095 15.7125 18.1313 14.6816C18.25 13.6773 18.25 12.408 18.25 10.8057V10.7568V10.7079C18.25 9.10564 18.25 7.83628 18.1313 6.83206C18.0095 5.80109 17.7536 4.95239 17.1718 4.24344C16.9744 4.00293 16.7539 3.78239 16.5134 3.58501C15.8411 3.0333 15.0432 2.7747 14.0833 2.64551V1.59094C14.0833 1.17673 13.7475 0.840942 13.3333 0.840942C12.9191 0.840942 12.5833 1.17673 12.5833 1.59094V2.53227C11.8482 2.5068 11.0082 2.5068 10.0489 2.50681H10.0489L10 2.50681H7.41668V1.59094ZM12.5833 4.09175V4.03308C11.8742 4.00728 11.0294 4.00681 10 4.00681H7.41668V4.09175C7.41668 4.50596 7.08089 4.84175 6.66668 4.84175C6.25247 4.84175 5.91668 4.50596 5.91668 4.09175V4.05956C4.54258 4.30981 3.47554 5.41443 3.28118 6.8078C3.25182 7.01823 3.25001 7.28176 3.25001 7.96269V10.7568C3.25001 12.4189 3.25124 13.5996 3.35832 14.5055C3.46344 15.3948 3.66158 15.9212 3.98773 16.3186C4.12278 16.4832 4.27367 16.634 4.43823 16.7691C4.83563 17.0952 5.36198 17.2934 6.25134 17.3985C7.15725 17.5056 8.3379 17.5068 10 17.5068C11.6621 17.5068 12.8428 17.5056 13.7487 17.3985C14.638 17.2934 15.1644 17.0952 15.5618 16.7691C15.7263 16.634 15.8772 16.4832 16.0123 16.3186C16.3384 15.9212 16.5366 15.3948 16.6417 14.5055C16.7488 13.5996 16.75 12.4189 16.75 10.7568C16.75 9.0947 16.7488 7.91405 16.6417 7.00814C16.5366 6.11878 16.3384 5.59244 16.0123 5.19503C15.8772 5.03047 15.7263 4.87958 15.5618 4.74453C15.2165 4.46113 14.7738 4.27438 14.0801 4.16132C14.045 4.54292 13.7241 4.84175 13.3333 4.84175C12.9191 4.84175 12.5833 4.50596 12.5833 4.09175ZM5.83334 6.67429C5.41913 6.67429 5.08334 7.01007 5.08334 7.42429C5.08334 7.8385 5.41913 8.17429 5.83334 8.17429H14.1667C14.5809 8.17429 14.9167 7.8385 14.9167 7.42429C14.9167 7.01007 14.5809 6.67429 14.1667 6.67429H5.83334ZM7.50001 10.7576C7.50001 11.2179 7.12692 11.5909 6.66668 11.5909C6.20644 11.5909 5.83334 11.2179 5.83334 10.7576C5.83334 10.2974 6.20644 9.92428 6.66668 9.92428C7.12692 9.92428 7.50001 10.2974 7.50001 10.7576ZM6.66668 14.9243C7.12692 14.9243 7.50001 14.5512 7.50001 14.0909C7.50001 13.6307 7.12692 13.2576 6.66668 13.2576C6.20644 13.2576 5.83334 13.6307 5.83334 14.0909C5.83334 14.5512 6.20644 14.9243 6.66668 14.9243ZM10.8334 14.0909C10.8334 14.5512 10.4603 14.9243 10 14.9243C9.53978 14.9243 9.16669 14.5512 9.16669 14.0909C9.16669 13.6307 9.53978 13.2576 10 13.2576C10.4603 13.2576 10.8334 13.6307 10.8334 14.0909ZM13.3334 14.9243C13.7936 14.9243 14.1667 14.5512 14.1667 14.0909C14.1667 13.6307 13.7936 13.2576 13.3334 13.2576C12.8731 13.2576 12.5 13.6307 12.5 14.0909C12.5 14.5512 12.8731 14.9243 13.3334 14.9243ZM10.8334 10.7576C10.8334 11.2179 10.4603 11.5909 10 11.5909C9.53978 11.5909 9.16669 11.2179 9.16669 10.7576C9.16669 10.2974 9.53978 9.92428 10 9.92428C10.4603 9.92428 10.8334 10.2974 10.8334 10.7576ZM13.3334 11.5909C13.7936 11.5909 14.1667 11.2179 14.1667 10.7576C14.1667 10.2974 13.7936 9.92428 13.3334 9.92428C12.8731 9.92428 12.5 10.2974 12.5 10.7576C12.5 11.2179 12.8731 11.5909 13.3334 11.5909Z"
                fill={color}
            />
        </svg>
    );
};

export default CalendarIcon;
