import { keyframes } from '@emotion/core'
import styled from '@emotion/styled';

const announce = keyframes`
    from {
        background-color: orange;
    }

    to {
        background-color: green;
    }
`

export const Container = styled.section({
    position: 'relative',

    '& .leaflet-container': {
        height: '100%',
        width: '100%',
    },
    '& .property': {
        animation: `${announce} 400ms 4 both linear`,
        borderRadius: '50%',
        backgroundColor: 'green',
    }
});

export const Button = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1001;
`;
