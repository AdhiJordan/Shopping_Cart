import Button from '@mui/material/Button';
import { useStyles } from '@mui/material/styles';
import { css, Theme, useTheme } from '@mui/material/styles';
import clsx from 'clsx';

const myStyles = {
    text: {
        padding: 0,
        color: '#fff',
        textTransform: 'none',
        '&:hover': {
            background: 'transparent',
        },
    },
    primaryBtn: {
        width: '100%',
        color: '#000',
        padding: '14px',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        background: '#F9BB4B',
        '&:hover': {
            background: '#F9BB4B',
        },
    },
    primaryMediumBtn: {
        width: '100%',
        color: '#000',
        padding: '8px',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        textTransform: 'none',
        background: '#F9BB4B',
        '&:hover': {
            background: '#F9BB4B',
        },
    },
    secondaryBtn: {
        width: '100%',
        color: '#000',
        padding: '14px',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        background: '#fff',
        '&:hover': {
            background: '#fff',
        },
    },
    customBtn1: {
        backgroundColor: '#148DFF',
        // width: '100%',
        color: '#fff',
        padding: '8px 16px',
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'none',
        background: '#fff',
        '&:hover': {
            background: '#000',
        },
    },
    customBtn2: {
        backgroundColor: '#08D998',
        color: '#fff',
        padding: '8px 16px',
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'none',
        '&:hover': {
            background: '#08D998',
            color: '#fff',
        },
    },
    customBtn3: {
        backgroundColor: '#FF5A4E',
        // width: '100%',
        color: '#fff',
        padding: '8px 16px',
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'none',
        background: '#fff',
        '&:hover': {
            background: '#000',
        },
    },
    customBtn4: {
        width: '100%',
        color: '#fff',
        padding: '14px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
    },
    disableBtn: {
        borderRadius: 10,
        width: '100%',
        color: '#91A2B2',
        padding: '14px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        cursor: 'pointer',
        background: '#F0F3F8',
        '&:hover': {
            background: '#F0F3F8',
        },
    },
    tabSelected: {
        background: '#FFFFFF',
        //boxShadow: '0px 0px 36px rgba(0, 0, 0, 0.06)',
        width: '100%',
        color: '#000',
        // padding: '14px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        height: 40,
        cursor: 'pointer',
        '&:hover': {
            background: '#FFFFFF',
        },
    },
    tabUnSelected: {
        background: '#F0F3F8',
        //boxShadow: '0px 0px 36px rgba(0, 0, 0, 0.06)',
        width: '100%',
        color: '#91A2B2',
        // padding: '14px',
        fontSize: 16,
        fontWeight: 500,
        height: 40,
        textTransform: 'none',
        cursor: 'pointer',
        '&:hover': {
            background: '#F0F3F8',
        },
    },
    plainBtn: {
        color: '#91A2B2',
        borderRadius: 10,
        width: '100%',
        padding: '14px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        cursor: 'pointer',
        background: 'none',
        '&:hover': {
            background: 'none',
        },
    },
    plainBtnBlack: {
        color: '#000000',
        borderRadius: 10,
        width: '100%',
        padding: '14px',
        fontSize: 14,
        fontWeight: 500,
        textTransform: 'none',
        cursor: 'pointer',
        background: 'none',
        '&:hover': {
            background: 'none',
        },
    },
    plainBtnYellow: {
        color: '#ED9D0C',
        borderRadius: 10,
        width: '100%',
        padding: '8px',
        fontSize: 14,
        fontWeight: 500,
        textTransform: 'none',
        cursor: 'pointer',
        background: '#fff',
        '&:hover': {
            background: '#fff',
        },
    },
};

const CustomButton = (props) => {
    const local_classes = useStyles();
    const theme = useTheme();
    const { classes, btntype, width, children, ...rest } = props;

    let btnStyles = null;
    let btnVariant = null;

    const generateBtn = (customClasses, customVariant) => {
        return [clsx(customClasses, classes), customVariant];
    };

    switch (btntype) {
        case 'text':
            [btnStyles, btnVariant] = generateBtn(local_classes.text, 'text');
            break;
        case 'primaryBtn':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.primaryBtn,
                'text'
            );
            break;
        case 'primaryMediumBtn':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.primaryMediumBtn,
                'text'
            );
            break;
        case 'secondaryBtn':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.secondaryBtn,
                'text'
            );
            break;
        case 'customBtn1':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.customBtn1,
                'text'
            );
            break;
        case 'customBtn2':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.customBtn2,
                'text'
            );
            break;
        case 'customBtn3':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.customBtn3,
                'text'
            );
            break;
        case 'disableBtn':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.disableBtn,
                'text'
            );
            break;
        case 'tabSelected':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.tabSelected,
                'text'
            );
            break;
        case 'tabUnSelected':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.tabUnSelected,
                'text'
            );
            break;
        case 'plainBtn':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.plainBtn,
                'text'
            );
            break;
        case 'plainBtnBlack':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.plainBtnBlack,
                'text'
            );
            break;
        case 'plainBtnYellow':
            [btnStyles, btnVariant] = generateBtn(
                local_classes.plainBtnYellow,
                'text'
            );
            break;

        default:
            [btnStyles, btnVariant] = generateBtn(local_classes.text, 'text');
    }
    return (
        <Button
            className={btnStyles}
            variant={btnVariant}
            {...rest}
            style={{ width: `${width}` }}
            type="submit"
        >
            {children}
        </Button>
    );
};

export default CustomButton;
